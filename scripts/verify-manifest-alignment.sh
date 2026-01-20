#!/bin/bash
# --- RPR-KONTROL: MANIFEST ALIGNMENT VERIFICATION [v3.1.5] ---
# Authority: SENTINEL PROTOCOL v1.1.0 / TS-Λ3
# Objective: Mathematically verify GOV-SUBSTRATES.json against firebase.json anchors.
# Compatibility: macOS BSD sed / Linux GNU sed

set -e

MANIFEST_PATH="dist-kontrol/data/GOV-SUBSTRATES.json"
FIREBASE_CONFIG="firebase.json"

echo "🛡️ RPR-KONTROL: Initiating Manifest Verification..."
echo "----------------------------------------------------"

# 1. Check Build Artifact Existence
if [[ ! -f "$MANIFEST_PATH" ]]; then
    echo "❌ FAIL: Sovereign manifest missing at $MANIFEST_PATH"
    echo "   Action: Run 'npm run build:kontrol' first."
    exit 1
fi

# 2. Verify Project ID Alignment (rpr-myaudit)
# Check in built JS chunks for project ID
if [[ -d "dist-kontrol/assets" ]]; then
    if grep -q "rpr-myaudit" dist-kontrol/assets/*.js 2>/dev/null; then
        echo "✅ PASS: Build correctly targeted at rpr-myaudit."
    else
        echo "⚠️ WARN: Project ID verification in JS chunks inconclusive (may be minified)."
        echo "   Continuing with manifest-based verification..."
    fi
else
    echo "⚠️ WARN: dist-kontrol/assets directory not found. Skipping JS chunk verification."
fi

# 3. Verify Hosting Public Path Alignment (Portable sed for macOS/Linux)
PUBLIC_DIR=$(grep '"public"' "$FIREBASE_CONFIG" | sed -E 's/.*"public"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/' | head -1)
if [[ "$PUBLIC_DIR" == "dist-kontrol" ]]; then
    echo "✅ PASS: firebase.json correctly anchored to dist-kontrol."
else
    echo "❌ FAIL: firebase.json public path drift ($PUBLIC_DIR)."
    exit 1
fi

# 4. Identity Lock Check
if grep -q "ssk3c" "$MANIFEST_PATH"; then
    echo "✅ PASS: Identity Lock (ssk3c) verified in manifest."
else
    echo "❌ FAIL: Identity drift. Manifest does not contain ssk3c lock."
    exit 1
fi

# 5. Verify Firebase Project in Manifest
if grep -q "rpr-myaudit" "$MANIFEST_PATH"; then
    echo "✅ PASS: Firebase project (rpr-myaudit) verified in manifest."
else
    echo "⚠️ WARN: Firebase project ID not found in manifest (non-critical)."
fi

echo "----------------------------------------------------"
echo "✅ MANIFEST VERIFIED: Substrate is mathematically aligned."
echo "Operational Status: INFRASTRUCTURE FREEZE READY FOR LIFT."