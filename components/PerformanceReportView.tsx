
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Button from './Button';

interface PerformanceReportViewProps {
  reportContent: string;
  onClose: () => void;
}

const PerformanceReportView: React.FC<PerformanceReportViewProps> = ({ reportContent, onClose }) => {
  return (
    <div className="fixed inset-0 bg-rpr-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-rpr-charcoal rounded-lg shadow-xl max-w-4xl w-full h-full md:max-h-[90vh] overflow-hidden flex flex-col border border-rpr-slate">
        <div className="flex justify-between items-center p-4 border-b border-rpr-slate bg-rpr-slate">
          <h2 className="text-2xl font-bold text-rpr-white">RPR-KONTROL Performance Report</h2>
          <Button onClick={onClose} variant="secondary" size="sm">
            Close
          </Button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
          <ReactMarkdown className="prose prose-lg max-w-none text-rpr-white">
            {reportContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReportView;
