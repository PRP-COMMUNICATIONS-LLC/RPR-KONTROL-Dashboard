
import { useState, useEffect } from 'react';
import { SessionSchema } from '../types';
import { MOCK_PAST_SESSIONS } from '../constants';

/**
 * A mock hook to simulate fetching RPR-KONTROL session data from a Firestore-like archive.
 * In a real application, this would interact with Firebase Firestore's `onSnapshot` listener.
 *
 * @param projectCodeFilter Optional filter to simulate `where('project_code', '==', selectedProject)`
 * @returns An object containing `sessions` (the fetched data), `loading` state, and `error` state.
 */
export const useRegistryArchive = (projectCodeFilter?: string) => {
  const [sessions, setSessions] = useState<SessionSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate an asynchronous fetch from Firestore
    const mockFetch = setTimeout(() => {
      try {
        let filteredSessions = MOCK_PAST_SESSIONS;

        if (projectCodeFilter && projectCodeFilter !== 'ALL') {
          filteredSessions = MOCK_PAST_SESSIONS.filter(session =>
            session.projectCode.includes(projectCodeFilter.toUpperCase())
          );
        }

        setSessions(filteredSessions);
        setLoading(false);
      } catch (err) {
        console.error("Mock Firestore fetch error:", err);
        setError("Failed to load sessions from registry.");
        setLoading(false);
      }
    }, 500); // Simulate network delay

    // Cleanup function (important for actual Firestore listeners)
    return () => clearTimeout(mockFetch);
  }, [projectCodeFilter]); // Re-run effect if filter changes

  return { sessions, loading, error };
};
