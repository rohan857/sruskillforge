import {
  CandidateProfileState,
  CareerTrackOption,
  CatalogueItem,
  CodingProblem,
  FeedPost,
  JobPosting,
  ProctoredOASuite,
} from './types';

export const HERO_JANKEN_URL = '/src/assets/images/hero_cloud_web_data_lab_1794771542521.jpg';
export const HERO_HOTBURN_URL = '/src/assets/images/hotburn_studios_hero_1794764474294.jpg';

export const THUMB_JANKEN_CLOUD_DATA = '/src/assets/images/thumb_janken_cloud_data_1794764477405.jpg';
export const THUMB_WEB_DESIGN_STUDIO = '/src/assets/images/thumb_web_design_studio_1794771543505.jpg';
export const THUMB_DATA_ANALYTICS_BI = '/src/assets/images/thumb_data_analytics_bi_1794771545086.jpg';
export const THUMB_HOTBURN_GAMEDEV = '/src/assets/images/thumb_hotburn_gamedev_1794764476989.jpg';
export const THUMB_GAEA_TERRAIN_WORLD = '/src/assets/images/thumb_gaea_terrain_world_1794771543976.jpg';
export const THUMB_GODOT_TECH_ART_STORY = '/src/assets/images/thumb_godot_tech_art_story_1794771545445.jpg';
export const THUMB_DISTRIBUTED = '/src/assets/images/thumb_distributed_systems_1794221447714.jpg';
export const THUMB_ALGORITHMIC = '/src/assets/images/thumb_algorithmic_arena_1794221448827.jpg';
export const THUMB_ARCHITECTURE = '/src/assets/images/thumb_system_architecture_1794221450384.jpg';

export const CAREER_TRACK_OPTIONS: CareerTrackOption[] = [
  // COMPANY 1: JANKEN CORPS
  {
    id: 'track-janken-aws',
    company: 'JANKEN CORPS',
    title: 'AWS Cloud Solutions Architect',
    category: 'AWS CLOUD',
    tools: ['AWS VPC', 'EC2 & EKS', 'IAM & S3', 'Lambda', 'Terraform'],
    roadmapSummary:
      'Design Multi-AZ cloud networks, least-privilege IAM policies, serverless pipelines, and high-availability auto-scaling infrastructure.',
  },
  {
    id: 'track-janken-web',
    company: 'JANKEN CORPS',
    title: 'Web Designing & Frontend UI Engineer',
    category: 'WEB DESIGNING',
    tools: ['HTML5 / CSS Grid', 'Tailwind CSS', 'React 19', 'UI/UX Tokens', 'WCAG AA'],
    roadmapSummary:
      'Master responsive layout systems, typography scales, interactive component states, and high-conversion web design architecture.',
  },
  {
    id: 'track-janken-data-sql',
    company: 'JANKEN CORPS',
    title: 'Data Managing (SQL Workbench & MongoDB)',
    category: 'DATA MANAGING (SQL / MONGODB)',
    tools: ['SQL', 'MySQL Workbench', 'PostgreSQL', 'MongoDB Atlas', 'Indexing & ACID'],
    roadmapSummary:
      'Architect normalized relational schemas in SQL Workbench, optimize B-Tree indexes, and build scalable MongoDB aggregation pipelines.',
  },
  {
    id: 'track-janken-analytics',
    company: 'JANKEN CORPS',
    title: 'Data Analytics & BI Engineer',
    category: 'DATA ANALYTICS',
    tools: ['SQL Window Functions', 'Python & Pandas', 'Cohort Telemetry', 'BI Dashboards'],
    roadmapSummary:
      'Transform raw transactional datasets into retention cohorts, revenue funnels, and statistical anomaly detection models.',
  },

  // COMPANY 2: HOTBURN STUDIOS
  {
    id: 'track-hotburn-modeller',
    company: 'HOTBURN STUDIOS',
    title: '3D Modeller & Blender Artist',
    category: 'BLENDER & 3D MODELLING',
    tools: ['Blender 4.x', 'Hard-Surface & Sculpting', 'Retopology', 'UV Unwrapping', 'PBR Baking'],
    roadmapSummary:
      'Sculpt high-poly concepts, retopologize clean game-ready quad meshes in Blender, pack UV islands, and bake crisp Normal/AO maps.',
  },
  {
    id: 'track-hotburn-animator-rigger',
    company: 'HOTBURN STUDIOS',
    title: 'Character Animator & Rigger',
    category: 'ANIMATION & RIGGING',
    tools: ['Blender Armatures', 'IK / FK Rigging', 'Weight Painting', 'Combat Cycles', 'State Machines'],
    roadmapSummary:
      'Build deformation-safe skeletal rigs with IK/FK switches, clean skin weights, and fluid keyframe combat/locomotion animation cycles.',
  },
  {
    id: 'track-hotburn-world-gaea',
    company: 'HOTBURN STUDIOS',
    title: 'World Designer & Gaea Terrain Artist',
    category: 'WORLD DESIGN, GAEA & ENV ART',
    tools: ['Gaea Terrain', 'Erosion Node Graphs', 'Heightmaps & Splatmaps', 'Biome Composition'],
    roadmapSummary:
      'Generate photorealistic procedural mountains, river valleys, and erosion splat-maps in Gaea and assemble immersive open-world biomes.',
  },
  {
    id: 'track-hotburn-env-artist',
    company: 'HOTBURN STUDIOS',
    title: 'Environmental Artist (3D Worlds)',
    category: 'WORLD DESIGN, GAEA & ENV ART',
    tools: ['Blender Modular Kits', 'Trim Sheets', 'Gaea', 'Volumetric Lighting', 'Foliage Wind'],
    roadmapSummary:
      'Craft reusable modular environment kits, PBR trim sheets, foliage scattering systems, and atmospheric level lighting.',
  },
  {
    id: 'track-hotburn-tech-artist',
    company: 'HOTBURN STUDIOS',
    title: 'Technical Artist & Shader Engineer',
    category: 'GODOT, TECH ART & STORY',
    tools: ['Godot Shaders (GDShader)', 'HLSL / Visual Shaders', 'VFX Particles', 'LOD & GPU Profiling'],
    roadmapSummary:
      'Bridge art and code with custom triplanar terrain shaders, procedural VFX, automated asset validators, and 60 FPS draw-call optimization.',
  },
  {
    id: 'track-hotburn-story',
    company: 'HOTBURN STUDIOS',
    title: 'Story Writer & Narrative Director',
    category: 'GODOT, TECH ART & STORY',
    tools: ['Branching Dialogue', 'World Lore Bibles', 'Quest State Graphs', 'Cinematic Direction'],
    roadmapSummary:
      'Direct interactive game narratives, faction lore bibles, branching quest consequences, and voice-acted cutscene pacing.',
  },
  {
    id: 'track-hotburn-godot-coder',
    company: 'HOTBURN STUDIOS',
    title: 'Game Designer & Godot Coder',
    category: 'GODOT, TECH ART & STORY',
    tools: ['Godot 4 Engine', 'GDScript / C#', 'CharacterBody3D Physics', 'Signal Architecture', 'AI Trees'],
    roadmapSummary:
      'Architect responsive 3D/2D gameplay loops, decoupled Signal/Resource systems, combat hitboxes, and enemy AI state machines in Godot 4.',
  },
];

