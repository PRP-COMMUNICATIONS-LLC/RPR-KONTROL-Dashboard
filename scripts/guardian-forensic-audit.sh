#!/bin/bash
# --- RPR-KONTROL SUBSTRATE AUDIT [OVERWATCH v1.1] ---
# Authority: SENTINEL PROTOCOL v1.1.0 / RPR-K-TECH-061

EXIT_CODE=0

echo "--- RPR-KONTROL SUBSTRATE AUDIT [OVERWATCH v1.1] ---"

# 1. VITE CONFIGURATION AUDIT
echo -n "[1/6] Vite Config: "
VITE_FILE="vite.config.ts"
if [[ -f "$VITE_FILE" ]]; then
    PORT_CHECK=$(grep "port: 5173" "$VITE_FILE")
    STRICT_CHECK=$(grep "strictPort: true" "$VITE_FILE")
    OUTDIR_CHECK=$(grep "outDir: 'dist-kontrol'" "$VITE_FILE")
    ALIAS_CHECK=$(grep -E "@': path\.resolve\(__dirname, './src'\)" "$VITE_FILE")

    if [[ -n "$PORT_CHECK" && -n "$STRICT_CHECK" && -n "$OUTDIR_CHECK" && -n "$ALIAS_CHECK" ]]; then
        echo "✅ PASS (5173 / strictPort / dist-kontrol / @→./src)"
    else
        echo "❌ FAIL (Config mismatch detected: port/strictPort/outDir/alias)"
        EXIT_CODE=1
    fi
else
    echo "❌ FAIL (vite.config.ts not found)"
    EXIT_CODE=1
fi

# 2. LEGACY SEQUESTRATION
echo -n "[2/6] Legacy Sequestration: "
ACTIVE_INDEX_CSS=$(find src -name "index.css" -not -path "*legacy_archive*" 2>/dev/null)
THEME_CSS="src/theme.css"
if [[ -z "$ACTIVE_INDEX_CSS" && -f "$THEME_CSS" ]]; then
    echo "✅ PASS (theme.css active / index.css sequestered)"
else
    echo "❌ FAIL (index.css still active in src/ or theme.css missing)"
    EXIT_CODE=1
fi

# 3. BRAND INFRASTRUCTURE
echo -n "[3/6] Brand Infrastructure: "
BRAND_FILES=("src/brand/RprIcon.tsx" "src/brand/RprKontrolLogo.tsx" "src/brand/tokens.ts")
MISSING_BRAND=0
for f in "${BRAND_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    MISSING_BRAND=1
  fi
done

if [[ $MISSING_BRAND -eq 0 ]]; then
    # Check for duplicates elsewhere
    DUPLICATES=$(find src -not -path "src/brand/*" \( -name "RprIcon.tsx" -o -name "RprKontrolLogo.tsx" -o -name "tokens.ts" \) 2>/dev/null)
    if [[ -z "$DUPLICATES" ]]; then
        echo "✅ PASS (Canonical brand assets present and isolated to src/brand)"
    else
        echo "⚠️ WARN (Brand files duplicated outside src/brand)"
    fi
else
    echo "❌ FAIL (Missing required brand components in src/brand)"
    EXIT_CODE=1
fi

# 4. HTML & LAYOUT HINTS
echo -n "[4/6] HTML/Layout Integrity: "
INLINE_STYLE=$(grep "<style>" index.html 2>/dev/null)
NAV_CLEARANCE=$(grep "pb-32" src/App.tsx 2>/dev/null)

if [[ -z "$INLINE_STYLE" && -n "$NAV_CLEARANCE" ]]; then
    echo "✅ PASS (No inline <style> in index.html / pb-32 clearance present)"
else
    if [[ -n "$INLINE_STYLE" ]]; then
        echo -n "❌ FAIL (Inline <style> tags present in index.html"
        [[ -z "$NAV_CLEARANCE" ]] && echo "; pb-32 missing in App.tsx)" || echo ")"
    else
        echo "❌ FAIL (pb-32 clearance missing in App.tsx)"
    fi
    EXIT_CODE=1
fi

