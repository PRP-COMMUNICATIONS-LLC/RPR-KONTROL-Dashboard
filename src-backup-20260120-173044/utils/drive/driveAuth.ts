/// <reference types="vite/client" />

/**
 * RPR-KONTROL Drive Auth Substrate
 * Role: Manages OAuth2 handshake for the Sovereign Vault.
 * Classification: TS-Λ3
 * Protocol: GIS-BRIDGE-v1
 * Status: CLEAN (Purged of merge conflict markers)
 */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

declare global {
  interface Window {
    google: any;
  }
}

/**
 * Identity Validation: Ensures OAuth Client ID matches Governance mode
 * Governance suffix: ...ssk3c
 * Clinical suffix: ...rnoem
 */
const validateClientId = (clientId: string): { valid: boolean; mode: 'governance' | 'clinical' | 'unknown' | 'missing'; message: string } => {
  if (!clientId || clientId.trim() === '') {
    return {
      valid: false,
      mode: 'missing',
      message: '⚠️ SENTINEL: VITE_GOOGLE_CLIENT_ID is missing or empty'
    };
  }

  // Validate Google OAuth Client ID format
  if (!clientId.includes('.apps.googleusercontent.com')) {
    return {
      valid: false,
      mode: 'unknown',
      message: '⚠️ SENTINEL: Client ID format invalid (missing .apps.googleusercontent.com)'
    };
  }

  // Check for Governance suffix
  if (clientId.includes('ssk3c')) {
    return {
      valid: true,
      mode: 'governance',
      message: '✅ IDENTITY: GOVERNANCE (KONTROL) - Client ID validated'
    };
  }

  // Check for Clinical suffix
  if (clientId.includes('rnoem')) {
    return {
      valid: false,
      mode: 'clinical',
      message: '⚠️ SENTINEL: IDENTITY DRIFT - Clinical Client ID detected. Expected Governance (...ssk3c)'
    };
  }

  // Unknown suffix
  return {
    valid: false,
    mode: 'unknown',
    message: '⚠️ SENTINEL: Client ID suffix unrecognized. Expected ...ssk3c (Governance) or ...rnoem (Clinical)'
  };
};

export const initializeDriveAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') return resolve();
    
    // Runtime identity validation
    const validation = validateClientId(CLIENT_ID);
    if (!validation.valid) {
      console.warn(validation.message);
      if (validation.mode === 'clinical' || validation.mode === 'unknown') {
        console.error('🚨 SENTINEL PROTOCOL: Identity drift detected. OAuth handshake may fail.');
      }
    } else {
      console.log(validation.message);
    }
    
    if (document.getElementById('gsi-client')) return resolve();

    const script = document.createElement('script');
    script.id = 'gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('GIS_SUBSTRATE_LOAD_FAILED'));
    document.body.appendChild(script);
  });
};

export const requestSovereignAccessToken = (callback: (token: string) => void) => {
  if (typeof window === 'undefined' || !window.google) {
    console.error("⚠️ SENTINEL: GIS substrate not initialized.");
    return;
  }

  // Final validation before OAuth request
  const validation = validateClientId(CLIENT_ID);
  if (!validation.valid && validation.mode !== 'missing') {
    console.error(`🚨 SENTINEL: OAuth request blocked - ${validation.message}`);
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response: any) => {
      if (response.access_token) {
        callback(response.access_token);
      } else if (response.error) {
        console.error(`🚨 SENTINEL: OAuth error - ${response.error}`);
        if (response.error === 'access_denied' || response.error.includes('origin')) {
          console.error('⚠️ Possible identity drift: Verify Client ID matches OAuth redirect URI origin');
        }
      }
    },
  });

  client.requestAccessToken();
};

// Export validation function for external diagnostics
export { validateClientId };