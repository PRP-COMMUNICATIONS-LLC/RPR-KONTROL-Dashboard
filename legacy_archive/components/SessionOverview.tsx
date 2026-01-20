
import React from 'react';
import { SessionSchema, Artifact, DecisionLog, Classification } from '../types';
import { formatDateTime } from '../utils/sessionUtils';
import Button from './Button';

interface SessionOverviewProps {
  session: SessionSchema;
  onLockBaseline: (sessionId: string) => void;
  onGenerateAuditReport: (session: SessionSchema) => void;
}

const SessionOverview: React.FC<SessionOverviewProps> = ({ session, onLockBaseline, onGenerateAuditReport }) => {
  const isCrownSecret = session.classification === Classification.TS_LAMBDA_3;
  const isDefenseCollapsed = session.dual_state.defense_readiness === 'COLLAPSED';
  const isValidationCompliant = session.dual_state.validation_posture === 'COMPLIANT';
  const isValidationLocked = session.dual_state.validation_posture === 'LOCKED';

  return (
    <div className={`card-style p-6 max-w-4xl mx-auto my-8 space-y-6 ${isDefenseCollapsed ? 'pulse-glow-cyan shadow-cyan-glow' : ''}`}>
      <h2 className="section-prefix text-3xl font-bold text-rpr-white text-center mb-6">Session Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Session ID:</strong>
          <span className="w-2/3 break-words">{session.sessionId}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Project Code:</strong>
          <span className="w-2/3 break-words">{session.projectCode}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Timestamp:</strong>
          <span className="w-2/3">{formatDateTime(session.timestamp)}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Classification:</strong>
          <span 
            className={`w-2/3 font-semibold text-rpr-white ${isCrownSecret ? 'border border-rpr-cyan shadow-cyan-glow' : ''}`}
            style={{ '--tw-shadow-color': isCrownSecret ? 'var(--rpr-cyan)' : 'transparent', boxShadow: isCrownSecret ? '0 0 10px var(--rpr-cyan)' : 'none' }}
          >
            {session.classification}
          </span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Human Operator:</strong>
          <span className="w-2/3">{session.humanOperator}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Project Name:</strong>
          <span className="w-2/3 font-bold text-rpr-white">{session.context.projectName}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/3">Phase:</strong>
          <span className="w-2/3">{session.context.phase.charAt(0).toUpperCase() + session.context.phase.slice(1)}</span>
        </div>
        <div className="flex items-center md:col-span-2">
          <strong className="text-rpr-cyan w-1/3 md:w-1/6">Objective:</strong>
          <span className="w-2/3 md:w-5/6 text-justify">{session.context.objective}</span>
        </div>
        <div className="md:col-span-2">
          <strong className="text-rpr-cyan block mb-2">Agents Involved:</strong>
          <div className="flex flex-wrap gap-2">
            {session.agentsInvolved.map((agent) => (
              <span key={agent} className="bg-rpr-slate text-rpr-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-rpr-charcoal">
                {agent.charAt(0).toUpperCase() + agent.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h3 className="section-prefix text-2xl font-semibold text-rpr-white mt-8 mb-4">Dual State</h3>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md border ${isDefenseCollapsed ? 'border-red-500 bg-red-900 bg-opacity-20 shadow-[0_0_10px_rgba(239,68,68,0.7)]' : 'border-rpr-slate bg-rpr-charcoal'}`}>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/2">Validation Posture:</strong>
          <span className={`w-1/2 font-medium ${isValidationCompliant ? 'text-rpr-cyan border border-rpr-cyan' : isValidationLocked ? 'text-gray-400 border border-gray-600' : 'text-orange-400'}`}>
            {session.dual_state.validation_posture}
          </span>
        </div>
        <div className="flex items-center">
          <strong className="text-rpr-cyan w-1/2">Defense Readiness:</strong>
          <span className={`w-1/2 font-medium ${isDefenseCollapsed ? 'text-red-400 pulse-glow-cyan' : session.dual_state.defense_readiness === 'READY' ? 'text-rpr-teal' : 'text-gray-400'}`}>
            {session.dual_state.defense_readiness}
          </span>
        </div>
        {session.dual_state.last_audit_checkpoint && (
          <div className="flex items-center md:col-span-2">
            <strong className="text-rpr-cyan w-1/4 md:w-1/6">Last Audit:</strong>
            <span className="w-3/4 md:w-5/6">{formatDateTime(session.dual_state.last_audit_checkpoint)}</span>
          </div>
        )}
        
        <div className="md:col-span-2 flex flex-wrap justify-center gap-4 mt-4">
          {!isValidationLocked && (
            <Button
              onClick={() => onLockBaseline(session.sessionId)}
              variant="secondary"
              size="sm"
            >
              Lock Baseline (Ground Truth)
            </Button>
          )}
          {isValidationLocked && (
             <span className="text-gray-400 text-sm italic py-1 px-3 border border-gray-600 rounded">Baseline Locked</span>
          )}

          {isDefenseCollapsed && (
            <Button
              onClick={() => onGenerateAuditReport(session)}
              variant="primary"
              size="sm"
              className="animate-pulse"
            >
              Generate Audit Defense Report
            </Button>
          )}
        </div>
      </div>

      <h3 className="section-prefix text-2xl font-semibold text-rpr-white mt-8 mb-4">Artifacts Produced</h3>
      {session.artifactsProduced.length > 0 ? (
        <ul className="list-disc list-inside space-y-1 text-rpr-white">
          {session.artifactsProduced.map((artifact: Artifact, index) => (
            <li key={index}>
              <span className="font-medium text-rpr-white">{artifact.title}</span> (Type: {artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)}, Version: {artifact.version})
              {artifact.filePath && <span className="text-sm text-gray-400"> - Path: {artifact.filePath}</span>}
              {artifact.uri && <a href={artifact.uri} target="_blank" rel="noopener noreferrer" className="text-rpr-cyan hover:underline text-sm ml-2">Link</a>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No artifacts recorded yet.</p>
      )}

      <h3 className="section-prefix text-2xl font-semibold text-rpr-white mt-8 mb-4">Decisions Log</h3>
      {session.decisionsLog.length > 0 ? (
        <ul className="list-decimal list-inside space-y-2 text-rpr-white">
          {session.decisionsLog.map((decision: DecisionLog, index) => (
            <li key={index} className="bg-rpr-slate p-3 rounded-md border border-rpr-charcoal">
              <strong className="block text-rpr-white">{decision.decision}</strong>
              <span className="text-sm text-gray-300 block">Rationale: {decision.rationale}</span>
              <span className="text-xs text-gray-400 block">Authority: {decision.authority.replace('_', ' ').toLowerCase()} | {formatDateTime(decision.timestamp)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No decisions logged yet.</p>
      )}
    </div>
  );
};

export default SessionOverview;