export const CATALOGUE_ITEMS: CatalogueItem[] = [
  // ============================================================================
  // COMPANY 1: JANKEN CORPS (AWS CLOUD, WEB DESIGNING, DATA MANAGING, ANALYTICS)
  // ============================================================================
  {
    id: 'cat-janken-aws-cloud',
    company: 'JANKEN CORPS',
    title: 'AWS Cloud Architecture: VPC, EC2, IAM, S3 & Serverless',
    category: 'AWS CLOUD',
    categorySubLabel: 'JANKEN CORPS · AWS Cloud Track',
    statusBadge: 'LIVE TRACK',
    difficulty: 'Senior / L5',
    duration: '22h · 4 Modules',
    xpTotal: 1500,
    description:
      'Master production AWS Cloud infrastructure: Multi-AZ VPC public/private subnet routing, IAM least-privilege roles, ALB + Auto Scaling, S3 lifecycle policies, and Lambda event pipelines.',
    thumbnailUrl: THUMB_JANKEN_CLOUD_DATA,
    accentPattern: 'distributed',
    skillsCovered: ['AWS VPC', 'EC2 & ALB', 'IAM Policies', 'S3 & Lambda'],
    modules: [
      {
        id: 'mod-aws-1',
        title: '01. Multi-AZ VPC Networking, NAT Gateways & Private Subnets',
        duration: '4h 15m',
        summary:
          'Design fault-tolerant AWS Virtual Private Clouds across 3 Availability Zones with public ALB ingress, isolated private app subnets, and S3 Gateway Endpoints.',
        architectureDiagram: `[Internet Gateway] ---> [Public Subnet AZ-1/AZ-2: Application Load Balancer + NAT Gateway]
                                        |
                                        v (Security Group sg-app: Port 443 Only from ALB)
               [Private App Subnet AZ-1/AZ-2: EC2 Auto Scaling Group / EKS Pods]
                                        |
                                        v (Security Group sg-db: Port 3306/5432 Only from sg-app)
               [Isolated Data Subnet AZ-1/AZ-2: Amazon RDS Multi-AZ + S3 VPC Endpoint]`,
        codeSnippet: {
          language: 'json',
          filename: 'iam_least_privilege_policy.json',
          code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ScopedArtifactBucketReadWrite",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::janken-prod-assets/*",
      "Condition": {
        "StringEquals": { "aws:PrincipalVpc": "vpc-0a98bc7123" }
      }
    }
  ]
}`,
        },
        tradeOffs: [
          {
            dimension: 'S3 & DynamoDB Traffic Routing',
            chosenApproach: 'VPC Gateway Endpoints (Free & Private)',
            alternative: 'Routing S3 traffic through NAT Gateway ($0.045/GB)',
            verdict: 'Eliminates NAT Gateway bandwidth charges and keeps traffic on the AWS private backbone.',
          },
        ],
        quiz: {
          id: 'quiz-aws-1',
          question:
            'In an AWS Multi-AZ VPC architecture, how should private EC2 instances access Amazon S3 without incurring NAT Gateway data-processing charges?',
          options: [
            'Attach a Gateway VPC Endpoint for S3 directly to the private subnet route tables.',
            'Assign public IPv4 addresses to all database and backend instances.',
            'Disable Security Groups on the VPC.',
            'Route S3 traffic over an unencrypted internet proxy.',
          ],
          correctIndex: 0,
          explanation:
            'Gateway VPC Endpoints for S3 and DynamoDB route traffic privately over the AWS network at zero hourly or per-GB charge.',
          xpReward: 250,
        },
      },
      {
        id: 'mod-aws-2',
        title: '02. Serverless Event-Driven Pipelines: API Gateway, SQS & Lambda',
        duration: '3h 50m',
        summary:
          'Decouple spiky traffic bursts using Amazon SQS Dead-Letter Queues (DLQ), idempotent AWS Lambda consumers, and DynamoDB conditional writes.',
        architectureDiagram: `[API Gateway] --> [SQS Main Queue (VisibilityTimeout = 6x Lambda Timeout)] --> [Lambda Worker]
                        | (MaxReceiveCount = 3 Failures)
                        v
                  [SQS Dead-Letter Queue + CloudWatch Alarm]`,
        codeSnippet: {
          language: 'typescript',
          filename: 'sqsBatchProcessor.ts',
          code: `export async function handler(event: { Records: { messageId: string; body: string }[] }) {
  const batchItemFailures: { itemIdentifier: string }[] = [];
  for (const record of event.Records) {
    try {
      await processOrderPayload(JSON.parse(record.body));
    } catch {
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }
  return { batchItemFailures }; // ReportBatchItemFailures retries only failed messages
}`,
        },
        tradeOffs: [
          {
            dimension: 'Partial Batch Failure Handling',
            chosenApproach: 'ReportBatchItemFailures response',
            alternative: 'Throwing error to retry entire batch',
            verdict: 'Prevents poison-pill messages from reprocessing already succeeded items in the same batch.',
          },
        ],
        quiz: {
          id: 'quiz-aws-2',
          question:
            'What is the AWS best-practice ratio between an SQS queue Visibility Timeout and the attached Lambda function timeout?',
          options: [
            'Set SQS Visibility Timeout to at least 6x the Lambda function timeout.',
            'Set SQS Visibility Timeout to 1 millisecond.',
            'Set SQS Visibility Timeout shorter than the Lambda timeout so messages run twice.',
            'Disable Lambda timeouts completely.',
          ],
          correctIndex: 0,
          explanation:
            'Setting Visibility Timeout >= 6x Lambda timeout prevents another consumer from picking up the same message while the first invocation is still executing or retrying.',
          xpReward: 250,
        },
      },
    ],
  },
  {
    id: 'cat-janken-web-design',
    company: 'JANKEN CORPS',
    title: 'Web Designing Studio: Modern UI/UX, CSS Grid, Tailwind & React 19',
    category: 'WEB DESIGNING',
    categorySubLabel: 'JANKEN CORPS · Web Designing Track',
    statusBadge: 'VERIFIED',
    difficulty: 'Mid-Level / L4',
    duration: '18h · 4 Modules',
    xpTotal: 1250,
    description:
      'Design and engineer production web interfaces: 60-30-10 color systems, typographic hierarchy, responsive CSS Grid & Flexbox layouts, accessible forms, and interactive React 19 states.',
    thumbnailUrl: THUMB_WEB_DESIGN_STUDIO,
    accentPattern: 'architecture',
    skillsCovered: ['Responsive Web Design', 'CSS Grid & Flexbox', 'Tailwind CSS', 'React 19 UI'],
    modules: [
      {
        id: 'mod-web-1',
        title: '01. Responsive CSS Grid Architecture, Fluid Typography & Spatial Math',
        duration: '3h 30m',
        summary:
          'Build adaptive 12-column and auto-fit Bento grids that scale from 390px mobile screens to 1440px+ widescreen monitors with zero horizontal overflow.',
        architectureDiagram: `[Outer Container: max-w-7xl mx-auto px-6 (Padding >= Inner Gap)]
   +-- [Auto-Fit Responsive Grid: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))]
   +-- [Nested Radius Math: r_inner (12px) = r_outer (20px) - padding (8px)]`,
        codeSnippet: {
          language: 'css',
          filename: 'responsive-grid-system.css',
          code: `.studio-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 1.75rem;
}

.fluid-hero-title {
  font-size: clamp(2.25rem, 4vw + 1rem, 3.75rem);
  line-height: 1.12;
  text-wrap: balance;
}`,
        },
        tradeOffs: [
          {
            dimension: 'Headline Wrapping',
            chosenApproach: 'clamp() + text-wrap: balance',
            alternative: 'Fixed px sizes with manual <br> tags',
            verdict: 'Prevents orphan single words on the final line across all viewport widths.',
          },
        ],
        quiz: {
          id: 'quiz-web-1',
          question:
            'In modern Web Designing, why is `minmax(min(100%, 320px), 1fr)` safer than `minmax(320px, 1fr)` inside a CSS Grid?',
          options: [
            'It prevents horizontal scroll overflow on narrow viewports narrower than 320px (or with padding).',
            'It disables CSS Flexbox on the page.',
            'It forces images to load at 10x resolution.',
            'It only works in Internet Explorer.',
          ],
          correctIndex: 0,
          explanation:
            'Using min(100%, 320px) ensures the track minimum never exceeds 100% of the parent container width on small mobile screens.',
          xpReward: 200,
        },
      },
    ],
  },
  {
    id: 'cat-janken-data-managing',
    company: 'JANKEN CORPS',
    title: 'Data Managing: SQL, MySQL Workbench, PostgreSQL & MongoDB',
    category: 'DATA MANAGING (SQL / MONGODB)',
    categorySubLabel: 'JANKEN CORPS · Data Managing Track',
    statusBadge: 'PROCTORED',
    difficulty: 'Senior / L5',
    duration: '24h · 5 Modules',
    xpTotal: 1600,
    description:
      'Complete relational & NoSQL data management: visual EER modeling in SQL Workbench, 3NF normalization, composite B-Tree indexing, ACID transactions, and MongoDB aggregation & sharding.',
    thumbnailUrl: THUMB_JANKEN_CLOUD_DATA,
    accentPattern: 'distributed',
    skillsCovered: ['SQL & MySQL Workbench', 'Composite Indexing', 'MongoDB Aggregation', 'ACID & Sharding'],
    modules: [
      {
        id: 'mod-sql-1',
        title: '01. SQL Workbench Schema Design, 3NF Normalization & Composite B-Tree Indexes',
        duration: '4h 20m',
        summary:
          'Model relational EER schemas in MySQL Workbench, eliminate transitive update anomalies, and verify index selectivity with EXPLAIN ANALYZE.',
        architectureDiagram: `[MySQL Workbench EER Model]
  customers (id PK) 1 ----< orders (id PK, customer_id FK, status, created_at)
                                |
                                +--> Composite Index: idx_cust_status_created (customer_id, status, created_at DESC)`,
        codeSnippet: {
          language: 'sql',
          filename: 'workbench_schema_optimization.sql',
          code: `-- MySQL Workbench / PostgreSQL Production Schema & Covering Index
