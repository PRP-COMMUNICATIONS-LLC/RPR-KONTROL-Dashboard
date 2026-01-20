#!/bin/bash
# --- RPR-KONTROL IDENTITY LOCK AUDIT [v1.4.1] ---
# Objective: Block Clinical (rnoem) identities from the Governance (ssk3c) plane.
set -e

ENV_FILE=".env.local"
GOV_SUFFIX="ssk3c"
CLINICAL_SUFFIX="rnoem"

echo "🛡️ RPR-KONTROL: Verifying Identity Lock Mode..."

if [[ -f "$ENV_FILE" ]]; then
    # Extract ID and remove quotes/spaces
    CLIENT_ID=$(grep "VITE_GOOGLE_CLIENT_ID" "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'" | tr -d ' ')
    
    if [[ "$CLIENT_ID" == *"$GOV_SUFFIX"* ]]; then
        echo "✅ PASS: Governance Mode Detected (Suffix: $GOV_SUFFIX)"
    elif [[ "$CLIENT_ID" == *"$CLINICAL_SUFFIX"* ]]; then
        echo "❌ CRITICAL: Clinical Identity Detected (Suffix: $CLINICAL_SUFFIX)"
        echo "   ERROR: Sovereignty Breach. This substrate is for Governance only."
        exit 1
    else
        echo "⚠️ WARN: Unknown Suffix. Ensure VITE_GOOGLE_CLIENT_ID matches ssk3c."
        exit 1
    fi
else
    echo "❌ FAIL: .env.local missing. Identity Lock cannot be verified."
    exit 1
fi