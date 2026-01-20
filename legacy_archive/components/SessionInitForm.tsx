
import React, { useState } from 'react';
import { SessionSchema, Classification, AgentType, Phase } from '../types';
import { generateSessionId, generateProjectCode } from '../utils/sessionUtils';
import { AGENTS_TRACKED, INITIAL_CONTEXT, INITIAL_CLASSIFICATION, INITIAL_HUMAN_OPERATOR, INITIAL_DUAL_STATE } from '../constants';
import Button from './Button';

interface SessionInitFormProps {
  onInitialize: (session: SessionSchema) => void;
}

const SessionInitForm: React.FC<SessionInitFormProps> = ({ onInitialize }) => {
  const [projectName, setProjectName] = useState(INITIAL_CONTEXT.projectName);
  const [projectCodeClient, setProjectCodeClient] = useState('CLIENT');
  const [projectCodeTaskNum, setProjectCodeTaskNum] = useState(1);
  const [objective, setObjective] = useState(INITIAL_CONTEXT.objective);
  const [classification, setClassification] = useState<Classification>(INITIAL_CLASSIFICATION);
  const [humanOperator, setHumanOperator] = useState<string>(INITIAL_HUMAN_OPERATOR);
  const [phase, setPhase] = useState<Phase>(INITIAL_CONTEXT.phase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSessionId = generateSessionId();
    const newProjectCode = generateProjectCode(projectCodeClient, projectCodeTaskNum);

    const newSession: SessionSchema = {
      sessionId: newSessionId,
      projectCode: newProjectCode,
      timestamp: new Date().toISOString(),
      classification: classification,
      agentsInvolved: AGENTS_TRACKED,
      humanOperator: humanOperator as `founder` | `team_member_${string}`,
      context: {
        projectName: projectName,
        phase: phase,
        objective: objective,
      },
      conversation: [
        {
          turn: 1,
          agent: AgentType.HUMAN,
          content: 'Session initialized.',
          artifacts: [],
          timestamp: new Date().toISOString(),
          vetoed: false, // New: Default to false for human input
        },
      ],
      performanceMetrics: {
        taskCompletion: 0,
        governanceAdherence: 0,
        responseAccuracy: 0,
        crossAgentCoordination: 0,
        founderInterventionRate: 0,
      },
      artifactsProduced: [],
      decisionsLog: [],
      dual_state: INITIAL_DUAL_STATE, // New: Initialize dual_state
    };
    onInitialize(newSession);
  };

  return (
    <div className="card-style p-6 max-w-4xl mx-auto my-8">
      <h2 className="section-prefix text-3xl font-bold mb-6 text-rpr-white text-center">Initialize New RPR-KONTROL Session</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectName" className="block text-rpr-white text-sm font-bold mb-2">Project Name</label>
          <input
            type="text"
            id="projectName"
            className="input-style"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectCodeClient" className="block text-rpr-white text-sm font-bold mb-2">Project Code Client</label>
          <input
            type="text"
            id="projectCodeClient"
            className="input-style"
            value={projectCodeClient}
            onChange={(e) => setProjectCodeClient(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectCodeTaskNum" className="block text-rpr-white text-sm font-bold mb-2">Project Code Task Number</label>
          <input
            type="number"
            id="projectCodeTaskNum"
            className="input-style"
            value={projectCodeTaskNum}
            onChange={(e) => setProjectCodeTaskNum(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="classification" className="block text-rpr-white text-sm font-bold mb-2">Classification</label>
          <select
            id="classification"
            className="input-style"
            value={classification}
            onChange={(e) => setClassification(e.target.value as Classification)}
          >
            {Object.values(Classification).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="humanOperator" className="block text-rpr-white text-sm font-bold mb-2">Human Operator</label>
          <input
            type="text"
            id="humanOperator"
            className="input-style"
            value={humanOperator}
            onChange={(e) => setHumanOperator(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phase" className="block text-rpr-white text-sm font-bold mb-2">Phase</label>
          <select
            id="phase"
            className="input-style"
            value={phase}
            onChange={(e) => setPhase(e.target.value as Phase)}
          >
            {Object.values(Phase).map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="objective" className="block text-rpr-white text-sm font-bold mb-2">Objective</label>
          <textarea
            id="objective"
            rows={3}
            className="input-style"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="md:col-span-2 text-center">
          <Button type="submit" className="w-full sm:w-auto">
            Initialize Session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SessionInitForm;