CREATE TABLE orders (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  order_status VARCHAR(24) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Leftmost-prefix covering index avoids filesort on customer order history queries
CREATE INDEX idx_orders_cust_status_date
  ON orders (customer_id, order_status, created_at DESC);

EXPLAIN ANALYZE
SELECT order_id, total_amount, created_at
FROM orders
WHERE customer_id = 4092 AND order_status = 'COMPLETED'
ORDER BY created_at DESC LIMIT 20;`,
        },
        tradeOffs: [
          {
            dimension: 'Money Column Data Type',
            chosenApproach: 'DECIMAL(12,2) / Integer Cents',
            alternative: 'FLOAT / DOUBLE',
            verdict: 'Prevents IEEE-754 binary floating-point rounding drift on financial totals.',
          },
        ],
        quiz: {
          id: 'quiz-sql-1',
          question:
            'When designing a composite index `(customer_id, order_status, created_at)` in SQL Workbench, why does `WHERE order_status = "PAID"` alone fail to use the B-Tree index prefix?',
          options: [
            'B-Tree composite indexes are sorted by the leading column (`customer_id`) first (Leftmost-Prefix Rule).',
            'VARCHAR columns cannot be indexed in SQL.',
            'SQL Workbench only indexes the last column.',
            'Indexes are ignored whenever a WHERE clause is used.',
          ],
          correctIndex: 0,
          explanation:
            'A composite B-Tree index orders entries primarily by the first column; skipping `customer_id` prevents direct index range lookup.',
          xpReward: 250,
        },
      },
      {
        id: 'mod-mongo-2',
        title: '02. MongoDB Document Modeling, Aggregation Pipelines & Shard Keys',
        duration: '4h 00m',
        summary:
          'Balance embedding vs referencing in MongoDB, write high-speed `$match -> $group -> $project` pipelines, and choose high-cardinality shard keys.',
        architectureDiagram: `[MongoDB Aggregation Pipeline]
  Stage 1: $match (Uses Compound Index { tenantId: 1, eventDate: -1 })
     |
  Stage 2: $group (In-Memory Accumulator $sum / $avg per category)
     |
  Stage 3: $project & $sort (Streamed Top-K Output)`,
        codeSnippet: {
          language: 'javascript',
          filename: 'mongodb_aggregation.js',
          code: `db.telemetry_events.createIndex({ tenantId: 1, eventType: 1, timestamp: -1 });

db.telemetry_events.aggregate([
  {
    $match: {
      tenantId: "org_janken_01",
      eventType: "CHECKOUT_SUCCESS",
      timestamp: { $gte: ISODate("2026-01-01T00:00:00Z") }
    }
  },
  {
    $group: {
      _id: "$region",
      totalRevenue: { $sum: "$amountUsd" },
      avgLatencyMs: { $avg: "$latencyMs" },
      eventCount: { $sum: 1 }
    }
  },
  { $sort: { totalRevenue: -1 } }
]);`,
        },
        tradeOffs: [
          {
            dimension: 'Document Embedding vs Referencing',
            chosenApproach: 'Bounded Embedding (1-to-Few) + Outlier Pattern',
            alternative: 'Unbounded Array Growth inside Single Document',
            verdict: 'Prevents hitting MongoDB 16MB BSON document limit and avoids frequent document reallocation.',
          },
        ],
        quiz: {
          id: 'quiz-mongo-2',
          question:
            'In a MongoDB aggregation pipeline, why should `$match` and `$sort` stages be placed at the very beginning of the pipeline whenever possible?',
          options: [
            'So MongoDB can utilize collection indexes to filter documents before loading them into memory.',
            'Because `$match` is not allowed after `$group`.',
            'Because MongoDB deletes unmatched documents from disk.',
            'To bypass authentication checks.',
          ],
          correctIndex: 0,
          explanation:
            'Placing `$match` first allows the query planner to use compound B-Tree indexes and drastically reduces the number of documents flowing through downstream stages.',
          xpReward: 250,
        },
      },
    ],
  },
  {
    id: 'cat-janken-data-analytics',
    company: 'JANKEN CORPS',
    title: 'Data Analytics: SQL Window Functions, Python Pandas & BI Cohorts',
    category: 'DATA ANALYTICS',
    categorySubLabel: 'JANKEN CORPS · Data Analytics Track',
    statusBadge: 'LIVE TRACK',
    difficulty: 'Mid-Level / L4',
    duration: '20h · 4 Modules',
    xpTotal: 1350,
    description:
      'Master analytical SQL (`LAG`, `LEAD`, `ROW_NUMBER`, rolling 7-day averages), Python Pandas data cleaning, A/B hypothesis testing, and executive retention cohort matrices.',
    thumbnailUrl: THUMB_DATA_ANALYTICS_BI,
    accentPattern: 'algorithmic',
    skillsCovered: ['SQL Window Functions', 'Python & Pandas', 'Retention Cohorts', 'A/B Testing'],
    modules: [
      {
        id: 'mod-analytics-1',
        title: '01. Analytical SQL Window Functions: Rolling Metrics & Cohort Retention',
        duration: '3h 45m',
        summary:
          'Compute 7-day rolling revenue averages, MoM growth rates using LAG(), and Day-1/Day-7/Day-30 user retention cohorts in a single SQL pass.',
        architectureDiagram: `[Raw Events Table] --> [CTE 1: First Seen Cohort Month per User]
                   --> [CTE 2: Active Month Offset = DATEDIFF(month, cohort_month, activity_month)]
                   --> [Pivot Retention Matrix: Month 0 (100%), Month 1 (64%), Month 2 (58%)]`,
        codeSnippet: {
          language: 'sql',
          filename: 'cohort_and_rolling_analytics.sql',
          code: `WITH daily_revenue AS (
  SELECT
    DATE(created_at) AS metric_date,
    SUM(amount_usd) AS daily_rev
  FROM transactions
  WHERE status = 'SETTLED'
  GROUP BY DATE(created_at)
)
SELECT
  metric_date,
  daily_rev,
  LAG(daily_rev, 1) OVER (ORDER BY metric_date) AS prev_day_rev,
  ROUND(
    AVG(daily_rev) OVER (
      ORDER BY metric_date
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2
  ) AS rolling_7d_avg
FROM daily_revenue
ORDER BY metric_date DESC;`,
        },
        tradeOffs: [
          {
            dimension: 'Window Frame Specification',
            chosenApproach: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
            alternative: 'Correlated Subquery per Row',
            verdict: 'Computes rolling window in O(N log N) single scan instead of O(N²) self-joins.',
          },
        ],
        quiz: {
          id: 'quiz-analytics-1',
          question:
            'Which SQL Window Function allows you to compare a row’s current metric directly against the previous time period’s row without a self-join?',
          options: [
            'LAG(column_name, 1) OVER (ORDER BY period_date)',
            'COUNT(*) GROUP BY id',
            'TRUNCATE TABLE',
            'CONCAT_WS()',
          ],
          correctIndex: 0,
          explanation:
            'LAG() accesses data from a previous row in the ordered partition without requiring an expensive self-join.',
          xpReward: 250,
        },
      },
    ],
  },

  // ============================================================================
  // COMPANY 2: HOTBURN STUDIOS (MODELLER, ANIMATOR, RIGGER, WORLD, GAEA, GODOT, STORY)
  // ============================================================================
  {
    id: 'cat-hotburn-blender-modeller',
    company: 'HOTBURN STUDIOS',
    title: 'Modeller Studio: Blender 3D Hard-Surface, Sculpting & PBR Baking',
    category: 'BLENDER & 3D MODELLING',
    categorySubLabel: 'HOTBURN STUDIOS · 3D Modeller Track',
    statusBadge: 'STUDIO KIT',
    difficulty: 'Senior / L5',
    duration: '26h · 5 Modules',
    xpTotal: 1650,
    description:
      'Complete AAA & Indie 3D Modeller curriculum in Blender: Sub-D hard-surface boolean cleanup, organic sculpting, quad retopology, UV texel density packing, and cage-baked Normal/ORM maps.',
    thumbnailUrl: THUMB_HOTBURN_GAMEDEV,
    accentPattern: 'horizon',
    skillsCovered: ['Blender 4.x', 'Quad Retopology', 'UV Unwrapping', 'Normal/ORM Baking'],
    modules: [
      {
        id: 'mod-blender-1',
        title: '01. Clean Quad Retopology, Edge-Flow Poles & High-to-Low Poly Cage Baking',
        duration: '4h 30m',
        summary:
          'Eliminate shading artifacts and N-gon pinching on curved surfaces, place 5-edge poles on flat planes, and bake 16-bit Tangent-Space Normal maps without ray-miss skewing.',
        architectureDiagram: `[High-Poly Sculpt / Sub-D Mesh (2.4M Tris)]
         |
         | (Ray Distance / Extruded Cage Mesh + MikkTSpace Tangents)
         v
[Low-Poly Game Mesh (18,500 Tris, Clean Quad Loops, Hard Edges = UV Seams)]
         |
         +--> Baked Maps: Normal (16-bit PNG) + ORM Packed (R=Occlusion, G=Roughness, B=Metallic)`,
        codeSnippet: {
          language: 'python',
          filename: 'blender_mesh_validator.py',
          code: `import bpy
import bmesh

def audit_game_mesh_topology(obj_name: str, max_tris: int = 25000):
    obj = bpy.data.objects.get(obj_name)
    if not obj or obj.type != 'MESH':
        return {"valid": False, "reason": "Object is not a mesh"}
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    ngons = [f.index for f in bm.faces if len(f.verts) > 4]
    tri_count = sum(len(f.verts) - 2 for f in bm.faces)
    bm.free()
    return {
        "mesh": obj_name,
        "triangles": tri_count,
        "ngon_count": len(ngons),
        "budget_passed": tri_count <= max_tris and len(ngons) == 0
    }`,
        },
        tradeOffs: [
          {
            dimension: 'PBR Texture Channel Packing',
            chosenApproach: 'Single ORM Map (R: AO, G: Roughness, B: Metallic)',
            alternative: '3 Separate Grayscale Texture Files',
            verdict: 'Cuts GPU texture sampler lookups and VRAM footprint by 66% per material.',
          },
        ],
        quiz: {
          id: 'quiz-blender-1',
          question:
            'When baking a Normal Map from a high-poly mesh to a low-poly mesh in Blender, why must every sharp/hard edge (smoothing split) on the low-poly mesh also be marked as a UV Seam?',
          options: [
            'Without a UV split and padding along hard edges, mipmapping bleeds opposing vertex normals across the edge, creating visible black seam lines.',
            'Blender refuses to export FBX or glTF files unless every polygon is detached.',
            'UV seams automatically increase polygon count by 4x.',
            'Hard edges delete material slots.',
          ],
          correctIndex: 0,
          explanation:
            'A discontinuity in vertex normals requires a matching discontinuity in UV space with pixel padding so normal values interpolate cleanly across texels.',
          xpReward: 250,
        },
      },
    ],
  },
  {
    id: 'cat-hotburn-animator-rigger',
    company: 'HOTBURN STUDIOS',
    title: 'Animator & Rigger Track: Skeletal Rigging, IK/FK & Combat Cycles',
    category: 'ANIMATION & RIGGING',
    categorySubLabel: 'HOTBURN STUDIOS · Animator & Rigger Track',
    statusBadge: 'VERIFIED',
    difficulty: 'Senior / L5',
    duration: '21h · 4 Modules',
    xpTotal: 1500,
    description:
      'Build rock-solid character & creature rigs in Blender and Godot: deformation vs control bone hierarchies, seamless IK/FK snapping, corrective shape keys, and snappy combat animation arcs.',
    thumbnailUrl: THUMB_HOTBURN_GAMEDEV,
    accentPattern: 'algorithmic',
    skillsCovered: ['Skeletal Rigging', 'IK/FK Blending', 'Weight Painting', 'Combat Keyframing'],
    modules: [
      {
        id: 'mod-rig-1',
        title: '01. Three-Tier Bone Architecture (DEF / MCH / CTRL) & IK/FK Limb Switching',
        duration: '4h 10m',
        summary:
          'Separate Deformation bones (DEF_) from Mechanical helpers (MCH_) and Animator Controls (CTRL_) so game engine exports stay clean and hierarchy-safe.',
        architectureDiagram: `[CTRL_Arm_IK / CTRL_Arm_FK (Animator Curves)]
               |
               v (Copy Transforms Constraint driven by Custom Property ik_fk_blend 0.0 -> 1.0)
     [MCH_Arm_Chain (Pole Target & Stretch Math)]
               |
               v (Clean Single-Root Hierarchy exported to Godot Skeleton3D)
     [DEF_UpperArm.L -> DEF_Forearm.L -> DEF_Hand.L (Max 4 Bone Weights per Vertex)]`,
        codeSnippet: {
          language: 'python',
          filename: 'normalize_skin_weights.py',
          code: `# Ensure strict 4-bone influence limit per vertex for real-time GPU skinning
import bpy

def limit_and_normalize_vertex_weights(obj_name: str, max_influences: int = 4):
    obj = bpy.data.objects[obj_name]
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=max_influences)
    bpy.ops.object.vertex_group_normalize_all(lock_active=False)`,
        },
        tradeOffs: [
          {
            dimension: 'Vertex Bone Influence Limit',
            chosenApproach: 'Strict 4 Bones per Vertex (Normalized)',
            alternative: 'Unlimited Bone Influences',
            verdict: 'Real-time game engine GPU skinning shaders pack 4 bone indices + 4 weights into a single vec4 register.',
          },
        ],
        quiz: {
          id: 'quiz-rig-1',
          question:
            'Why do real-time game engines (like Godot 4, Unreal, and Unity) enforce a standard limit of 4 bone weight influences per vertex?',
          options: [
            'GPU vertex skinning shaders pass bone indices and weights in 4-component vector registers (vec4/uvec4) for single-pass hardware acceleration.',
            'Meshes with 5 bones cannot be rendered in color.',
            'Blender only supports 4 bones in an entire armature.',
            'More than 4 bones deletes UV maps.',
          ],
          correctIndex: 0,
          explanation:
            'Hardware vertex shaders store up to 4 bone indices and 4 weights per vertex in standard 4-channel attributes; exceeding 4 either drops weights or requires costly multi-pass skinning.',
          xpReward: 250,
        },
      },
    ],
  },
  {
    id: 'cat-hotburn-world-gaea-env',
    company: 'HOTBURN STUDIOS',
    title: 'World Designer & Environmental Artist: Gaea Terrain, Biomes & Trim Sheets',
    category: 'WORLD DESIGN, GAEA & ENV ART',
    categorySubLabel: 'HOTBURN STUDIOS · World & Environment Track',
    statusBadge: 'LIVE TRACK',
    difficulty: 'Staff / Lead',
    duration: '25h · 5 Modules',
    xpTotal: 1700,
    description:
      'Design breathtaking 3D worlds for HOTBURN STUDIOS: procedural mountain & canyon erosion in Gaea, 16-bit heightmap & splat-map exports, modular architectural kits, and atmospheric volumetric lighting.',
    thumbnailUrl: THUMB_GAEA_TERRAIN_WORLD,
    accentPattern: 'horizon',
    skillsCovered: ['Gaea Terrain', 'Environmental Art', 'World Design', 'Trim Sheets & Lighting'],
    modules: [
      {
        id: 'mod-gaea-1',
        title: '01. Gaea Procedural Terrain Graph: Thermal/Hydraulic Erosion & Splat-Map Masks',
        duration: '4h 40m',
        summary:
          'Construct non-destructive Gaea terrain networks combining Mountain, Ridge, Alluvium, and Erosion nodes, then export 16-bit RAW/EXR heightmaps and RGBA weight-blended splat masks.',
        architectureDiagram: `[Gaea Primitives: Mountain + Voronoi Ridge + Displace]
        |
        v
[Hydrology & Erosion: Thermal Shaper -> Hydraulic Erosion -> Snowfall]
        |
        +---> [Output 1: 16-bit Heightmap (4096x4096 EXR/PNG) -> Displaces World Mesh]
        +---> [Output 2: RGBA Splat Mask (R=Flow/Riverbed, G=Deposit/Soil, B=Wear/Cliff, A=Snow)]`,
        codeSnippet: {
          language: 'glsl',
          filename: 'terrain_splat_triplanar.gdshader',
          code: `shader_type spatial;

uniform sampler2D splat_map : source_color;
uniform sampler2D rock_albedo : source_color;
uniform sampler2D grass_albedo : source_color;
uniform sampler2D snow_albedo : source_color;
uniform float uv_scale = 24.0;

void fragment() {
    vec4 weights = texture(splat_map, UV);
    vec2 tiled_uv = UV * uv_scale;
    vec3 grass = texture(grass_albedo, tiled_uv).rgb;
    vec3 rock = texture(rock_albedo, tiled_uv).rgb;
    vec3 snow = texture(snow_albedo, tiled_uv).rgb;
    // Blend biome layers using Gaea erosion splat channels
    vec3 final_color = mix(grass, rock, weights.b);
    final_color = mix(final_color, snow, weights.a);
    ALBEDO = final_color;
}`,
        },
        tradeOffs: [
          {
            dimension: 'Heightmap Bit Depth',
            chosenApproach: '16-Bit Grayscale / 32-Bit EXR',
            alternative: '8-Bit PNG / JPG Heightmap',
            verdict: '8-bit only has 256 vertical elevation steps, causing severe "stair-stepping / terracing" artifacts on gentle slopes.',
          },
        ],
        quiz: {
          id: 'quiz-gaea-1',
          question:
            'Why must Gaea terrain heightmaps always be exported as 16-bit (or 32-bit float) images rather than standard 8-bit PNGs?',
          options: [
            '8-bit images only provide 256 discrete height values, causing visible stair-stepping/terracing across terrain slopes.',
            '8-bit images cannot be opened on Windows or Linux.',
            '16-bit heightmaps automatically generate character animations.',
            'Gaea only exports 1x1 pixel images in 8-bit mode.',
          ],
          correctIndex: 0,
          explanation:
            '16-bit grayscale provides 65,536 vertical steps (vs 256 in 8-bit), ensuring smooth, natural elevation transitions without stair-stepping.',
          xpReward: 300,
        },
      },
    ],
  },
  {
    id: 'cat-hotburn-godot-gamedev',
    company: 'HOTBURN STUDIOS',
    title: 'Game Designer & Coder: Godot 4 Engine, GDScript & Combat Systems',
    category: 'GODOT, TECH ART & STORY',
    categorySubLabel: 'HOTBURN STUDIOS · Godot Game Dev Track',
    statusBadge: 'PROCTORED',
    difficulty: 'Senior / L5',
    duration: '28h · 6 Modules',
    xpTotal: 1750,
    description:
      'Build complete 3D/2D games in Godot 4: Node composition, decoupled Signal & Custom Resource architectures, CharacterBody3D physics controllers, hitbox/hurtbox state machines, and enemy AI.',
    thumbnailUrl: THUMB_GODOT_TECH_ART_STORY,
    accentPattern: 'distributed',
    skillsCovered: ['Godot 4', 'GDScript / C#', 'Game Design & Physics', 'State Machines'],
    modules: [
      {
        id: 'mod-godot-1',
        title: '01. Godot 4 Decoupled Node Composition, Signals & CharacterBody3D Physics',
        duration: '4h 45m',
        summary:
          'Follow the Golden Rule of Godot ("Call down, signal up") with finite state machines, coyote-time jump buffering, and frame-rate independent velocity lerping.',
        architectureDiagram: `[Player (CharacterBody3D)]
   |-- [CollisionShape3D (Capsule)]
   |-- [CameraPivot (SpringArm3D)]
   |-- [HitboxComponent (Area3D) -- emits signal hit_landed(damage_data)]
   +-- [StateMachine]
         |-- IdleState
         |-- DashState (i-frames active)
         +-- AttackComboState`,
        codeSnippet: {
          language: 'gdscript',
          filename: 'player_controller.gd',
          code: `extends CharacterBody3D

@export var move_speed: float = 7.5
@export var acceleration: float = 14.0
@export var jump_impulse: float = 6.2
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y -= gravity * delta
    elif Input.is_action_just_pressed("jump"):
        velocity.y = jump_impulse

    var input_dir := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var direction := (transform.basis * Vector3(input_dir.x, 0.0, input_dir.y)).normalized()
    var target_vel := direction * move_speed
    velocity.x = move_toward(velocity.x, target_vel.x, acceleration * delta)
    velocity.z = move_toward(velocity.z, target_vel.z, acceleration * delta)
    move_and_slide()`,
        },
        tradeOffs: [
          {
            dimension: 'Scene Coupling Rule',
            chosenApproach: 'Call Down, Signal Up + Custom Resource Data',
            alternative: 'Hardcoded get_node("../../UI/HealthBar") paths',
            verdict: 'Prevents scene tree refactoring from breaking child components and enables isolated unit testing.',
          },
        ],
        quiz: {
          id: 'quiz-godot-1',
          question:
            'In Godot 4, why should physics movement and `move_and_slide()` be executed inside `_physics_process(delta)` rather than `_process(delta)`?',
          options: [
            '_physics_process runs at a deterministic fixed tick rate synchronized with the physics server, preventing collision tunneling across variable monitor refresh rates.',
            '_process(delta) only runs once when the game boots.',
            'move_and_slide() is a syntax error inside _process.',
            '_physics_process disables 3D rendering.',
          ],
          correctIndex: 0,
          explanation:
            '_physics_process ticks in lockstep with the physics step (e.g., 60Hz fixed delta), ensuring deterministic collision resolution.',
          xpReward: 300,
        },
      },
    ],
  },
  {
    id: 'cat-hotburn-tech-art-story',
    company: 'HOTBURN STUDIOS',
    title: 'Technical Artist & Story Director: Shaders, VFX & Branching Narrative',
    category: 'GODOT, TECH ART & STORY',
    categorySubLabel: 'HOTBURN STUDIOS · Tech Art & Story Track',
    statusBadge: 'LIVE TRACK',
    difficulty: 'Staff / Lead',
    duration: '19h · 4 Modules',
    xpTotal: 1400,
    description:
      'Dual mastery for HOTBURN STUDIOS creative leads: write custom stylised & dissolve shaders, GPU particle VFX, MultiMesh foliage batching, and branching narrative dialogue graphs.',
    thumbnailUrl: THUMB_GODOT_TECH_ART_STORY,
    accentPattern: 'architecture',
    skillsCovered: ['Technical Artist', 'Story Writer / Director', 'GDShader / HLSL', 'Branching Dialogue'],
    modules: [
      {
        id: 'mod-story-tech-1',
        title: '01. Branching Narrative State Graphs & Technical Art Scene Pacing',
        duration: '3h 55m',
        summary:
          'Structure data-driven dialogue trees with world-state condition flags, faction reputation weights, and real-time shader/lighting mood transitions.',
        architectureDiagram: `[DialogueResource (JSON / tres)]
   Node "elder_intro"
     |-- Choice A [Requires: faction_rep >= 20] --> Node "secret_shrine_unlocked" (Triggers World Shader Mood Shift)
     +-- Choice B [Default]                     --> Node "standard_mercenary_contract"`,
        codeSnippet: {
          language: 'json',
          filename: 'branching_quest_dialogue.json',
          code: `{
  "dialogueId": "hotburn_act1_citadel_gate",
  "speaker": "Commander Vaelen",
  "moodLightingPreset": "volcanic_dusk_high_contrast",
  "lines": [
    "The obsidian sluices haven't opened since the Gaea fault ruptured."
  ],
  "choices": [
    {
      "text": "[Technical Lore] Inspect the hydraulic pressure valve seals.",
      "requiredFlag": "has_engineer_lens",
      "nextNode": "valve_bypass_discovery",
      "reputationDelta": 15
    },
    {
      "text": "We'll force the upper bridge before nightfall.",
      "nextNode": "bridge_ambush_combat",
      "reputationDelta": -5
    }
  ]
}`,
        },
        tradeOffs: [
          {
            dimension: 'Narrative Storage Format',
            chosenApproach: 'External Data-Driven Graph (JSON / Custom Resources)',
            alternative: 'Deeply Nested if/else Strings Hardcoded in Player Script',
            verdict: 'Allows Story Writers & Directors to author, localize, and test 5,000+ lines without recompiling gameplay code.',
          },
        ],
        quiz: {
          id: 'quiz-story-tech-1',
          question:
            'Why do professional Game Story Writers & Narrative Directors store branching dialogue in external state graphs (JSON / Resources) with world-state flags rather than hardcoding `if/else` blocks inside character movement scripts?',
          options: [
            'It decouples narrative authoring, localization, and quest state validation from core physics/gameplay code.',
            'JSON files automatically generate 3D character meshes.',
            'Game engines cannot compile strings longer than 10 characters.',
            'Hardcoded if/else blocks delete audio files.',
          ],
          correctIndex: 0,
          explanation:
            'Decoupling narrative data into structured graphs allows writers, directors, and localization teams to iterate safely and validate dead-end branches automatically.',
          xpReward: 250,
        },
      },
    ],
  },
];

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-sql-mongo-analytics',
    company: 'JANKEN CORPS',
    slug: 'sql-workbench-cohort-deduplication',
    title: '01. [JANKEN CORPS] SQL & Data Pipeline Deduplication + Revenue Aggregation',
    difficulty: 'Medium',
    category: 'Data Managing (SQL / MongoDB) & Analytics',
    companies: ['JANKEN CORPS', 'AWS Data Lab', 'Stripe'],
    acceptanceRate: '56.4%',
    timeLimitMs: 150,
    memoryLimitMb: 64,
    description:
      'Given a stream of transaction records from SQL Workbench / MongoDB where network retries may produce duplicate transactionIds, filter out duplicate transactionIds (keeping the first seen) and return the total settled revenue per region sorted descending.',
    inputSpec: 'records: { txId: string; region: string; amount: number }[]',
    outputSpec: '{ region: string; totalRevenue: number }[]',
    constraints: [
      '1 <= records.length <= 10^5',
      'Deduplicate by txId in O(N) time before grouping by region',
    ],
    hints: [
      'Maintain a Set of seen txIds and a Map of region -> accumulated revenue.',
      'Sort the final entries by totalRevenue descending.',
    ],
    optimalTimeComplexity: 'O(N + R log R)',
    optimalSpaceComplexity: 'O(U) unique transactions',
    starterCode: {
      typescript: `export function aggregateCleanRevenue(
  records: { txId: string; region: string; amount: number }[]
): { region: string; totalRevenue: number }[] {
  const seenTx = new Set<string>();
  const revenueByRegion = new Map<string, number>();

  for (const row of records) {
    if (!seenTx.has(row.txId)) {
      seenTx.add(row.txId);
      revenueByRegion.set(row.region, (revenueByRegion.get(row.region) || 0) + row.amount);
    }
  }

  return [...revenueByRegion.entries()]
    .map(([region, totalRevenue]) => ({ region, totalRevenue }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);
}`,
      python: `def aggregate_clean_revenue(records: list[dict]) -> list[dict]:
    seen = set()
    totals = {}
    for r in records:
        if r["txId"] not in seen:
            seen.add(r["txId"])
            totals[r["region"]] = totals.get(r["region"], 0) + r["amount"]
    return [{"region": k, "totalRevenue": v} for k, v in sorted(totals.items(), key=lambda x: -x[1])]`,
      cpp: `#include <vector>
#include <string>
using namespace std;
// C++ implementation stub`,
      java: `import java.util.*;
class Solution {}`,
    },
    solutionKeyTokens: ['return', 'seen', 'region', 'sort'],
    testCases: [
      {
        id: 'tc-sql-1',
        input: 'records = [{txId:"t1", region:"APAC", amount:500}, {txId:"t1", region:"APAC", amount:500}, {txId:"t2", region:"EU", amount:800}]',
        expectedOutput: '[{ region: "EU", totalRevenue: 800 }, { region: "APAC", totalRevenue: 500 }]',
        explanation: 'Duplicate txId t1 is ignored; EU (800) ranks above APAC (500).',
      },
      {
        id: 'tc-sql-2',
        input: 'records = [{txId:"a1", region:"US", amount:300}, {txId:"a2", region:"US", amount:450}]',
        expectedOutput: '[{ region: "US", totalRevenue: 750 }]',
      },
      {
        id: 'tc-sql-3',
        input: 'records = [{txId:"x9", region:"IN", amount:1200}]',
        expectedOutput: '[{ region: "IN", totalRevenue: 1200 }]',
      },
    ],
  },
  {
    id: 'prob-aws-autoscaler',
    company: 'JANKEN CORPS',
    slug: 'aws-cloud-autoscaling-cooldown',
    title: '02. [JANKEN CORPS] AWS Cloud Auto-Scaling Fleet Planner',
    difficulty: 'Hard',
    category: 'AWS Cloud & Web Infrastructure',
    companies: ['JANKEN CORPS', 'Amazon Web Services', 'Cloudflare'],
    acceptanceRate: '48.2%',
    timeLimitMs: 140,
    memoryLimitMb: 64,
    description:
      'Given an array of per-minute incoming request loads, a target capacity of K requests per EC2 instance, and a minimum/maximum fleet bound [minInstances, maxInstances], compute the required EC2 instance count for each minute using ceiling division clamped to the fleet bounds.',
    inputSpec: 'loads: number[], capacityPerInstance: number, minInst: number, maxInst: number',
    outputSpec: 'number[] — active EC2 instances per minute',
    constraints: ['1 <= loads.length <= 10^5', 'Target Time Complexity: O(N)'],
    hints: [
      'Use Math.ceil(load / capacityPerInstance) and clamp between [minInst, maxInst].',
    ],
    optimalTimeComplexity: 'O(N)',
    optimalSpaceComplexity: 'O(1) auxiliary',
    starterCode: {
      typescript: `export function computeEC2FleetSchedule(
  loads: number[],
  capacityPerInstance: number,
  minInst: number,
  maxInst: number
): number[] {
  return loads.map((load) => {
    const needed = Math.ceil(load / capacityPerInstance);
    return Math.max(minInst, Math.min(maxInst, needed));
  });
}`,
      python: `import math
def compute_ec2_fleet_schedule(loads: list[int], cap: int, min_i: int, max_i: int) -> list[int]:
    return [max(min_i, min(max_i, math.ceil(x / cap))) for x in loads]`,
      cpp: `#include <vector>
using namespace std;`,
      java: `import java.util.*;
class Solution {}`,
    },
    solutionKeyTokens: ['return', 'ceil', 'max', 'min'],
    testCases: [
      {
        id: 'tc-aws-1',
        input: 'loads = [150, 950, 5000], capacityPerInstance = 200, minInst = 2, maxInst = 12',
        expectedOutput: '[2, 5, 12]',
        explanation: '150 needs 1 -> clamped to min 2; 950 needs 5; 5000 needs 25 -> clamped to max 12.',
      },
      {
        id: 'tc-aws-2',
        input: 'loads = [400, 401], capacityPerInstance = 200, minInst = 1, maxInst = 10',
        expectedOutput: '[2, 3]',
      },
      {
        id: 'tc-aws-3',
        input: 'loads = [0], capacityPerInstance = 100, minInst = 2, maxInst = 8',
        expectedOutput: '[2]',
      },
    ],
  },
  {
    id: 'prob-hotburn-godot-lod',
    company: 'HOTBURN STUDIOS',
    slug: 'hotburn-godot-lod-and-gaea-culling',
    title: '03. [HOTBURN STUDIOS] Godot 4 & Blender LOD Polycount Budget Selector',
    difficulty: 'Medium',
    category: 'Godot 4, Blender 3D & Technical Art',
    companies: ['HOTBURN STUDIOS', 'Godot Engine Core', ' AAA Game Studios'],
    acceptanceRate: '59.1%',
    timeLimitMs: 120,
    memoryLimitMb: 64,
    description:
      'In a HOTBURN STUDIOS open-world Gaea biome, each 3D environment prop has 3 Blender LOD meshes: LOD0 (distance < 25m), LOD1 (25m <= distance < 80m), LOD2 (80m <= distance <= 200m), and Culled (distance > 200m). Given camera distances for N props, return the active LOD label for each prop.',
    inputSpec: 'distances: number[]',
    outputSpec: '("LOD0" | "LOD1" | "LOD2" | "CULLED")[]',
    constraints: ['1 <= distances.length <= 10^5', 'Target Time Complexity: O(N)'],
    hints: [
      'Evaluate distance thresholds in ascending order: < 25 -> LOD0, < 80 -> LOD1, <= 200 -> LOD2, else CULLED.',
    ],
    optimalTimeComplexity: 'O(N)',
    optimalSpaceComplexity: 'O(1) auxiliary',
    starterCode: {
      typescript: `export function selectMeshLODLevels(
  distances: number[]
): ('LOD0' | 'LOD1' | 'LOD2' | 'CULLED')[] {
  return distances.map((d) => {
    if (d < 25) return 'LOD0';
    if (d < 80) return 'LOD1';
    if (d <= 200) return 'LOD2';
    return 'CULLED';
  });
}`,
      python: `def select_mesh_lod_levels(distances: list[float]) -> list[str]:
    out = []
    for d in distances:
        if d < 25: out.append("LOD0")
        elif d < 80: out.append("LOD1")
        elif d <= 200: out.append("LOD2")
        else: out.append("CULLED")
    return out`,
      cpp: `#include <vector>
#include <string>
using namespace std;`,
      java: `import java.util.*;
class Solution {}`,
    },
    solutionKeyTokens: ['return', 'LOD0', 'LOD1', 'CULLED'],
    testCases: [
      {
        id: 'tc-hb-1',
        input: 'distances = [12, 45, 140, 260]',
        expectedOutput: '["LOD0", "LOD1", "LOD2", "CULLED"]',
      },
      {
        id: 'tc-hb-2',
        input: 'distances = [24.9, 25.0, 200.0, 200.1]',
        expectedOutput: '["LOD0", "LOD1", "LOD2", "CULLED"]',
      },
      {
        id: 'tc-hb-3',
        input: 'distances = [5, 10]',
        expectedOutput: '["LOD0", "LOD0"]',
      },
    ],
  },
  {
    id: 'prob-hotburn-story-quest-dag',
    company: 'HOTBURN STUDIOS',
    slug: 'hotburn-story-quest-state-verifier',
    title: '04. [HOTBURN STUDIOS] Story Director Branching Quest Dependency Verifier',
    difficulty: 'Lead Bar-Raiser',
    category: 'Story Direction, World Design & Godot Graphs',
    companies: ['HOTBURN STUDIOS', 'Narrative Systems Lab'],
    acceptanceRate: '44.8%',
    timeLimitMs: 200,
    memoryLimitMb: 64,
    description:
      'A HOTBURN STUDIOS Story Writer / Director authors a branching quest graph with N story beats (0 to N-1) and prerequisite edges [prereqBeat, nextBeat]. Verify that the quest storyline contains no impossible circular paradoxes (cycles) so players can reach the ending.',
    inputSpec: 'numBeats: number, prerequisites: [number, number][]',
    outputSpec: 'boolean — true if quest graph is a valid acyclic storyline',
    constraints: ['1 <= numBeats <= 10^4', 'Target Time Complexity: O(V + E)'],
    hints: [
      'Use Kahn topological sort (indegree queue) and check if visitedBeats === numBeats.',
    ],
    optimalTimeComplexity: 'O(V + E)',
    optimalSpaceComplexity: 'O(V + E)',
    starterCode: {
      typescript: `export function isStorylineValidDAG(
  numBeats: number,
  prerequisites: [number, number][]
): boolean {
  const adj: number[][] = Array.from({ length: numBeats }, () => []);
  const indeg = new Int32Array(numBeats);
  for (const [u, v] of prerequisites) {
    adj[u].push(v);
    indeg[v]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numBeats; i++) {
    if (indeg[i] === 0) queue.push(i);
  }
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    for (const v of adj[u]) {
      if (--indeg[v] === 0) queue.push(v);
    }
  }
  return head === numBeats;
}`,
      python: `from collections import deque
def is_storyline_valid_dag(num_beats: int, prerequisites: list[tuple[int, int]]) -> bool:
    adj = [[] for _ in range(num_beats)]
    indeg = [0] * num_beats
    for u, v in prerequisites:
        adj[u].append(v)
        indeg[v] += 1
    q = deque(i for i in range(num_beats) if indeg[i] == 0)
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return visited == num_beats`,
      cpp: `#include <vector>
using namespace std;`,
      java: `import java.util.*;
class Solution {}`,
    },
    solutionKeyTokens: ['return', 'indeg', 'queue'],
    testCases: [
      {
        id: 'tc-story-1',
        input: 'numBeats = 4, prerequisites = [[0,1], [1,2], [2,3]]',
        expectedOutput: 'true',
      },
      {
        id: 'tc-story-2',
        input: 'numBeats = 2, prerequisites = [[0,1], [1,0]]',
        expectedOutput: 'false',
        explanation: 'Circular quest paradox between beat 0 and beat 1.',
      },
      {
        id: 'tc-story-3',
        input: 'numBeats = 3, prerequisites = [[0,2], [1,2]]',
        expectedOutput: 'true',
      },
    ],
  },
];

