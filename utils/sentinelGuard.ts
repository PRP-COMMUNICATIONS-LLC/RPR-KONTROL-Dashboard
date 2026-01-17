
/**
 * sentinelGuard: Enforces RPR-KONTROL's Veto Logic (The Rook).
 * Scans agent output for prohibited terms that represent "guaranteed" claims
 * or actions outside the agent's authority (e.g., filing documents).
 *
 * @param text The agent's generated content.
 * @returns `true` if the content contains prohibited terms, `false` otherwise.
 */
export const validateAgentOutput = (text: string): boolean => {
  const prohibitedTerms = [
    'guarantee',
    'guarantees',
    'guaranteed',
    'file documents',
    'filed documents',
    'filing documents',
    'tax-free',
    'tax savings', // Broader term, can be contextually adjusted
    'will save you',
    'certainty',
    'undeniable',
    'absolute',
  ];

  const lowerCaseText = text.toLowerCase();

  for (const term of prohibitedTerms) {
    if (lowerCaseText.includes(term)) {
      return true;
    }
  }

  return false;
};
