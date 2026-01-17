
export enum Classification {
  TS_LAMBDA_3 = 'TS-Λ3 (CROWN SECRET)',
  TS_LAMBDA_2 = 'TS-Λ2',
  INTERNAL = 'INTERNAL',
  PUBLIC = 'PUBLIC',
}

export enum ProjectScope {
  MYAUDIT = 'MYAUDIT',
  RPR_INTERNAL = 'RPR-INTERNAL',
  ALL = 'ALL',
}

export type ProjectClassificationFilter = Classification | 'ANY';

export enum AgentType {
  GEMINI = 'gemini',
  PERPLEXITY = 'perplexity',
  COPILOT = 'copilot',
  JULES = 'jules',
  FIREBASE = 'firebase',
  HUMAN = 'human',
}

export type HumanOperator = 'founder' | `team_member_${string}`;

export enum Phase {
  PLANNING = 'planning',
  IMPLEMENTATION = 'implementation',
  TESTING = 'testing',
  DEPLOYMENT = 'deployment',
}

export interface Context {
  projectName: string;
  phase: Phase;
  objective: string;
}

export interface ConversationTurn {
  turn: number;
  agent: AgentType | 'human';
  content: string;
  artifacts: string[];
  timestamp: string;
  vetoed?: boolean;
}

export interface PerformanceMetrics {
  taskCompletion: number;
  governanceAdherence: number;
  responseAccuracy: number;
  crossAgentCoordination: number;
  founderInterventionRate: number;
}

export enum ArtifactType {
  PRD = 'prd',
  CODE = 'code',
  SPEC = 'spec',
  GOVERNANCE_DOC = 'governance_doc',
  DEPLOYMENT = 'deployment',
  NOTEBOOK = 'notebook',
  SCHEMA = 'schema',
}

export interface Artifact {
  type: ArtifactType;
  title: string;
  filePath?: string;
  version: string;
  sha256?: string;
  uri?: string;
  driveFileId?: string;
  drivePath?: string;
}

export enum DecisionAuthority {
  FOUNDER = 'founder',
  SENTINEL_PROTOCOL = 'sentinel_protocol',
  AGENT_AUTONOMOUS = 'agent_autonomous',
}

export interface DecisionLog {
  decision: string;
  rationale: string;
  authority: DecisionAuthority;
  timestamp: string;
  sourceSessionId: string;
}

export interface DualState {
  validation_posture: 'COMPLIANT' | 'INCOMPLETE' | 'LOCKED';
  defense_readiness: 'READY' | 'DORMANT' | 'COLLAPSED';
  last_audit_checkpoint?: string;
}

export interface SessionSchema {
  sessionId: string;
  projectCode: string;
  timestamp: string;
  classification: Classification;
  agentsInvolved: AgentType[];
  humanOperator: HumanOperator;
  context: Context;
  conversation: ConversationTurn[];
  performanceMetrics: PerformanceMetrics;
  artifactsProduced: Artifact[];
  decisionsLog: DecisionLog[];
  dual_state: DualState;
}

export interface PerformanceReportData {
  summary: {
    agentPerformance: {
      agent: AgentType;
      taskCompletion: string;
      governanceAdherence: string;
      responseQuality: string;
      autonomyScore: string;
    }[];
    workflowEfficiency: {
      totalInteractions: number;
      founderInterventions: number;
      founderInterventionRate: string;
      escalationsTriggered: number;
      crossAgentCoordination: string;
      bottlenecksIdentified: string;
    };
    artifactsProduced: Artifact[];
    recommendations: string;
    flutterSyncStatus: {
      sessionArchived: boolean;
      artifactsVersioned: boolean;
      readyForRetrieval: boolean;
    };
  };
  markdownReport: string;
}

export interface AuditDefenseReportData {
  markdownReport: string;
  timestamp: string;
  authority: string;
}