export const PROCTORED_OA_SUITES: ProctoredOASuite[] = [
  {
    id: 'oa-janken-cloud-data-sprint',
    company: 'JANKEN CORPS',
    title: 'JANKEN CORPS: AWS Cloud, Web, SQL & Data Analytics Assessment',
    subtitle: 'JANKEN CORPS Official Career Track Exam',
    durationMinutes: 35,
    statusBadge: 'PROCTORED',
    difficulty: 'JANKEN CORPS Verified Benchmark',
    targetRoles: [
      'AWS Cloud Solutions Architect',
      'Web Designing & Frontend UI Engineer',
      'Data Managing (SQL Workbench & MongoDB)',
      'Data Analytics & BI Engineer',
    ],
    description:
      'Multi-section assessment covering AWS Multi-AZ Cloud architecture, Responsive Web Designing, MySQL Workbench & MongoDB Data Managing, and SQL Window Analytics.',
    thumbnailUrl: THUMB_JANKEN_CLOUD_DATA,
    questions: [
      {
        id: 'q-jc-1',
        section: 'AWS Cloud & Web',
        prompt:
          'In AWS Cloud, which combination provides high availability and automatic traffic distribution for web servers across multiple Availability Zones while keeping backend databases unreachable from the public internet?',
        options: [
          'Application Load Balancer in Public Subnets + EC2 Auto Scaling in Private Subnets + RDS Multi-AZ in Isolated Data Subnets.',
          'Placing all EC2 and RDS instances in a single Public Subnet with 0.0.0.0/0 open.',
          'Using a single EC2 instance without Auto Scaling or Load Balancing.',
          'Storing database passwords in public HTML files.',
        ],
        correctIndex: 0,
        explanation:
          'Public ALB + Private App Subnets + Isolated Multi-AZ RDS enforces defense-in-depth and automatic AZ failover.',
        points: 25,
      },
      {
        id: 'q-jc-2',
        section: 'SQL Workbench & MongoDB',
        prompt:
          'You are managing a hybrid data pipeline using MySQL Workbench and MongoDB. When should you use a relational SQL transaction over an embedded MongoDB document?',
        options: [
          'When enforcing multi-table ACID financial invariants and normalized foreign-key relationships across structured entities.',
          'When storing unstructured single-object JSON logs with no joins.',
          'Never; SQL databases cannot store numbers.',
          'Only when the table has fewer than 5 rows.',
        ],
        correctIndex: 0,
        explanation:
          'Relational SQL excels at normalized multi-entity ACID invariants, while MongoDB excels at flexible, high-locality document hierarchies.',
        points: 25,
      },
      {
        id: 'q-jc-3',
        section: 'Data Analytics',
        prompt:
          'In Data Analytics SQL, which window function clause calculates a 7-day moving average over daily revenue ordered by `metric_date`?',
        options: [
          'AVG(daily_rev) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)',
          'SUM(daily_rev) WHERE metric_date = 7',
          'GROUP BY HAVING 7 DAYS',
          'DROP INDEX metric_date',
        ],
        correctIndex: 0,
        explanation:
          'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW includes the current day plus the 6 prior days (7 days total).',
        points: 25,
      },
      {
        id: 'q-jc-4',
        section: 'AWS Cloud & Web',
        prompt:
          'In responsive Web Designing, which CSS layout technique creates cards that automatically wrap into as many columns as fit the screen (minimum 300px wide) without media query breakpoints?',
        options: [
          'grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));',
          'position: fixed; width: 2000px;',
          'float: left; overflow: hidden;',
          'display: table-cell;',
        ],
        correctIndex: 0,
        explanation:
          'CSS Grid auto-fit with minmax() dynamically adapts column counts to the available container width.',
        points: 25,
      },
    ],
  },
  {
    id: 'oa-hotburn-gamedev-3d-sprint',
    company: 'HOTBURN STUDIOS',
    title: 'HOTBURN STUDIOS: 3D Modelling, Rigging, Gaea World & Godot Exam',
    subtitle: 'HOTBURN STUDIOS Official Production Benchmark',
    durationMinutes: 40,
    statusBadge: 'LIVE SPRINT',
    difficulty: 'HOTBURN STUDIOS Studio Benchmark',
    targetRoles: [
      '3D Modeller & Blender Artist',
      'Character Animator & Rigger',
      'Technical Artist & Shader Engineer',
      'World Designer & Gaea Terrain Artist',
      'Game Designer & Godot Coder',
    ],
    description:
      'Studio readiness test covering Blender quad topology & baking, IK/FK skeletal rigging, Gaea terrain heightmaps & splat masks, Technical Art shaders, Story Direction, and Godot 4 GDScript.',
    thumbnailUrl: THUMB_HOTBURN_GAMEDEV,
    questions: [
      {
        id: 'q-hb-1',
        section: 'Godot, Blender & Gaea',
        prompt:
          'As a 3D Modeller & Rigger in Blender exporting characters to Godot 4, why should deformation bones (joints around shoulders, elbows, knees) be surrounded by concentric quad edge loops rather than random triangles or N-gons?',
        options: [
          'Concentric quad loops compress and stretch predictably along the joint bend axis without pinching or shading collapse.',
          'Godot 4 deletes any mesh that contains quads.',
          'N-gons automatically animate themselves.',
          'Triangles cannot have UV coordinates.',
        ],
        correctIndex: 0,
        explanation:
          'Clean quad edge loops aligned perpendicular to the bone rotation axis ensure clean volume preservation during animation.',
        points: 25,
      },
      {
        id: 'q-hb-2',
        section: 'Godot, Blender & Gaea',
        prompt:
          'As a World Designer & Environmental Artist using Gaea for terrain generation, what is the purpose of exporting Erosion Flow, Wear, and Deposit masks alongside the 16-bit heightmap?',
        options: [
          'They drive procedural splat-map shader blending in the game engine so cliffs receive rock textures, valleys receive soil/grass, and riverbeds receive wet sediment.',
          'They compress audio files in Godot.',
          'They replace the character skeletal rig.',
          'They reduce screen resolution to 320x240.',
        ],
        correctIndex: 0,
        explanation:
          'Gaea erosion masks (Flow, Wear, Deposit) provide physically accurate geological masks for driving multi-layer terrain shaders.',
        points: 25,
      },
      {
        id: 'q-hb-3',
        section: 'Godot, Blender & Gaea',
        prompt:
          'In Godot 4 Game Design & Coding, what does the architectural rule "Call Down, Signal Up" mean when organizing a Scene Tree?',
        options: [
          'Parent nodes call methods directly on their known child nodes, while child nodes emit Signals upward without hardcoding parent node paths.',
          'Child nodes delete their parent nodes on every frame.',
          'All scripts must be written in a single 50,000-line file.',
          'Signals can only be used in 2D menus.',
        ],
        correctIndex: 0,
        explanation:
          '"Call down, signal up" keeps child scenes self-contained and reusable in any parent scene without brittle get_parent() dependencies.',
        points: 25,
      },
      {
        id: 'q-hb-4',
        section: 'Godot, Blender & Gaea',
        prompt:
          'As a Technical Artist optimizing an open-world forest in Godot 4 with 40,000 identical pine trees and rocks, which node reduces 40,000 individual CPU draw calls into instanced GPU batches?',
        options: [
          'MultiMeshInstance3D (Hardware GPU Instancing) combined with hierarchical LODs.',
          '40,000 separate OmniLight3D nodes with shadows enabled.',
          'Duplicating 40,000 RigidBody3D nodes running physics every frame.',
          'Using 8K uncompressed textures for every leaf.',
        ],
        correctIndex: 0,
        explanation:
          'MultiMeshInstance3D renders thousands of instances of the same mesh in a single instanced GPU draw call.',
        points: 25,
      },
    ],
  },
];

