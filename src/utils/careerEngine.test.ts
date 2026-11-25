import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDeterministicProjectReview,
  calculateCourseCompletion,
  calculateJobReadinessMatch,
  evaluateCandidateCode,
  generateDossierHash,
  getCompanyForRole,
  gradeProctoredOASuite,
} from './careerEngine';
import { CatalogueItem, CodingProblem, JobPosting, ProctoredOASuite } from '../types';

const mockCourse: CatalogueItem = {
  id: 'course-1',
  company: 'JANKEN CORPS',
  title: 'AWS Cloud Architecture',
  category: 'AWS CLOUD',
  categorySubLabel: 'JANKEN CORPS · AWS Cloud Track',
  statusBadge: 'LIVE TRACK',
  difficulty: 'Senior / L5',
  duration: '18h 40m',
  xpTotal: 1200,
  description: 'AWS Multi-AZ VPC.',
  thumbnailUrl: '/test.jpg',
  accentPattern: 'distributed',
  skillsCovered: ['AWS VPC', 'IAM'],
  modules: [
    {
      id: 'mod-1',
      title: 'Multi-AZ VPC',
      duration: '4h',
      summary: 'Subnets',
      architectureDiagram: 'ALB -> EC2',
      codeSnippet: { language: 'json', filename: 'iam.json', code: '{}' },
      tradeOffs: [],
      quiz: {
        id: 'quiz-1',
        question: 'Which endpoint is free for S3?',
        options: ['Gateway VPC Endpoint', 'NAT Gateway'],
        correctIndex: 0,
        explanation: 'Gateway endpoint is free.',
        xpReward: 200,
      },
    },
  ],
};

test('calculateCourseCompletion computes 0%, 50%, and 100% accurately', () => {
  assert.equal(calculateCourseCompletion(mockCourse, [], []), 0);
  assert.equal(calculateCourseCompletion(mockCourse, ['mod-1'], []), 50);
  assert.equal(calculateCourseCompletion(mockCourse, ['mod-1'], ['quiz-1']), 100);
});

test('getCompanyForRole maps JANKEN CORPS and HOTBURN STUDIOS tracks properly', () => {
  assert.equal(getCompanyForRole('AWS Cloud Solutions Architect'), 'JANKEN CORPS');
  assert.equal(getCompanyForRole('Data Managing (SQL Workbench & MongoDB)'), 'JANKEN CORPS');
  assert.equal(getCompanyForRole('3D Modeller & Blender Artist'), 'HOTBURN STUDIOS');
  assert.equal(getCompanyForRole('World Designer & Gaea Terrain Artist'), 'HOTBURN STUDIOS');
  assert.equal(getCompanyForRole('Game Designer & Godot Coder'), 'HOTBURN STUDIOS');
});

test('evaluateCandidateCode passes valid code and rejects empty stubs', () => {
  const problem: CodingProblem = {
    id: 'prob-1',
    company: 'HOTBURN STUDIOS',
    slug: 'godot-lod',
    title: 'Godot 4 LOD Selector',
    difficulty: 'Medium',
    category: 'Godot 4 & Blender',
    companies: ['HOTBURN STUDIOS'],
    acceptanceRate: '58%',
    timeLimitMs: 120,
    memoryLimitMb: 64,
    description: 'Select LOD.',
    inputSpec: 'distances',
    outputSpec: 'LOD labels',
    constraints: ['N <= 10^5'],
    hints: ['Check thresholds'],
    optimalTimeComplexity: 'O(N)',
    optimalSpaceComplexity: 'O(1)',
    starterCode: {
      typescript: 'function selectLOD() {}',
      python: 'def select_lod(): pass',
      cpp: 'void selectLOD() {}',
      java: 'class Solution {}',
    },
    solutionKeyTokens: ['return', 'LOD0', 'CULLED'],
    testCases: [
      { id: 'tc-1', input: '[10, 250]', expectedOutput: '["LOD0", "CULLED"]' },
    ],
  };

  const failCheck = evaluateCandidateCode(problem, 'function selectLOD() {}', false);
  assert.equal(failCheck.allPassed, false);

  const validCode = `function selectLOD(distances: number[]) {
    return distances.map(d => d < 25 ? "LOD0" : "CULLED");
  }`;
  const passCheck = evaluateCandidateCode(problem, validCode, true);
  assert.equal(passCheck.allPassed, true);
});

test('buildDeterministicProjectReview and generateDossierHash support both companies', () => {
  const rev = buildDeterministicProjectReview({
    company: 'HOTBURN STUDIOS',
    careerTrack: 'Game Designer & Godot Coder',
    projectTitle: 'Godot 4 Combat Arena',
    toolsUsed: 'Godot 4, Blender, Gaea',
    projectDescription: 'Built a 3D action RPG controller with custom signals, IK rigging, and Gaea terrain.',
  });
  assert.equal(rev.company, 'HOTBURN STUDIOS');
  assert.ok(rev.score >= 80);

  const hbHash = generateDossierHash('Rohan', 1840, 2, 'HOTBURN STUDIOS');
  assert.ok(hbHash.startsWith('HB-ROHA-1840-V'));

  const jcHash = generateDossierHash('Rohan', 1840, 2, 'JANKEN CORPS');
  assert.ok(jcHash.startsWith('JC-ROHA-1840-V'));
});
