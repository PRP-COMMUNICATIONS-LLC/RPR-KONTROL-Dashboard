import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SubstrateManifest {
  provider?: string;
  identity?: string;
  timestamp?: string;
}

/**
 * Initializes substrate identity by reading GOV-SUBSTRATES.json manifest
 * and logging deployment information to Firestore governance_sessions.
 * 
 * This function is non-fatal - if the manifest is missing or invalid,
 * the app will still load but will log a warning.
 */
export async function initSubstrateIdentity(): Promise<void> {
  try {
    const response = await fetch('/GOV-SUBSTRATES.json', { cache: 'no-store' });

    if (!response.ok) {
      console.warn('GOV-SUBSTRATES.json not found or not accessible:', response.status);
      return;
    }

    const substrates: SubstrateManifest = await response.json();

    if (!substrates?.provider || !substrates?.identity) {
      console.warn('GOV-SUBSTRATES.json missing required fields:', substrates);
      return;
    }

    console.log('🔐 Substrate Identity:', {
      provider: substrates.provider,
      identity: substrates.identity,
      timestamp: substrates.timestamp,
    });

    const sessionsRef = collection(db, 'governance_sessions');
    await addDoc(sessionsRef, {
      event_type: 'SUBSTRATE_DEPLOY_V2',
      provider: substrates.provider,
      identity: substrates.identity,
      manifest_timestamp: substrates.timestamp ?? null,
      app_loaded_at: serverTimestamp(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      context: 'RPR-KONTROL-Dashboard',
    });

    console.log('✅ Substrate identity logged to governance_sessions');
  } catch (error) {
    console.error('❌ Substrate initialization failed:', error);
  }
}