export const JOB_POSTINGS: JobPosting[] = [
  // ============================================================================
  // COMPANY 1: JANKEN CORPS ROLES (4)
  // ============================================================================
  {
    id: 'job-janken-aws-architect',
    company: 'JANKEN CORPS',
    division: 'Cloud Infrastructure Division',
    roleTitle: 'AWS Cloud Solutions Architect & DevOps Lead',
    location: 'Bengaluru / Remote',
    workMode: 'Hybrid · Bengaluru',
    compensationINR: '₹28L – ₹45L PA',
    compensationUSD: '$140k – $185k',
    statusBadge: 'HIRING NOW',
    categorySubLabel: 'JANKEN CORPS · AWS CLOUD',
    minBenchmarkScore: 78,
    requiredSkills: ['AWS VPC & EC2', 'IAM Security', 'S3 & Lambda', 'Terraform / CloudFormation'],
    requiredCourseIds: ['cat-janken-aws-cloud'],
    requiredProblemIds: ['prob-aws-autoscaler'],
    description:
      'Design and manage JANKEN CORPS Multi-AZ AWS cloud environments, serverless event pipelines, and zero-downtime auto-scaling fleets.',
    architectureChallenge: 'Multi-region AWS failover with sub-30s RTO and strict IAM boundaries.',
    thumbnailUrl: THUMB_JANKEN_CLOUD_DATA,
    hiringManager: 'Vikramaditya Rao (VP Cloud, JANKEN CORPS)',
  },
  {
    id: 'job-janken-web-designer',
    company: 'JANKEN CORPS',
    division: 'Digital Product & Design Studio',
    roleTitle: 'Senior Web Designer & Interactive UI Engineer',
    location: 'Remote · Global',
    workMode: 'Remote · Global',
    compensationINR: '₹20L – ₹34L PA',
    compensationUSD: '$115k – $155k',
    statusBadge: 'DIRECT FAST-TRACK',
    categorySubLabel: 'JANKEN CORPS · WEB DESIGNING',
    minBenchmarkScore: 74,
    requiredSkills: ['Web Designing', 'CSS Grid & Tailwind', 'React 19', 'Design Systems & UX'],
    requiredCourseIds: ['cat-janken-web-design'],
    requiredProblemIds: ['prob-aws-autoscaler'],
    description:
      'Craft high-impact, responsive web experiences, interactive design systems, and WCAG-accessible interfaces for JANKEN CORPS enterprise products.',
    architectureChallenge: 'Unified design token architecture across desktop and mobile web.',
    thumbnailUrl: THUMB_WEB_DESIGN_STUDIO,
    hiringManager: 'Ananya Deshmukh (Head of Web Design, JANKEN CORPS)',
  },
  {
    id: 'job-janken-data-manager',
    company: 'JANKEN CORPS',
    division: 'Core Data Engineering Group',
    roleTitle: 'Data Managing Specialist (SQL Workbench, PostgreSQL & MongoDB)',
    location: 'Bengaluru / Remote',
    workMode: 'Hybrid · Bengaluru',
    compensationINR: '₹24L – ₹38L PA',
    compensationUSD: '$125k – $165k',
    statusBadge: 'VERIFIED PARTNER',
    categorySubLabel: 'JANKEN CORPS · DATA MANAGING',
    minBenchmarkScore: 76,
    requiredSkills: ['SQL & MySQL Workbench', 'PostgreSQL', 'MongoDB Aggregation', 'Database Indexing'],
    requiredCourseIds: ['cat-janken-data-managing'],
    requiredProblemIds: ['prob-sql-mongo-analytics'],
    description:
      'Own relational schema modeling in SQL Workbench, high-throughput query tuning, and distributed MongoDB document clusters.',
    architectureChallenge: 'Sub-15ms p99 query execution across 500M+ hybrid SQL and MongoDB records.',
    thumbnailUrl: THUMB_JANKEN_CLOUD_DATA,
    hiringManager: 'Meera Sundaram (Principal Data Architect, JANKEN CORPS)',
  },
  {
    id: 'job-janken-data-analyst',
    company: 'JANKEN CORPS',
    division: 'Intelligence & BI Division',
    roleTitle: 'Data Analytics & Decision Science Engineer',
    location: 'Remote',
    workMode: 'Remote',
    compensationINR: '₹18L – ₹30L PA',
    compensationUSD: '$105k – $140k',
    statusBadge: 'HIRING NOW',
    categorySubLabel: 'JANKEN CORPS · DATA ANALYTICS',
    minBenchmarkScore: 72,
    requiredSkills: ['SQL Window Functions', 'Python & Pandas', 'Cohort Analysis', 'BI Dashboards'],
    requiredCourseIds: ['cat-janken-data-analytics'],
    requiredProblemIds: ['prob-sql-mongo-analytics'],
    description:
      'Build executive telemetry dashboards, SQL retention cohorts, and predictive revenue models across JANKEN CORPS product lines.',
    architectureChallenge: 'Real-time anomaly detection and multi-touch attribution modeling.',
    thumbnailUrl: THUMB_DATA_ANALYTICS_BI,
    hiringManager: 'Karan Malhotra (Director of Analytics, JANKEN CORPS)',
  },

  // ============================================================================
  // COMPANY 2: HOTBURN STUDIOS ROLES (6)
  // ============================================================================
  {
    id: 'job-hotburn-modeller',
    company: 'HOTBURN STUDIOS',
    division: '3D Character & Asset Division',
    roleTitle: '3D Modeller & Blender Asset Artist (Characters / Props)',
    location: 'Remote / Bengaluru Studio',
    workMode: 'Remote · Global',
    compensationINR: '₹20L – ₹35L PA',
    compensationUSD: '$115k – $155k',
    statusBadge: 'HIRING NOW',
    categorySubLabel: 'HOTBURN STUDIOS · MODELLER & BLENDER',
    minBenchmarkScore: 75,
    requiredSkills: ['Blender 4.x', 'Hard-Surface & Sculpting', 'Quad Retopology', 'UVs & PBR Baking'],
    requiredCourseIds: ['cat-hotburn-blender-modeller'],
    requiredProblemIds: ['prob-hotburn-godot-lod'],
    description:
      'Create hero characters, weapons, and hard-surface props in Blender with clean quad topology, optimized UVs, and baked PBR textures.',
    architectureChallenge: 'Hero assets under 30k tris with zero normal-map baking seams.',
    thumbnailUrl: THUMB_HOTBURN_GAMEDEV,
    hiringManager: 'Kenji Takahashi (Lead Character Artist, HOTBURN STUDIOS)',
  },
  {
    id: 'job-hotburn-animator-rigger',
    company: 'HOTBURN STUDIOS',
    division: 'Animation & Cinematics Guild',
    roleTitle: '3D Character Animator & Technical Rigger',
    location: 'Remote · Global',
    workMode: 'Remote · Global',
    compensationINR: '₹22L – ₹38L PA',
    compensationUSD: '$120k – $165k',
    statusBadge: 'DIRECT FAST-TRACK',
    categorySubLabel: 'HOTBURN STUDIOS · ANIMATOR & RIGGER',
    minBenchmarkScore: 76,
    requiredSkills: ['Skeletal Rigging', 'IK/FK Control Rigs', 'Weight Painting', 'Combat Animation'],
    requiredCourseIds: ['cat-hotburn-animator-rigger'],
    requiredProblemIds: ['prob-hotburn-godot-lod'],
    description:
      'Rig bipedal and creature armatures in Blender with IK/FK snapping and author responsive combat, traversal, and cinematic animations for Godot 4.',
    architectureChallenge: 'Zero foot-sliding root motion and deformation-clean shoulder/hip rigs.',
    thumbnailUrl: THUMB_HOTBURN_GAMEDEV,
    hiringManager: 'Elena Rostova (Animation Director, HOTBURN STUDIOS)',
  },
  {
    id: 'job-hotburn-world-env-gaea',
    company: 'HOTBURN STUDIOS',
    division: 'Open-World Biome Team',
    roleTitle: 'World Designer & Environmental Artist (Gaea & Blender)',
    location: 'Hybrid · Tokyo / Remote',
    workMode: 'Hybrid · Tokyo / Remote',
    compensationINR: '₹26L – ₹44L PA',
    compensationUSD: '$135k – $180k',
    statusBadge: 'HIRING NOW',
    categorySubLabel: 'HOTBURN STUDIOS · WORLD, ENV ART & GAEA',
    minBenchmarkScore: 78,
    requiredSkills: ['Gaea Terrain', 'Environmental Art', 'World Design', 'Trim Sheets & Lighting'],
    requiredCourseIds: ['cat-hotburn-world-gaea-env'],
    requiredProblemIds: ['prob-hotburn-godot-lod'],
    description:
      'Sculpt geological terrains in Gaea, build modular environment kits in Blender, and dress atmospheric open-world levels with volumetric lighting.',
    architectureChallenge: 'Seamless 4km x 4km Gaea terrain streaming at 60 FPS.',
    thumbnailUrl: THUMB_GAEA_TERRAIN_WORLD,
    hiringManager: 'Marcus Vance (Principal World Director, HOTBURN STUDIOS)',
  },
  {
    id: 'job-hotburn-tech-artist',
    company: 'HOTBURN STUDIOS',
    division: 'Graphics & Pipeline Core',
    roleTitle: 'Technical Artist (Shaders, VFX, Gaea Splatmaps & Profiling)',
    location: 'Remote · Global',
    workMode: 'Remote · Global',
    compensationINR: '₹30L – ₹50L PA',
    compensationUSD: '$150k – $200k',
    statusBadge: 'DIRECT FAST-TRACK',
    categorySubLabel: 'HOTBURN STUDIOS · TECHNICAL ARTIST',
    minBenchmarkScore: 80,
    requiredSkills: ['GDShader / HLSL', 'Gaea Splat Shaders', 'VFX Particles', 'GPU Draw-Call Profiling'],
    requiredCourseIds: ['cat-hotburn-tech-art-story', 'cat-hotburn-world-gaea-env'],
    requiredProblemIds: ['prob-hotburn-godot-lod'],
    description:
      'Author custom triplanar terrain shaders, stylised post-processing, real-time VFX particles, and Blender-to-Godot automated asset tooling.',
    architectureChallenge: 'Sub-16.6ms GPU frame budget with dynamic weather and water shaders.',
    thumbnailUrl: THUMB_GODOT_TECH_ART_STORY,
    hiringManager: 'Siddharth Verma (Lead Technical Artist, HOTBURN STUDIOS)',
  },
  {
    id: 'job-hotburn-story-director',
    company: 'HOTBURN STUDIOS',
    division: 'Narrative & World Lore Studio',
    roleTitle: 'Story Writer / Narrative Director',
    location: 'Remote',
    workMode: 'Remote',
    compensationINR: '₹18L – ₹32L PA',
    compensationUSD: '$110k – $150k',
    statusBadge: 'VERIFIED PARTNER',
    categorySubLabel: 'HOTBURN STUDIOS · STORY WRITER / DIRECTOR',
    minBenchmarkScore: 72,
    requiredSkills: ['Story Writing', 'Narrative Direction', 'Branching Dialogue', 'World Lore Bibles'],
    requiredCourseIds: ['cat-hotburn-tech-art-story'],
    requiredProblemIds: ['prob-hotburn-story-quest-dag'],
    description:
      'Lead world-building lore bibles, character arcs, branching quest dialogue systems, and environmental storytelling direction.',
    architectureChallenge: 'Non-linear multi-faction quest graph with zero narrative dead-ends.',
    thumbnailUrl: THUMB_GODOT_TECH_ART_STORY,
    hiringManager: 'Aria Sterling (Creative & Narrative Director, HOTBURN STUDIOS)',
  },
  {
    id: 'job-hotburn-godot-coder',
    company: 'HOTBURN STUDIOS',
    division: 'Core Gameplay Engineering',
    roleTitle: 'Game Designer & Coder (Godot 4 / GDScript / C#)',
    location: 'Remote / Bengaluru',
    workMode: 'Remote · Global',
    compensationINR: '₹25L – ₹42L PA',
    compensationUSD: '$130k – $175k',
    statusBadge: 'HIRING NOW',
    categorySubLabel: 'HOTBURN STUDIOS · GAME DESIGNER & CODER',
    minBenchmarkScore: 77,
    requiredSkills: ['Godot 4 Engine', 'GDScript / C#', '3D Combat Physics', 'AI State Machines'],
    requiredCourseIds: ['cat-hotburn-godot-gamedev'],
    requiredProblemIds: ['prob-hotburn-godot-lod', 'prob-hotburn-story-quest-dag'],
    description:
      'Design and code combat mechanics, CharacterBody3D movement controllers, boss AI behavior trees, and decoupled UI systems in Godot 4.',
    architectureChallenge: 'Frame-accurate combat hitboxes, parry windows, and save-state serialization.',
    thumbnailUrl: THUMB_GODOT_TECH_ART_STORY,
    hiringManager: 'Lucas Sorensen (Lead Gameplay Programmer, HOTBURN STUDIOS)',
  },
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-hb-1',
    company: 'HOTBURN STUDIOS',
    author: 'Kenji Takahashi',
    authorRole: 'Lead Environment & Technical Artist @ HOTBURN STUDIOS',
    authorElo: 2080,
    verifiedBadge: 'HOTBURN STUDIOS · GAEA + BLENDER + GODOT 4 PIPELINE',
    category: 'Game Dev, Godot & 3D Showcases',
    title: 'Production Breakdown: Exporting 4km Gaea Eroded Terrains into Godot 4 with Triplanar Splat Shaders',
    body: `Many World Designers and Environmental Artists struggle with texture stretching on steep cliff faces when importing Gaea heightmaps into Godot 4.

Here is our verified HOTBURN STUDIOS workflow:
1. In Gaea, export your heightmap as 16-bit EXR (never 8-bit PNG) and pack your Erosion Flow (R), Soil Deposit (G), Ridge Wear (B), and Snowfall (A) into a single RGBA Splatmap.
2. In Blender, generate your modular cliff kits and rock scatter meshes with clean quad retopology and a shared 2K ORM trim sheet.
3. In Godot 4, sample the RGBA splatmap in a custom GDShader using world-space triplanar projection on slopes steeper than 42 degrees. Zero UV stretching and locked 60 FPS!`,
    codeSnippet: `// Godot 4 World-Space Cliff Triplanar Blend
float slope = 1.0 - NORMAL.y;
vec3 cliff_proj = texture(rock_tex, world_pos.xy * 0.25).rgb;
ALBEDO = mix(ground_albedo, cliff_proj, smoothstep(0.35, 0.55, slope));`,
    timestamp: '1h ago',
    upvotes: 245,
    upvotedByMe: true,
    bookmarkedByMe: true,
    referralRequestedByMe: false,
    comments: [
      {
        id: 'c-hb-1',
        author: 'Elena Rostova',
        authorRole: 'Animation & Rigging Director @ HOTBURN STUDIOS',
        text: 'Combining Gaea flow masks with Godot MultiMeshInstance3D foliage scattering also saved our biome artists days of manual placement!',
        timestamp: '40m ago',
      },
    ],
  },
  {
    id: 'post-jc-1',
    company: 'JANKEN CORPS',
    author: 'Meera Sundaram',
    authorRole: 'Principal Data & Cloud Architect @ JANKEN CORPS',
    authorElo: 2110,
    verifiedBadge: 'JANKEN CORPS · AWS CLOUD & SQL WORKBENCH LEAD',
    category: 'Cloud, Web & SQL Breakdowns',
    title: 'How We Cut Hybrid SQL Workbench + MongoDB Analytics Latency by 68% on AWS Multi-AZ',
    body: `For candidates training on the JANKEN CORPS Data Managing & AWS Cloud tracks: here is what we look for when reviewing your capstone database & cloud projects:

1. SQL Workbench Schema Hygiene: Always verify your composite B-Tree index column order against your WHERE + ORDER BY clauses using EXPLAIN ANALYZE.
2. MongoDB Aggregation Discipline: Push $match and $project to the very first stage of your pipeline so compound indexes filter documents before in-memory $group accumulators run.
3. AWS Cloud Networking: Place your RDS and MongoDB clusters in isolated private subnets and route S3 analytical exports over a free VPC Gateway Endpoint.`,
    codeSnippet: `-- Covering Composite Index in SQL Workbench
CREATE INDEX idx_tenant_status_created ON transactions (tenant_id, status, created_at DESC);`,
    timestamp: '3h ago',
    upvotes: 189,
    upvotedByMe: false,
    bookmarkedByMe: false,
    referralRequestedByMe: false,
    comments: [],
  },
  {
    id: 'post-drop-1',
    company: 'HOTBURN STUDIOS',
    author: 'Lucas Sorensen',
    authorRole: 'Lead Gameplay Programmer @ HOTBURN STUDIOS',
    authorElo: 1995,
    verifiedBadge: 'HIRING MANAGER · 6 OPEN GAME DEV & 3D ART SLOTS',
    category: 'Open Referral Drops',
    title: '[FAST-TRACK HIRING] HOTBURN STUDIOS & JANKEN CORPS Direct Portfolio Review & Referral Drop',
    body: `We are actively reviewing trained candidates across both partner companies this week:

• HOTBURN STUDIOS Tracks: 3D Modeller (Blender), Animator & Rigger, Technical Artist, World Designer & Environmental Artist (Gaea), Story Writer/Director, and Game Designer & Coder (Godot 4).
• JANKEN CORPS Tracks: AWS Cloud Architect, Web Designing, Data Managing (SQL, SQL Workbench, MongoDB), and Data Analytics.

Choose your career track, complete the training modules, run an AI Project Review in the Interview Studio, and click "Request Peer Vouch / Referral" below!`,
    codeSnippet: `Active Companies: JANKEN CORPS (4 Tracks) + HOTBURN STUDIOS (7 Game/3D Tracks)`,
    timestamp: '6h ago',
    upvotes: 318,
    upvotedByMe: false,
    bookmarkedByMe: false,
    referralRequestedByMe: false,
    comments: [],
  },
];

