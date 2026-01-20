#!/bin/bash
# --- RPR-KONTROL FIREBASE AUTH AUDIT [v1.2.1] ---
# Objective: Enforce site-target and outDir mapping.

echo "🔥 RPR-KONTROL: Auditing Firebase Auth Substrate..."

# 1. Target & Site Mapping
echo -n "[1/2] Hosting Target: "
if grep -q "\"target\": \"kontrol\"" firebase.json && grep -q "myaudit-kontrol-dashboard" .firebaserc; then
    echo "✅ PASS (kontrol -> myaudit-kontrol-dashboard)"
else
    echo "❌ FAIL (Hosting target mismatch or site-ID drift)"
    exit 1
fi

# 2. Build Path Alignment
echo -n "[2/2] Build OutDir: "
if grep -q "\"public\": \"dist-kontrol\"" firebase.json; then
    echo "✅ PASS (dist-kontrol path locked)"
else
    echo "❌ FAIL (firebase.json must point to dist-kontrol)"
    exit 1
fi

echo "🏁 FIREBASE AUTH AUDIT COMPLETE."