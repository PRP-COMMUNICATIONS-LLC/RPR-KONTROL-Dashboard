
import React from 'react';
import { SessionSchema, Classification } from '../types';
import { formatDateTime } from '../utils/sessionUtils';
import Button from './Button';

interface SearchResultsProps {
  results: SessionSchema[];
  onLoadSession: (session: SessionSchema) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onLoadSession }) => {
  return (
    <div className="card-style p-6 max-w-4xl mx-auto my-8 space-y-6">
      <h2 className="section-prefix text-3xl font-bold text-rpr-white text-center mb-6">Search Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-400 text-center">No sessions found matching your criteria.</p>
      ) : (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
          {results.map((session) => {
            const isCrownSecret = session.classification === Classification.TS_LAMBDA_3;
            return (
              <div key={session.sessionId} className="card-style p-4 shadow-sm hover:shadow-md transition duration-150 ease-in-out">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                  <p className="text-rpr-white"><strong>Session ID:</strong> <span className="break-words text-rpr-white">{session.sessionId}</span></p>
                  <p className="text-rpr-white"><strong>Project Code:</strong> <span className="break-words text-rpr-white">{session.projectCode}</span></p>
                  <p className="text-rpr-white"><strong>Project Name:</strong> <span className="text-rpr-white">{session.context.projectName}</span></p>
                  <p className="text-rpr-white">
                    <strong>Classification:</strong> 
                    <span 
                      className={`font-medium text-rpr-white ${isCrownSecret ? 'border border-rpr-cyan shadow-cyan-glow' : ''}`}
                      style={{ '--tw-shadow-color': isCrownSecret ? 'var(--rpr-cyan)' : 'transparent', boxShadow: isCrownSecret ? '0 0 10px var(--rpr-cyan)' : 'none' }}
                    >
                      {session.classification}
                    </span>
                  </p>
                  <p className="md:col-span-2 text-rpr-white"><strong>Started:</strong> <span className="text-rpr-white">{formatDateTime(session.timestamp)}</span></p>
                </div>
                <div className="text-right">
                  <Button onClick={() => onLoadSession(session)} variant="primary" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