export const INITIAL_CANDIDATE_STATE: CandidateProfileState = {
  name: 'Rohan Bandi',
  handle: '@rohan_creator',
  email: 'bandirohan43@gmail.com',
  selectedCompany: 'JANKEN CORPS',
  targetRole: 'AWS Cloud Solutions Architect',
  eloRating: 1840,
  globalReadinessScore: 84,
  xp: 2650,
  dossierHash: 'JC-ROHA-1840-V8214',
  completedModuleIds: ['mod-aws-1', 'mod-sql-1', 'mod-blender-1', 'mod-godot-1'],
  passedQuizIds: ['quiz-aws-1', 'quiz-sql-1', 'quiz-blender-1', 'quiz-godot-1'],
  solvedProblemIds: ['prob-sql-mongo-analytics', 'prob-hotburn-godot-lod'],
  savedCodeByProblem: {},
  codeAuditsByProblem: {
    'prob-sql-mongo-analytics': {
      timeComplexity: 'O(N + R log R)',
      spaceComplexity: 'O(U) unique transactions',
      optimalityScore: 97,
      edgeCasesCaught: [
        'Duplicate transaction IDs filtered before regional aggregation.',
        'Empty partition handled cleanly.',
      ],
      refactoringSuggestions: [
        'Maintain composite index on (txId, region) in SQL Workbench for streaming ingestion.',
      ],
      summaryVerdict: 'VERIFIED OPTIMAL — Cleared JANKEN CORPS Data Managing Benchmark.',
      verifiedAt: '2026-11-15T08:30:00Z',
    },
  },
  oaScorecards: [
    {
      suiteId: 'oa-janken-cloud-data-sprint',
      suiteTitle: 'JANKEN CORPS: AWS Cloud, Web, SQL & Data Analytics Assessment',
      completedAt: '2026-11-14T14:20:00Z',
      scorePercent: 88,
      pointsEarned: 75,
      totalPoints: 100,
      timeSpentSeconds: 1320,
      tabSwitchesUsed: 0,
      topicBreakdown: [
        { topic: 'AWS Cloud & Web', accuracy: 100 },
        { topic: 'SQL Workbench & MongoDB', accuracy: 100 },
        { topic: 'Data Analytics', accuracy: 75 },
      ],
      weakTopics: [],
      eloDelta: 35,
    },
  ],
  hiringPackets: [
    {
      id: 'pkt-seed-1',
      company: 'JANKEN CORPS',
      role: 'AWS Cloud Solutions Architect',
      mode: 'Architecture & Pipeline Design',
      persona: 'Strict Bar-Raiser',
      createdAt: '2026-11-14',
      decision: 'STRONG HIRE',
      overallScore: 89,
      recommendedLevel: 'JANKEN CORPS Senior / Lead Fast-Track',
      executiveSummary:
        'Candidate architected a Multi-AZ AWS VPC with isolated RDS/MongoDB data tiers, S3 Gateway Endpoints, and optimized SQL Workbench composite indexes.',
      strengths: [
        'Strong command of AWS Multi-AZ high availability and least-privilege IAM security.',
        'Combined SQL Workbench relational modeling with MongoDB aggregation pipelines cleanly.',
      ],
      gaps: ['Include automated Terraform drift detection in deployment runbooks.'],
      rubric: {
        problemSolving: 91,
        technicalDepth: 90,
        codeCleanliness: 86,
        communicationClarity: 89,
      },
    },
  ],
  projectReviews: [
    {
      id: 'proj-rev-seed-1',
      company: 'HOTBURN STUDIOS',
      careerTrack: 'World Designer & Gaea Terrain Artist',
      projectTitle: 'Obsidian Caldera — 4km Gaea Eroded Biome in Godot 4',
      toolsUsed: 'Gaea, Blender 4.2, Godot 4.3, GDShader',
      submittedAt: '2026-11-14',
      score: 92,
      verdict: 'PRODUCTION READY',
      architectureCritique:
        'Exceptional Gaea thermal/hydraulic erosion graph with 16-bit heightmap precision and RGBA splat-map blending inside Godot 4.',
      strengths: [
        'Zero terracing artifacts thanks to 16-bit EXR heightmap pipeline.',
        'Clean modular Blender cliff trim sheets with consistent texel density.',
        'Maintained 60 FPS using MultiMeshInstance3D foliage batching.',
      ],
      improvements: [
        'Add LOD2 billboard impostors for distant pine clusters beyond 180 meters.',
      ],
    },
  ],
  jobKanbanByJobId: {
    'job-janken-aws-architect': 'Technical Loop',
    'job-janken-data-manager': 'OA Cleared',
    'job-hotburn-world-env-gaea': 'Dossier Sent',
    'job-hotburn-godot-coder': 'Bookmarked',
    'job-hotburn-modeller': 'Offer Extended',
  },
  jobApplicationHashes: {
    'job-janken-aws-architect': 'JC-ROHA-1840-V8214#AWS',
    'job-janken-data-manager': 'JC-ROHA-1840-V8214#DATA',
    'job-hotburn-world-env-gaea': 'HB-ROHA-1840-V8214#GAEA',
    'job-hotburn-modeller': 'HB-ROHA-1840-V8214#BLENDER',
  },
  feedPosts: INITIAL_FEED_POSTS,
  inquiries: [
    {
      id: 'inq-seed-1',
      company: 'HOTBURN STUDIOS',
      recipientEmail: 'hotburnstudios@gmail.com',
      name: 'Rohan Bandi',
      email: 'bandirohan43@gmail.com',
      topic: 'HOTBURN STUDIOS — 3D / Godot / Gaea Portfolio Review',
      message:
        'Submitting my Gaea + Blender + Godot 4 open-world biome and JANKEN CORPS AWS/SQL capstone for direct mentor review.',
      dossierHash: 'JC-ROHA-1840-V8214',
      submittedAt: '2026-11-14 18:15 UTC',
      status: 'SENT TO hotburnstudios@gmail.com',
    },
  ],
  lastResumeAudit: null,
};
