
import React from 'react';
import { DecisionLog, DecisionAuthority, Classification } from '../types';
import { formatDateTime } from '../utils/sessionUtils';
import Button from './Button';

interface DecisionAuditTrailProps {
  decisions: DecisionLog[];
  onViewSession: (sessionId: string) => void;
  minClassification: Classification | 'ANY';
  decisionKeyword: string;
}

const DecisionAuditTrail: React.FC<DecisionAuditTrailProps> = ({
  decisions,
  onViewSession,
}) => {
  return (
    <div className="card-style p-6 max-w-4xl mx-auto my-8 space-y-6">
      <h2 className="section-prefix text-3xl font-bold text-rpr-white text-center mb-6">Decision Audit Trail</h2>

      {decisions.length === 0 ? (
        <p className="text-gray-400 text-center">No decisions found matching your criteria.</p>
      ) : (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
          {decisions.map((decision, index) => (
            <div key={index} className="card-style p-4 shadow-sm hover:shadow-md transition duration-150 ease-in-out">
              <h3 className="section-prefix text-lg font-bold text-rpr-white mb-2">{decision.decision}</h3>
              <p className="text-sm text-gray-300 mb-2">Rationale: {decision.rationale}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  Authority: <span className="font-medium text-rpr-cyan">{decision.authority.replace('_', ' ').toUpperCase()}</span>
                </span>
                <span>
                  Date: {formatDateTime(decision.timestamp)}
                </span>
              </div>
              {decision.sourceSessionId && (
                <div className="mt-3 text-right">
                  <Button
                    onClick={() => onViewSession(decision.sourceSessionId)}
                    variant="secondary"
                    size="sm"
                  >
                    View Source Session: {decision.sourceSessionId}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecisionAuditTrail;
