#!/bin/bash
# --- RPR-KONTROL CONTROL PLANE AUDIT [OVERWATCH v1.1] ---
# Authority: SENTINEL PROTOCOL v1.1.0 / RPR-K-TECH-061

EXIT_CODE=0

echo "--- RPR-KONTROL CONTROL PLANE AUDIT [OVERWATCH v1.1] ---"

PROJECT_ID="rpr-myaudit"
REGION="asia-southeast1"

# 1. Project Alignment
echo -n "[1/3] Project Identity: "
if command -v gcloud &> /dev/null; then
    CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null || echo "UNKNOWN")
    if [[ "$CURRENT_PROJECT" == "$PROJECT_ID" ]]; then
        echo "✅ PASS ($PROJECT_ID)"
    else
        echo "⚠️ WARN (Active: $CURRENT_PROJECT, Expected: $PROJECT_ID)"
        echo "  💡 Switch with: gcloud config set project $PROJECT_ID"
    fi
else
    echo "⚠️ SKIP (gcloud CLI not installed)"
fi

# 2. Residency Check
echo -n "[2/3] Data Residency ($REGION): "
if command -v gcloud &> /dev/null; then
    # Check Firestore region
    FIRESTORE_REGION=$(gcloud firestore databases list --project=$PROJECT_ID --format="value(locationId)" --filter="name:default" 2>/dev/null | head -1 || echo "UNKNOWN")
    if [[ "$FIRESTORE_REGION" == "$REGION" ]]; then
        echo "✅ PASS (Firestore locked to $REGION)"
    elif [[ "$FIRESTORE_REGION" != "UNKNOWN" ]]; then
        echo "⚠️ WARN (Firestore region: $FIRESTORE_REGION, Expected: $REGION)"
    else
        echo "⚠️ SKIP (Cannot verify Firestore region - check GCP Console)"
    fi
else
    echo "⚠️ SKIP (gcloud CLI not installed)"
fi

# 3. Billing & API Status
echo -n "[3/3] GCP API Status: "
if command -v gcloud &> /dev/null; then
    if gcloud services list --enabled --project=$PROJECT_ID 2>/dev/null | grep -q "firestore.googleapis.com"; then
        echo "✅ PASS (Firestore API Enabled)"
    else
        echo "⚠️ WARN (Firestore API status unknown)"
    fi
else
    echo "⚠️ SKIP (gcloud CLI not installed)"
fi

echo "--- CONTROL PLANE AUDIT COMPLETE ---"
echo "💡 NOTE: Full verification requires gcloud CLI and appropriate permissions"
exit $EXIT_CODE