# 5. IDENTITY MODE (.env.local) - Enhanced Diagnostics
echo "[5/6] Identity Mode:"
if [[ -f ".env.local" ]]; then
    CLIENT_ID_LINE=$(grep "VITE_GOOGLE_CLIENT_ID" ".env.local" 2>/dev/null | head -1)

    if [[ -n "$CLIENT_ID_LINE" ]]; then
        CLIENT_ID_VALUE=$(echo "$CLIENT_ID_LINE" | sed -E 's/^[^=]*= *["'\'']?([^"'\'']*)["'\'']?.*$/\1/' | tr -d ' ')

        if [[ "$CLIENT_ID_VALUE" == *"ssk3c"* ]]; then
            echo "  ✅ IDENTITY: GOVERNANCE (KONTROL)"
            echo "  📋 Client ID Suffix: ...ssk3c"
            if [[ ${#CLIENT_ID_VALUE} -gt 20 ]]; then
                MASKED="${CLIENT_ID_VALUE:0:10}...${CLIENT_ID_VALUE: -10}"
                echo "  🔐 Client ID: ${MASKED}"
            else
                echo "  🔐 Client ID: [REDACTED]"
            fi
        elif [[ "$CLIENT_ID_VALUE" == *"rnoem"* ]]; then
            echo "  ⚠️ IDENTITY: CLINICAL (MYΛUDIT) - MISMATCH FOR KONTROL"
            echo "  📋 Client ID Suffix: ...rnoem"
            echo "  ⚠️ ACTION REQUIRED: Update to Governance Client ID (...ssk3c)"
            EXIT_CODE=1
        else
            echo "  ❌ IDENTITY UNKNOWN OR MALFORMED"
            echo "  📋 Client ID Suffix: [NOT FOUND]"
            echo "  ⚠️ Expected: ...ssk3c (Governance) or ...rnoem (Clinical)"
            if [[ ${#CLIENT_ID_VALUE} -gt 0 ]]; then
                echo "  🔐 Client ID Length: ${#CLIENT_ID_VALUE} chars"
            fi
            EXIT_CODE=1
        fi

        if [[ "$CLIENT_ID_VALUE" != *".apps.googleusercontent.com"* ]]; then
            echo "  ⚠️ WARNING: Client ID format may be invalid (missing .apps.googleusercontent.com)"
        fi
    else
        echo "  ❌ VITE_GOOGLE_CLIENT_ID not found in .env.local"
        EXIT_CODE=1
    fi

    FIREBASE_PROJECT=$(grep "VITE_FIREBASE_PROJECT_ID" ".env.local" 2>/dev/null | head -1 | sed -E 's/^[^=]*= *["'\'']?([^"'\'']*)["'\'']?.*$/\1/' | tr -d ' ')
    if [[ -n "$FIREBASE_PROJECT" ]]; then
        echo "  🔥 Firebase Project: $FIREBASE_PROJECT"
    fi
else
    echo "  ⚠️ .env.local MISSING"
    echo "  ⚠️ ACTION REQUIRED: Create .env.local with VITE_GOOGLE_CLIENT_ID and VITE_FIREBASE_PROJECT_ID"
    EXIT_CODE=1
fi

# 6. FOR-FORENSICS: Rule Registry Validation
echo "[6/6] FOR-FORENSICS: Rule Registry"
RULE_REGISTRY_FILE="rule-registry-ya2026.json"

if [[ -f "$RULE_REGISTRY_FILE" ]]; then
    if grep -q "KONTROL-GOV-PROT" "$RULE_REGISTRY_FILE" 2>/dev/null; then
        echo "  ✅ Rule Registry Found: $RULE_REGISTRY_FILE"
        echo "  ✅ Governance Protocol Marker: KONTROL-GOV-PROT detected"
        
        # Check for specific rule if jq is available
        if command -v jq &> /dev/null; then
            RULE_COUNT=$(jq '.rules | length' "$RULE_REGISTRY_FILE" 2>/dev/null || echo "0")
            if [[ "$RULE_COUNT" -gt 0 ]]; then
                echo "  📋 Rules Registered: $RULE_COUNT"
            fi
        fi
    else
        echo "  ⚠️ Rule Registry Found: $RULE_REGISTRY_FILE"
        echo "  ⚠️ WARNING: Governance Protocol Marker (KONTROL-GOV-PROT) not found"
        echo "  ⚠️ Registry may be incomplete or from different substrate"
    fi
else
    echo "  ⚠️ Rule Registry Not Found: $RULE_REGISTRY_FILE"
    echo "  ⚠️ FOR-FORENSICS validation skipped (registry file missing)"
    # Don't fail the audit if rule registry is missing (optional component)
fi

echo "--- AUDIT COMPLETE ---"
exit $EXIT_CODE
