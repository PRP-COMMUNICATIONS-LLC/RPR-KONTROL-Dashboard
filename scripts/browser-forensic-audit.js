(function rprForensicAudit() {
    const EXPECTED_LABELS = ["THE FIRM", "LIVE VIEW", "THE VAULT", "THE SESSIONS", "ICAM"];
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // 1. Layout & Viewport
    const overflowXLocked = window.getComputedStyle(html).overflowX === 'hidden';
    const mainPadding = main ? window.getComputedStyle(main).paddingBottom : '0px';
    const clearanceOK = parseInt(mainPadding) >= 128; // 8rem = 128px
    
    // 2. Navigation & Pillar Logic
    let navFixed = false, labelsCorrect = false, foundLabels = [];
    if (nav) {
        const navStyle = window.getComputedStyle(nav);
        navFixed = navStyle.position === 'fixed' && navStyle.bottom === '0px';
        
        const buttons = Array.from(nav.querySelectorAll('button'));
        foundLabels = buttons.map(b => b.innerText.trim().toUpperCase()).filter(t => t !== "");
        labelsCorrect = JSON.stringify(foundLabels.sort()) === JSON.stringify([...EXPECTED_LABELS].sort());
    }

    // 3. Header Position
    const headerFixed = header ? window.getComputedStyle(header).position === 'fixed' && 
                                  window.getComputedStyle(header).top === '0px' : false;

    // 4. Typography & Smoothing
    const bodyStyle = window.getComputedStyle(body);
    const typographyAligned = bodyStyle.fontFamily.includes('Inter') || bodyStyle.fontFamily.includes('system-ui');
    const isAntialiased = body.classList.contains('antialiased') || 
                          bodyStyle.webkitFontSmoothing === 'antialiased' || 
                          bodyStyle.mozOsxFontSmoothing === 'grayscale';

    const auditData = {
        overflowXLocked,
        navFixed,
        headerFixed,
        clearanceOK,
        clearanceValue: mainPadding,
        labelsCorrect,
        foundLabels: foundLabels.length > 0 ? foundLabels.join(', ') : 'NONE',
        typographyAligned,
        isAntialiased
    };

    console.log("%c--- RPR-KONTROL BROWSER DIAGNOSTIC ---", "font-weight: bold; font-size: 12px; color: #00D9FF;");
    console.table(auditData);

    const failures = Object.keys(auditData).filter(key => {
        if (key === 'foundLabels' || key === 'clearanceValue') return false;
        return !auditData[key];
    });

    if (failures.length === 0) {
        console.log("%c✅ SUBSTRATE ALIGNED", "background: #7C3AED; color: white; font-weight: bold; padding: 4px 10px; border-radius: 4px;");
    } else {
        console.log("%c❌ SUBSTRATE DRIFT DETECTED", "background: #EF4444; color: white; font-weight: bold; padding: 4px 10px; border-radius: 4px;");
        console.log("Failed dimensions:", failures.join(", "));
        if (foundLabels.length > 0) console.log("Detected Labels:", foundLabels);
    }

    return auditData;
})();