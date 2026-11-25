import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNIFIED_COMPANY_EMAIL = 'hotburnstudios@gmail.com';

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // 0. Unified Email Query Sender for BOTH Companies -> hotburnstudios@gmail.com
  app.post('/api/email/send-query', async (req, res) => {
    const { company, targetRole, name, email, topic, message, dossierHash } = req.body || {};
    const subjectLine = `[${company || 'JANKEN CORPS & HOTBURN STUDIOS'}] ${topic || 'Career & Training Query'} — from ${name || 'Candidate'} (${dossierHash || 'Verified'})`;
    const plainBody = [
      `UNIFIED CAREER & TRAINING HUB DISPATCH`,
      `Recipient: ${UNIFIED_COMPANY_EMAIL}`,
      `Company Division: ${company || 'JANKEN CORPS / HOTBURN STUDIOS'}`,
      `Chosen Career Track: ${targetRole || 'General Track'}`,
      `Candidate Name: ${name}`,
      `Candidate Email: ${email}`,
      `Dossier Hash: ${dossierHash}`,
      `Topic: ${topic}`,
      `----------------------------------------`,
      `${message}`,
    ].join('\n');

    let smtpDispatched = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${name || 'Career Hub'}" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: UNIFIED_COMPANY_EMAIL,
          subject: subjectLine,
          text: plainBody,
        });
        smtpDispatched = true;
      } catch (err) {
        console.warn('SMTP relay fallback active:', err);
      }
    }

    const mailtoUrl = `mailto:${UNIFIED_COMPANY_EMAIL}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(plainBody)}`;

    return res.json({
      ok: true,
      recipientEmail: UNIFIED_COMPANY_EMAIL,
      companiesNotified: ['JANKEN CORPS', 'HOTBURN STUDIOS'],
      smtpDispatched,
      mailtoUrl,
      subjectLine,
      dispatchedAt: new Date().toISOString(),
    });
  });

  // 1. AI Code Review & Big-O Analysis Endpoint
  app.post('/api/gemini/code-audit', async (req, res) => {
    const { problemTitle, language, code, constraints } = req.body || {};
    const ai = getAIClient();
    if (!ai) {
      return res.json({ fallback: true });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a Principal Engineer at JANKEN CORPS and HOTBURN STUDIOS. Audit this ${language} solution for "${problemTitle}".
Constraints: ${constraints || 'Standard production SLA'}.
Candidate Code:
\`\`\`${language}
${code}
\`\`\`
Provide asymptotic time complexity, space complexity, optimality score (0-100), edge cases caught, concrete refactoring suggestions, and a 1-sentence verdict.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              timeComplexity: { type: Type.STRING },
              spaceComplexity: { type: Type.STRING },
              optimalityScore: { type: Type.NUMBER },
              edgeCasesCaught: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              refactoringSuggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              summaryVerdict: { type: Type.STRING },
            },
            required: [
              'timeComplexity',
              'spaceComplexity',
              'optimalityScore',
              'edgeCasesCaught',
              'refactoringSuggestions',
              'summaryVerdict',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ fallback: false, data: parsed });
    } catch {
      return res.json({ fallback: true });
    }
  });

  // 2. AI Mock Interview Conversational Turn Endpoint (Supports JANKEN CORPS & HOTBURN STUDIOS)
  app.post('/api/gemini/interview-turn', async (req, res) => {
    const { company, role, mode, persona, transcript, scratchpad, candidateMessage } =
      req.body || {};
    const ai = getAIClient();
    if (!ai) {
      return res.json({ fallback: true });
    }

    try {
      const recentHistory = Array.isArray(transcript)
        ? transcript
            .slice(-6)
            .map((m: { sender: string; text: string }) => `${m.sender.toUpperCase()}: ${m.text}`)
            .join('\n')
        : '';

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are conducting a live technical & portfolio mock interview at "${company || 'JANKEN CORPS'}".
Target Career Track: ${role}
Interview Mode: ${mode}
Interviewer Persona: ${persona}

Live Candidate Workspace / Code / Scene / SQL Scratchpad:
\`\`\`
${scratchpad || '(empty)'}
\`\`\`

Recent Conversation History:
${recentHistory}

Latest Candidate Message:
"${candidateMessage}"

Respond in character as the ${persona} at ${company || 'JANKEN CORPS'}. Probe specific technical trade-offs relevant to ${role} (for JANKEN CORPS: AWS Cloud architecture, Web Design, SQL/MySQL Workbench/MongoDB schemas, or Data Analytics; for HOTBURN STUDIOS: Blender 3D modelling topology, rigging/weight painting, Gaea terrain erosion, Godot 4 GDScript/shaders, world design, or narrative story direction). Keep your spoken reply under 95 words and update the 4 rubric scores (0-100).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              detectedSignal: { type: Type.STRING },
              rubric: {
                type: Type.OBJECT,
                properties: {
                  problemSolving: { type: Type.NUMBER },
                  technicalDepth: { type: Type.NUMBER },
                  codeCleanliness: { type: Type.NUMBER },
                  communicationClarity: { type: Type.NUMBER },
                },
                required: [
                  'problemSolving',
                  'technicalDepth',
                  'codeCleanliness',
                  'communicationClarity',
                ],
              },
            },
            required: ['reply', 'detectedSignal', 'rubric'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ fallback: false, data: parsed });
    } catch {
      return res.json({ fallback: true });
    }
  });

  // 3. AI Mock Interview Final Debrief Packet Endpoint
  app.post('/api/gemini/interview-debrief', async (req, res) => {
    const { company, role, mode, persona, transcript, scratchpad, rubric } = req.body || {};
    const ai = getAIClient();
    if (!ai) {
      return res.json({ fallback: true });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate an official ${company || 'JANKEN CORPS'} Hiring Committee Debrief Packet for a candidate interviewing for ${role} (${mode}) with ${persona}.
Scratchpad Snapshot:
\`\`\`
${scratchpad || ''}
\`\`\`
Transcript Summary:
${JSON.stringify(transcript || [])}
Current Rubric:
${JSON.stringify(rubric || {})}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              decision: { type: Type.STRING },
              overallScore: { type: Type.NUMBER },
              recommendedLevel: { type: Type.STRING },
              executiveSummary: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              gaps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'decision',
              'overallScore',
              'recommendedLevel',
              'executiveSummary',
              'strengths',
              'gaps',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ fallback: false, data: parsed });
    } catch {
      return res.json({ fallback: true });
    }
  });

  // 4. AI Project & Portfolio Review Endpoint (JANKEN CORPS & HOTBURN STUDIOS)
  app.post('/api/gemini/project-review', async (req, res) => {
    const { company, careerTrack, projectTitle, toolsUsed, projectDescription } = req.body || {};
    const ai = getAIClient();
    if (!ai) {
      return res.json({ fallback: true });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a Principal Reviewer at ${company} evaluating a trainee's project for the career track "${careerTrack}".
Project Title: "${projectTitle}"
Tools / Stack Used: "${toolsUsed}"
Project Description / Code / Scene Breakdown:
"""
${projectDescription}
"""
Evaluate this project specifically for ${company} (${careerTrack}). Return a score (0-100), a verdict ("PRODUCTION READY", "STRONG PROTOTYPE", or "NEEDS OPTIMIZATION"), an architecture/pipeline critique, 3 concrete strengths, and 3 actionable next-step improvements.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              verdict: { type: Type.STRING },
              architectureCritique: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['score', 'verdict', 'architectureCritique', 'strengths', 'improvements'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ fallback: false, data: parsed });
    } catch {
      return res.json({ fallback: true });
    }
  });

  // 5. AI Resume & Portfolio Bullet Auditor Endpoint
  app.post('/api/gemini/resume-audit', async (req, res) => {
    const { rawBullets, targetRole } = req.body || {};
    const ai = getAIClient();
    if (!ai) {
      return res.json({ fallback: true });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a Principal Technical Recruiter & Lead Reviewer at JANKEN CORPS and HOTBURN STUDIOS.
Target Career Track: ${targetRole || 'AWS Cloud Solutions Architect'}
Raw Candidate Resume / Portfolio Bullets:
"""
${rawBullets}
"""
Rewrite the bullets using the Google XYZ impact formula ("Accomplished [X] as measured by [Y], by doing [Z]") tailored to ${targetRole}.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              impactScoreBefore: { type: Type.NUMBER },
              impactScoreAfter: { type: Type.NUMBER },
              optimizedBullets: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              critiqueSummary: { type: Type.STRING },
              injectedKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'impactScoreBefore',
              'impactScoreAfter',
              'optimizedBullets',
              'critiqueSummary',
              'injectedKeywords',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ fallback: false, data: parsed });
    } catch {
      return res.json({ fallback: true });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JANKEN CORPS & HOTBURN STUDIOS Career Hub running on http://localhost:${PORT}`);
  });
}

startServer();
