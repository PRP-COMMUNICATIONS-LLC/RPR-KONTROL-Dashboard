
import React, { useState, useCallback, ChangeEvent, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SessionInitForm from './components/SessionInitForm';
import SessionOverview from './components/SessionOverview';
import ConversationHistory from './components/ConversationHistory';
import AgentPerformanceDashboard from './components/AgentPerformanceDashboard';
import PerformanceReportView from './components/PerformanceReportView';
import SearchResults from './components/SearchResults';
import DecisionAuditTrail from './components/DecisionAuditTrail';
import ArtifactExplorer from './components/ArtifactExplorer';
import Button from './components/Button';
import { SessionSchema, PerformanceReportData, Classification, AgentType, ProjectScope, ProjectClassificationFilter, Artifact, DecisionLog } from './types';
import { generatePerformanceReport, generateAuditDefenseReport } from './services/geminiService';
import {
  MOCK_ARTIFACTS,
  MOCK_DECISIONS_LOG,
  AGENTS_TRACKED,
  INITIAL_DUAL_STATE,
} from './constants';
import { useRegistryArchive } from './hooks/useRegistryArchive';
import { validateAgentOutput } from './utils/sentinelGuard';
import { initSubstrateIdentity } from './src/utils/substrateInit';

type ViewMode = 'active_session' | 'project_overview';

const App: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<SessionSchema | null>(null);
  const [reportData, setReportData] = useState<PerformanceReportData | null>(null);
  const [auditReportMarkdown, setAuditReportMarkdown] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SessionSchema[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('active_session');

  const [selectedProjectScope, setSelectedProjectScope] = useState<ProjectScope>(ProjectScope.ALL);
  const [minClassificationFilter, setMinClassificationFilter] = useState<ProjectClassificationFilter>('ANY');
  const [decisionKeyword, setDecisionKeyword] = useState<string>('');

  const { sessions: archivedSessions, loading: registryLoading, error: registryError } = useRegistryArchive(selectedProjectScope);

  useEffect(() => {
    initSubstrateIdentity();
  }, []);

  const handleInitializeSession = useCallback((session: SessionSchema) => {
    const initialGeminiContent = 'RPR-KONTROL Document Controller initialized.\n\nSession ID: ' + session.sessionId + '\nProject Code: ' + session.projectCode + '\nClassification: ' + session.classification + '\nAgents tracked: ' + AGENTS_TRACKED.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ') + '\nMemory: Active\nPerformance tracking: Enabled\nFlutter sync: Ready\n\nAwaiting project context and first directive.';
    const isVetoed = validateAgentOutput(initialGeminiContent);

    if (isVetoed) {
      console.warn(`// SENTINEL ALERT: Veto triggered for initial Gemini response in session ${session.sessionId}. Prohibited content detected.`);
    }

    const initializedSession: SessionSchema = {
      ...session,
      artifactsProduced: MOCK_ARTIFACTS,
      decisionsLog: MOCK_DECISIONS_LOG.map(d => ({ ...d, sourceSessionId: session.sessionId })),
      performanceMetrics: {
        taskCompletion: 0.93,
        governanceAdherence: 0.98,
        responseAccuracy: 0.90,
        crossAgentCoordination: 0.95,
        founderInterventionRate: 0.05,
      },
      conversation: [
        ...session.conversation,
        {
          turn: 2,
          agent: AgentType.GEMINI,
          content: initialGeminiContent,
          artifacts: [],
          timestamp: new Date().toISOString(),
          vetoed: isVetoed,
        }
      ],
      dual_state: INITIAL_DUAL_STATE,
    };
    setCurrentSession(initializedSession);
    setReportData(null);
    setAuditReportMarkdown(null);
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
    setViewMode('active_session');
  }, []);

  const handleGenerateReport = useCallback(async () => {
    if (!currentSession) return;
    setIsGeneratingReport(true);
    try {
      const report = await generatePerformanceReport(
        currentSession.sessionId,
        currentSession.context.projectName,
        currentSession.classification,
      );
      setReportData(report);
    } catch (error) {
      console.error("Failed to generate performance report:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  }, [currentSession]);

  const handleGenerateAuditReport = useCallback(async (session: SessionSchema) => {
    setIsGeneratingReport(true);
    try {
      const markdown = await generateAuditDefenseReport(session);
      setAuditReportMarkdown(markdown);
    } catch (error) {
      console.error("Failed to generate audit defense report:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  }, []);

  const handleLockSessionBaseline = useCallback((sessionId: string) => {
    setCurrentSession(prevSession => {
      if (prevSession && prevSession.sessionId === sessionId) {
        return {
          ...prevSession,
          dual_state: {
            ...prevSession.dual_state,
            validation_posture: 'LOCKED',
            last_audit_checkpoint: new Date().toISOString(),
          },
        };
      }
      return prevSession;
    });
  }, []);

  const closeReportView = useCallback(() => {
    setReportData(null);
    setAuditReportMarkdown(null);
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const filteredResults = archivedSessions.filter(session => {
      const projectNameMatch = session.context.projectName.toLowerCase().includes(lowerCaseTerm);
      const sessionIdMatch = session.sessionId.toLowerCase().includes(lowerCaseTerm);
      const conversationMatch = session.conversation.some(turn =>
        turn.content.toLowerCase().includes(lowerCaseTerm)
      );
      return projectNameMatch || sessionIdMatch || conversationMatch;
    });
    setSearchResults(filteredResults);
    setShowSearchResults(true);
  }, [archivedSessions]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  }, []);

  const onLoadPastSession = useCallback((session: SessionSchema) => {
    setCurrentSession(session);
    setReportData(null);
    setAuditReportMarkdown(null);
    clearSearch();
    setViewMode('active_session');
  }, [clearSearch]);

  const allSessions = useMemo(() => {
    const current = currentSession ? [{ ...currentSession, decisionsLog: MOCK_DECISIONS_LOG.map(d => ({...d, sourceSessionId: currentSession.sessionId})) }] : [];
    return [...archivedSessions, ...current];
  }, [currentSession, archivedSessions]);

  const filteredDecisions = useMemo(() => {
    let decisions: DecisionLog[] = [];
    allSessions.forEach(session => {
      const matchesProjectScope = selectedProjectScope === ProjectScope.ALL || (selectedProjectScope === ProjectScope.MYAUDIT && session.projectCode.includes('MYAUDIT')) || (selectedProjectScope === ProjectScope.RPR_INTERNAL && session.projectCode.includes('RPR-'));
      if (!matchesProjectScope) return;
      const classificationLevels = { [Classification.PUBLIC]: 0, [Classification.INTERNAL]: 1, [Classification.TS_LAMBDA_2]: 2, [Classification.TS_LAMBDA_3]: 3 };
      const filterLevel = minClassificationFilter === 'ANY' ? -1 : classificationLevels[minClassificationFilter as Classification];
      const sessionLevel = classificationLevels[session.classification];
      if (filterLevel !== -1 && sessionLevel < filterLevel) return;
      session.decisionsLog.forEach(decision => {
        if (decisionKeyword.trim() === '' || decision.decision.toLowerCase().includes(decisionKeyword.toLowerCase()) || decision.rationale.toLowerCase().includes(decisionKeyword.toLowerCase())) {
          decisions.push({ ...decision, sourceSessionId: session.sessionId });
        }
      });
    });
    return decisions;
  }, [allSessions, selectedProjectScope, minClassificationFilter, decisionKeyword]);

  const filteredArtifacts = useMemo(() => {
    let artifacts: Artifact[] = [];
    allSessions.forEach(session => {
      const matchesProjectScope = selectedProjectScope === ProjectScope.ALL || (selectedProjectScope === ProjectScope.MYAUDIT && session.projectCode.includes('MYAUDIT')) || (selectedProjectScope === ProjectScope.RPR_INTERNAL && session.projectCode.includes('RPR-'));
      if (!matchesProjectScope) return;
      const classificationLevels = { [Classification.PUBLIC]: 0, [Classification.INTERNAL]: 1, [Classification.TS_LAMBDA_2]: 2, [Classification.TS_LAMBDA_3]: 3 };
      const filterLevel = minClassificationFilter === 'ANY' ? -1 : classificationLevels[minClassificationFilter as Classification];
      const sessionLevel = classificationLevels[session.classification];
      if (filterLevel !== -1 && sessionLevel < filterLevel) return;
      artifacts.push(...session.artifactsProduced);
    });
    return artifacts;
  }, [allSessions, selectedProjectScope, minClassificationFilter]);

  return (
    <div className="min-h-screen bg-rpr-charcoal text-rpr-white">
      <Header classification={currentSession?.classification || Classification.TS_LAMBDA_3} />
      <main className="container mx-auto p-4">
        <div className="flex justify-center my-8 gap-4">
          <Button onClick={() => setViewMode('active_session')} variant={viewMode === 'active_session' ? 'primary' : 'secondary'}>Active Session</Button>
          <Button onClick={() => setViewMode('project_overview')} variant={viewMode === 'project_overview' ? 'primary' : 'secondary'}>Project Overview (Registry)</Button>
        </div>

        {viewMode === 'active_session' && (
          <>
            <div className="card-style p-4 max-w-4xl mx-auto my-8 flex items-center space-x-2">
              <input type="text" placeholder="Search sessions by name, ID, or keywords..." className="input-style flex-grow" value={searchTerm} onChange={handleSearchChange} />
              {searchTerm && <Button onClick={clearSearch} variant="secondary" size="sm">Clear</Button>}
            </div>
            {currentSession ? (
              <div className="space-y-8">
                <h2 className="section-prefix text-4xl font-extrabold text-rpr-white text-center mt-8 mb-6">Active Session</h2>
                <SessionOverview session={currentSession} onLockBaseline={handleLockSessionBaseline} onGenerateAuditReport={handleGenerateAuditReport} />
                <ConversationHistory conversation={currentSession.conversation} />
                <AgentPerformanceDashboard />
                <div className="flex justify-center p-4 sticky bottom-0 bg-rpr-charcoal border-t border-rpr-slate -mx-4">
                  <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="w-full sm:w-auto text-lg" variant="primary">
                    {isGeneratingReport ? 'Generating...' : 'Generate Performance Report'}
                  </Button>
                </div>
              </div>
            ) : (
              showSearchResults ? <SearchResults results={searchResults} onLoadSession={onLoadPastSession} /> : <SessionInitForm onInitialize={handleInitializeSession} />
            )}
          </>
        )}

        {viewMode === 'project_overview' && (
          <>
            <h2 className="section-prefix text-4xl font-extrabold text-rpr-white text-center mt-8 mb-6">Project Overview (Registry)</h2>
            <div className="card-style p-4 max-w-4xl mx-auto my-8 space-y-4">
              <h3 className="section-prefix text-xl font-bold mb-4 text-rpr-white">Registry Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-rpr-white text-sm font-bold mb-2">Project Scope</label>
                  <select className="input-style" value={selectedProjectScope} onChange={(e) => setSelectedProjectScope(e.target.value as ProjectScope)}>
                    {Object.values(ProjectScope).map(scope => <option key={scope} value={scope}>{scope.replace('_', ' ').toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-rpr-white text-sm font-bold mb-2">Min. Classification</label>
                  <select className="input-style" value={minClassificationFilter} onChange={(e) => setMinClassificationFilter(e.target.value as ProjectClassificationFilter)}>
                    <option value="ANY">ANY</option>
                    {Object.values(Classification).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-rpr-white text-sm font-bold mb-2">Decision Keyword</label>
                  <input type="text" className="input-style" placeholder="Search decisions..." value={decisionKeyword} onChange={(e) => setDecisionKeyword(e.target.value)} />
                </div>
              </div>
            </div>
            <DecisionAuditTrail decisions={filteredDecisions} onViewSession={(id) => { const s = archivedSessions.find(x => x.sessionId === id); if(s) onLoadPastSession(s); }} minClassification={minClassificationFilter} decisionKeyword={decisionKeyword} />
            <ArtifactExplorer artifacts={filteredArtifacts} projectScope={selectedProjectScope} currentSession={currentSession} />
          </>
        )}
      </main>

      {(reportData || auditReportMarkdown) && (
        <PerformanceReportView 
          reportContent={auditReportMarkdown || reportData?.markdownReport || ''} 
          onClose={closeReportView} 
        />
      )}
    </div>
  );
};

export default App;
