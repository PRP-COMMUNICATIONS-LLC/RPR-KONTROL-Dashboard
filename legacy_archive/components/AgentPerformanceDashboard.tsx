import React from 'react';
// Fix: Removed non-existent AgentMetric export from types
import { AgentType } from '../types';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { MOCK_AGENT_PERFORMANCE } from '../constants';

interface AgentPerformanceDashboardProps {
  // Can be used to pass dynamic data if needed, currently using mock data
}

const AgentPerformanceDashboard: React.FC<AgentPerformanceDashboardProps> = () => {
  const dataForRadar = Object.values(AgentType).filter(agent => agent !== AgentType.HUMAN)
    .map(agentType => {
      const metric = MOCK_AGENT_PERFORMANCE[agentType];
      if (metric) {
        return {
          agent: agentType.charAt(0).toUpperCase() + agentType.slice(1),
          'Task Completion': metric.taskCompletion * 100,
          'Governance Adherence': metric.governanceAdherence * 100,
          'Response Accuracy': metric.responseAccuracy * 100,
        };
      }
      return null;
    }).filter(Boolean);

  const dataForBar = Object.values(AgentType).filter(agent => agent !== AgentType.HUMAN)
    .map(agentType => {
      const metric = MOCK_AGENT_PERFORMANCE[agentType];
      if (metric) {
        return {
          agent: agentType.charAt(0).toUpperCase() + agentType.slice(1),
          'Intervention Count': metric.interventionCount,
        };
      }
      return null;
    }).filter(Boolean);

  return (
    <div className="card-style p-6 max-w-4xl mx-auto my-8 space-y-8">
      <h2 className="section-prefix text-3xl font-bold text-rpr-white text-center mb-6">Agent Performance Dashboard</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Radar Chart for key performance metrics */}
        <div className="w-full lg:w-1/2 h-80 bg-rpr-slate rounded-lg p-4 shadow-inner">
          <h3 className="section-prefix text-xl font-semibold text-rpr-white mb-4 text-center">Core Metrics (%)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={dataForRadar}>
              <PolarGrid stroke="var(--rpr-charcoal)" />
              <PolarAngleAxis dataKey="agent" stroke="var(--rpr-white)" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="var(--rpr-white)" />
              <Radar name="Task Completion" dataKey="Task Completion" stroke="var(--rpr-cyan)" fill="var(--rpr-cyan)" fillOpacity={0.6} />
              <Radar name="Governance Adherence" dataKey="Governance Adherence" stroke="#f05b4a" fill="#f05b4a" fillOpacity={0.6} /> {/* Using a warm red for adherence warnings */}
              <Radar name="Response Accuracy" dataKey="Response Accuracy" stroke="var(--rpr-teal)" fill="var(--rpr-teal)" fillOpacity={0.6} />
              <Legend wrapperStyle={{ color: 'var(--rpr-white)' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperClassName="text-sm bg-rpr-charcoal text-rpr-white p-2 rounded border border-rpr-slate" />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Founder Intervention Count */}
        <div className="w-full lg:w-1/2 h-80 bg-rpr-slate rounded-lg p-4 shadow-inner">
          <h3 className="section-prefix text-xl font-semibold text-rpr-white mb-4 text-center">Founder Intervention Count</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataForBar}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--rpr-charcoal)" />
              <XAxis dataKey="agent" stroke="var(--rpr-white)" />
              <YAxis allowDecimals={false} stroke="var(--rpr-white)" />
              <Tooltip cursor={{ fill: 'transparent' }} wrapperClassName="text-sm bg-rpr-charcoal text-rpr-white p-2 rounded border border-rpr-slate" />
              <Legend wrapperStyle={{ color: 'var(--rpr-white)' }} />
              <Bar dataKey="Intervention Count" fill="var(--rpr-cyan)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          Metrics are normalized to 0-100% for visualization. Intervention Count reflects instances where human guidance was required.
        </p>
      </div>
    </div>
  );
};

export default AgentPerformanceDashboard;