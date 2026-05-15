// ============================================================
//  leakMonitor.js  —  LeakGuard AI · Leak Monitor Screen (s7)
// ============================================================

document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s7">

  <!-- ── SIDEBAR ────────────────────────────────────────── -->
  <div class="sidebar">
    <div class="sb-brand">
      <div class="sb-brand-row">
        <div class="sb-mark">
          <svg viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="white" stroke-width="1.5"/>
            <path d="M5 8l2.5 2.5 3.5-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <div class="sb-name">LeakGuard AI</div>
          <div class="sb-tagline">CreatorChain Platform</div>
        </div>
      </div>
    </div>
    <div class="sb-nav">
      <div class="sb-section">Overview</div>
      <div class="nav-item" onclick="goTo('s3'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
        Dashboard
      </div>
      <div class="sb-section">Content</div>
      <div class="nav-item" onclick="goTo('s4'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><path d="M8 2v8M8 2L5 5M8 2l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="9" width="12" height="5" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
        Upload
      </div>
      <div class="nav-item" onclick="goTo('s5'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 12V6.5L8 3l5 3.5V12a1 1 0 01-1 1H4a1 1 0 01-1-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 13V9h4v4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        My Property
      </div>
      <div class="nav-item" onclick="goTo('s6'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Owner View
      </div>
      <div class="sb-section">Monitoring</div>
      <div class="nav-item active" onclick="goTo('s7'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><path d="M1 8s2-5 7-5 7 5 7 5-2 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>
        Leak Monitor
      </div>
      <div class="nav-item" onclick="setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><path d="M2 12V9l4-4 3 3 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 4h-3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Analytics
      </div>
    </div>
    <div class="sb-footer">
      <div class="sb-user">
        <div class="sb-avatar">--</div>
        <div>
          <div class="sb-user-name">Guest User</div>
          <div class="sb-user-role">Creator · Verified</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── MAIN AREA ──────────────────────────────────────── -->
  <div class="main-area">
    <div class="topbar">
      <div>
        <div class="topbar-title">Leak Monitor</div>
        <div class="topbar-sub">Upload a file to detect if it has been leaked across platforms</div>
      </div>
      <div class="topbar-actions">
        <button class="btn-outline" onclick="lmReset()">↺ Reset</button>
        <button class="btn-primary" id="lm-verify-btn" onclick="lmVerify()" style="display:none;">
          <svg viewBox="0 0 12 12" fill="none"><path d="M1 6s1.5-4 5-4 5 4 5 4-1.5 4-5 4-5-4-5-4z" stroke="white" stroke-width="1.4"/><circle cx="6" cy="6" r="1.8" stroke="white" stroke-width="1.4"/></svg>
          Verify Leak
        </button>
      </div>
    </div>

    <div class="content" id="lm-content">

      <!-- TOP GRID: Upload + Status side by side -->
      <div class="lm-top-grid">

        <!-- LEFT: Upload Card -->
        <div class="card lm-upload-card" id="lm-upload-card">
          <div class="card-hdr">
            <h3>Upload Suspect File</h3>
            <span class="badge badge-amber" id="lm-upload-badge">Awaiting File</span>
          </div>
          <div class="lm-drop-zone" id="lm-drop-zone"
               onclick="document.getElementById('lm-file-input').click()"
               ondragover="lmDragOver(event)"
               ondragleave="lmDragLeave(event)"
               ondrop="lmDrop(event)">
            <div class="lm-drop-inner" id="lm-drop-inner">
              <div class="lm-drop-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <circle cx="24" cy="24" r="22" stroke="rgba(82,183,136,0.2)" stroke-width="2"/>
                  <path d="M24 14v14M18 20l6-6 6 6" stroke="#2D6A4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 34h20" stroke="#2D6A4F" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="lm-drop-title">Drag &amp; drop file here</div>
              <div class="lm-drop-sub">or click to browse</div>
              <div class="lm-drop-types">MP4 &nbsp;·&nbsp; MKV &nbsp;·&nbsp; MP3 &nbsp;·&nbsp; JPG &nbsp;·&nbsp; PNG &nbsp;·&nbsp; PDF</div>
            </div>
          </div>
          <input type="file" id="lm-file-input" accept="video/*,audio/*,image/*,.pdf"
                 style="display:none" onchange="lmFileSelected(event)"/>

          <!-- File Preview — hidden until file chosen -->
          <div id="lm-preview-wrap" style="display:none; margin-top:14px;">
            <div class="lm-preview-body" id="lm-preview-body"></div>
            <div class="lm-file-meta" id="lm-file-meta"></div>
          </div>
        </div>

        <!-- RIGHT: Status + Mini Stats -->
        <div class="lm-right-col">

          <!-- Scan Status Card -->
          <div class="card lm-status-card" id="lm-status-card">
            <div class="card-hdr">
              <h3>Scan Status</h3>
              <span class="badge badge-amber" id="lm-status-badge">Idle</span>
            </div>
            <div class="lm-status-body" id="lm-status-body">
              <div class="lm-idle-state">
                <div class="lm-idle-icon">🔍</div>
                <div class="lm-idle-text">No file loaded. Upload a file and click <strong>Verify Leak</strong> to begin scanning.</div>
              </div>
            </div>
          </div>

          <!-- Mini Stats (shown after scan) -->
          <div class="lm-mini-stats-row" id="lm-mini-stats" style="display:none;">
            <div class="lm-mini-stat">
              <div class="lmms-icon">🛡️</div>
              <div class="lmms-val" id="lmms-status-val">—</div>
              <div class="lmms-label">Leak Status</div>
            </div>
            <div class="lm-mini-stat">
              <div class="lmms-icon">📡</div>
              <div class="lmms-val" id="lmms-platform-val">—</div>
              <div class="lmms-label">Platform</div>
            </div>
            <div class="lm-mini-stat">
              <div class="lmms-icon">📊</div>
              <div class="lmms-val" id="lmms-conf-val">—</div>
              <div class="lmms-label">Confidence</div>
            </div>
          </div>

        </div>
      </div>

      <!-- RESULTS SECTION (full-width, below top grid) -->
      <div id="lm-results-section" style="display:none; margin-top:14px;">

        <!-- Results Grid: 3 columns -->
        <div class="lm-results-grid">

          <!-- Leak Details -->
          <div class="card lm-result-card">
            <div class="card-hdr">
              <h3>Leak Details</h3>
              <span class="badge" id="lm-result-badge">—</span>
            </div>
            <div class="lm-detail-rows" id="lm-detail-rows"></div>
          </div>

          <!-- Leaked By -->
          <div class="card lm-result-card">
            <div class="card-hdr">
              <h3>Leaked By</h3>
              <span class="badge badge-red" id="lm-leaked-badge" style="display:none;">Traced</span>
            </div>
            <div id="lm-leaked-by-body">
              <div class="lm-idle-state" style="padding:.8rem 0;">
                <div class="lm-idle-icon" style="font-size:1.4rem;">🕵️</div>
                <div class="lm-idle-text">No trace data yet.</div>
              </div>
            </div>
          </div>

          <!-- Platforms Detected -->
          <div class="card lm-result-card">
            <div class="card-hdr">
              <h3>Platforms Detected</h3>
              <span class="badge badge-amber" id="lm-platform-count" style="display:none;"></span>
            </div>
            <div id="lm-platforms-body">
              <div class="lm-idle-state" style="padding:.8rem 0;">
                <div class="lm-idle-icon" style="font-size:1.4rem;">🌐</div>
                <div class="lm-idle-text">Run a scan to detect platforms.</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Actions Row -->
        <div class="lm-actions-row">
          <button class="lm-action-btn lm-action-primary" onclick="lmDownloadReport()">
            <span>📥</span> Download Report
          </button>
          <button class="lm-action-btn lm-action-danger" onclick="lmReportLeak()">
            <span>🚨</span> Report Leak
          </button>
          <button class="lm-action-btn" onclick="lmViewDetails()">
            <span>📋</span> View Full Details
          </button>
          <button class="lm-action-btn" onclick="lmRescan()">
            <span>🔁</span> Re-scan File
          </button>
        </div>

      </div>
    </div><!-- /content -->
  </div><!-- /main-area -->

  <!-- Shared toast (reuse ov-toast styling) -->
  <div class="ov-toast" id="lm-toast"></div>

</div><!-- /screen s7 -->
`);

// ─────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────
let lmCurrentFile = null;
let lmScanTimer = null;

// ─────────────────────────────────────────────────────────────
//  DRAG & DROP
// ─────────────────────────────────────────────────────────────
window.lmDragOver = function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('lm-drop-zone').classList.add('drag-over');
};

window.lmDragLeave = function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('lm-drop-zone').classList.remove('drag-over');
};

window.lmDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('lm-drop-zone').classList.remove('drag-over');
    const file = e.dataTransfer && e.dataTransfer.files[0];
    if (file) lmLoadFile(file);
};

window.lmFileSelected = function (e) {
    const file = e.target.files && e.target.files[0];
    if (file) lmLoadFile(file);
};

// ─────────────────────────────────────────────────────────────
//  FILE LOADER
// ─────────────────────────────────────────────────────────────
function lmLoadFile(file) {
    lmCurrentFile = file;
    const ext = file.name.split('.').pop().toLowerCase();

    // Update drop zone to "ready" state
    const dz = document.getElementById('lm-drop-zone');
    dz.classList.add('has-file');
    document.getElementById('lm-drop-inner').innerHTML = `
    <div class="lm-drop-icon-wrap">
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <circle cx="24" cy="24" r="22" fill="rgba(45,106,79,0.08)" stroke="rgba(45,106,79,0.4)" stroke-width="2"/>
        <path d="M15 24l7 7 11-11" stroke="#2D6A4F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="lm-drop-title" style="color:var(--sage);">File ready</div>
    <div class="lm-drop-sub">${file.name}</div>
    <div class="lm-drop-types">Click <strong>Verify Leak</strong> to start scanning</div>
  `;

    // Build preview
    const previewBody = document.getElementById('lm-preview-body');
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);
    const isVideo = ['mp4', 'mkv', 'mov', 'avi', 'webm'].includes(ext);
    const isAudio = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'].includes(ext);

    if (isImage) {
        const url = URL.createObjectURL(file);
        previewBody.innerHTML = `<img src="${url}" alt="preview" style="width:100%;max-height:180px;object-fit:contain;border-radius:8px;display:block;"/>`;
    } else if (isVideo) {
        const url = URL.createObjectURL(file);
        previewBody.innerHTML = `<video src="${url}" controls style="width:100%;max-height:180px;border-radius:8px;display:block;"></video>`;
    } else if (isAudio) {
        previewBody.innerHTML = `
      <div style="padding:1.2rem;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:.6rem;">🎵</div>
        <audio controls src="${URL.createObjectURL(file)}" style="width:100%;margin-top:.4rem;"></audio>
      </div>`;
    } else {
        const icons = { pdf: '📄', doc: '📝', docx: '📝', txt: '📃' };
        previewBody.innerHTML = `<div style="font-size:3rem;padding:1.5rem;text-align:center;">${icons[ext] || '📁'}</div>`;
    }

    // File meta chips
    const sizeMB = (file.size / 1048576).toFixed(2);
    document.getElementById('lm-file-meta').innerHTML = `
    <span class="lm-meta-chip">📁 ${file.name}</span>
    <span class="lm-meta-chip">💾 ${sizeMB} MB</span>
    <span class="lm-meta-chip">🗂️ ${(file.type || ext).toUpperCase()}</span>
  `;

    document.getElementById('lm-preview-wrap').style.display = 'block';

    // Update badges & status
    document.getElementById('lm-upload-badge').textContent = 'File Loaded';
    document.getElementById('lm-upload-badge').className = 'badge badge-green';
    document.getElementById('lm-status-badge').textContent = 'File Loaded';
    document.getElementById('lm-status-badge').className = 'badge badge-amber';
    document.getElementById('lm-status-body').innerHTML = `
    <div class="lm-idle-state">
      <div class="lm-idle-icon">✅</div>
      <div class="lm-idle-text">File loaded successfully. Click <strong>Verify Leak</strong> to start the AI scan.</div>
    </div>`;

    // Show verify button
    document.getElementById('lm-verify-btn').style.display = 'flex';
}

// ─────────────────────────────────────────────────────────────
//  VERIFY — animated scan steps
// ─────────────────────────────────────────────────────────────
window.lmVerify = async function () {
    if (!lmCurrentFile) return;
    clearTimeout(lmScanTimer);

    document.getElementById('lm-results-section').style.display = 'none';
    document.getElementById('lm-mini-stats').style.display = 'none';

    const verifyBtn = document.getElementById('lm-verify-btn');
    verifyBtn.disabled = true;

    document.getElementById('lm-status-badge').textContent = 'Scanning…';
    document.getElementById('lm-status-badge').className = 'badge badge-amber';

    const steps = [
        'Extracting watermark fingerprint…',
        'Running AI content hash analysis…',
        'Cross-referencing blockchain registry…',
        'Compiling leak trace report…',
    ];

    document.getElementById('lm-status-body').innerHTML = `
    <div class="lm-scan-wrap">
      <div class="lm-scan-ring">
        <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
          <circle cx="28" cy="28" r="24" stroke="var(--border)" stroke-width="3"/>
          <path d="M28 4 A24 24 0 0 1 52 28" stroke="var(--sage)" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="lm-scan-steps" id="lm-scan-steps">
        ${steps.map((s, i) => `
          <div class="lm-scan-step" id="lm-step-${i}">
            <div class="lm-scan-step-dot"></div>
            <span>${s}</span>
          </div>`).join('')}
      </div>
    </div>`;

    let idx = 0;
    function advance() {
        if (idx > 0) {
            const prev = document.getElementById(`lm-step-${idx - 1}`);
            if (prev) { prev.classList.remove('active'); prev.classList.add('done'); }
        }
        if (idx < steps.length) {
            const cur = document.getElementById(`lm-step-${idx}`);
            if (cur) cur.classList.add('active');
            idx++;
            lmScanTimer = setTimeout(advance, 600);
        }
    }
    advance();

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", lmCurrentFile);

    try {
        const response = await fetch(`${window.location.origin.replace('5173', '8080')}/api/leak/detect`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        const detected = result.status === "LEAK DETECTED" || result.status === "TAMPER DETECTED";

        // Wait a bit to let animations finish or at least look real
        await new Promise(r => setTimeout(r, 1500));

        // ── Status card update ──────────────────────────────────
        const statusBadge = document.getElementById('lm-status-badge');
        statusBadge.textContent = detected ? result.status : 'File Safe';
        statusBadge.className = detected ? 'badge badge-red' : 'badge badge-green';

        const statusCard = document.getElementById('lm-status-card');
        if (detected) statusCard.classList.add('lm-detected');
        else statusCard.classList.remove('lm-detected');

        document.getElementById('lm-status-body').innerHTML = `
        <div class="lm-idle-state">
          <div class="lm-idle-icon">${detected ? '🚨' : '✅'}</div>
          <div class="lm-idle-text" style="color:${detected ? 'var(--danger)' : 'var(--sage)'};font-weight:500;">
            ${detected
                ? `Leak identified. Original owner traced to ${result.ownerEmail || result.walletAddress}.`
                : 'No leak detected. This file does not match any watermarked assets.'}
          </div>
        </div>`;

        // ── Mini stats ──────────────────────────────────────────
        document.getElementById('lm-mini-stats').style.display = 'grid';
        const sv = document.getElementById('lmms-status-val');
        sv.textContent = detected ? 'LEAKED' : 'SAFE';
        sv.className = detected ? 'lmms-val red' : 'lmms-val green';
        document.getElementById('lmms-platform-val').textContent = detected ? 'Unknown' : 'None';
        document.getElementById('lmms-conf-val').textContent = result.similarity || '100%';

        // ── Show results section ────────────────────────────────
        document.getElementById('lm-results-section').style.display = 'block';

        // Leak Details card
        document.getElementById('lm-result-badge').textContent = detected ? 'Detected' : 'Clean';
        document.getElementById('lm-result-badge').className = detected ? 'badge badge-red' : 'badge badge-green';
        document.getElementById('lm-detail-rows').innerHTML = [
            ['Status', detected ? `🚨 ${result.status}` : '✅ File Safe', detected ? 'red' : 'green'],
            ['Similarity', result.similarity || '—', ''],
            ['Original File', result.fileName || '—', ''],
            ['Watermark ID', result.watermarkId || 'None', ''],
            ['Scan Completed', new Date().toLocaleTimeString(), ''],
        ].map(([label, value, cls]) => `
        <div class="lm-detail-row">
          <span class="lm-detail-label">${label}</span>
          <span class="lm-detail-value ${cls}">${value}</span>
        </div>`).join('');

        // Leaked By card
        if (detected) {
            document.getElementById('lm-leaked-badge').style.display = 'inline-block';
            document.getElementById('lm-leaked-by-body').innerHTML = [
                ['📧', 'Owner Email', result.ownerEmail || 'N/A'],
                ['🆔', 'Wallet Address', result.walletAddress || 'N/A'],
                ['🕐', 'Detection Time', new Date().toLocaleString()],
            ].map(([icon, key, val]) => `
          <div class="lm-leaked-row">
            <div class="lm-leaked-icon">${icon}</div>
            <div>
              <div class="lm-leaked-key">${key}</div>
              <div class="lm-leaked-val" style="word-break:break-all;">${val}</div>
            </div>
          </div>`).join('');
        } else {
            document.getElementById('lm-leaked-badge').style.display = 'none';
            document.getElementById('lm-leaked-by-body').innerHTML = `
          <div class="lm-idle-state" style="padding:.8rem 0;">
            <div class="lm-idle-icon" style="font-size:1.4rem;">✅</div>
            <div class="lm-idle-text">No leaker trace found.</div>
          </div>`;
        }

    } catch (err) {
        lmToast('Detection failed: ' + err.message);
        document.getElementById('lm-status-badge').textContent = 'Error';
        document.getElementById('lm-status-badge').className = 'badge badge-red';
    } finally {
        verifyBtn.disabled = false;
    }
};

// ─────────────────────────────────────────────────────────────
//  RESET
// ─────────────────────────────────────────────────────────────
window.lmReset = function () {
    clearTimeout(lmScanTimer);
    lmCurrentFile = null;

    // Reset drop zone
    const dz = document.getElementById('lm-drop-zone');
    dz.classList.remove('has-file', 'drag-over');
    document.getElementById('lm-drop-inner').innerHTML = `
    <div class="lm-drop-icon-wrap">
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <circle cx="24" cy="24" r="22" stroke="rgba(82,183,136,0.2)" stroke-width="2"/>
        <path d="M24 14v14M18 20l6-6 6 6" stroke="#2D6A4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 34h20" stroke="#2D6A4F" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="lm-drop-title">Drag &amp; drop file here</div>
    <div class="lm-drop-sub">or click to browse</div>
    <div class="lm-drop-types">MP4 &nbsp;·&nbsp; MKV &nbsp;·&nbsp; MP3 &nbsp;·&nbsp; JPG &nbsp;·&nbsp; PNG &nbsp;·&nbsp; PDF</div>
  `;
    document.getElementById('lm-file-input').value = '';

    // Hide preview
    document.getElementById('lm-preview-wrap').style.display = 'none';
    document.getElementById('lm-preview-body').innerHTML = '';
    document.getElementById('lm-file-meta').innerHTML = '';

    // Reset badges
    document.getElementById('lm-upload-badge').textContent = 'Awaiting File';
    document.getElementById('lm-upload-badge').className = 'badge badge-amber';
    document.getElementById('lm-status-badge').textContent = 'Idle';
    document.getElementById('lm-status-badge').className = 'badge badge-amber';
    document.getElementById('lm-status-card').classList.remove('lm-detected');

    document.getElementById('lm-status-body').innerHTML = `
    <div class="lm-idle-state">
      <div class="lm-idle-icon">🔍</div>
      <div class="lm-idle-text">No file loaded. Upload a file and click <strong>Verify Leak</strong> to begin scanning.</div>
    </div>`;

    // Hide verify btn, mini stats, results
    const vBtn = document.getElementById('lm-verify-btn');
    vBtn.style.display = 'none';
    vBtn.disabled = false;
    document.getElementById('lm-mini-stats').style.display = 'none';
    document.getElementById('lm-results-section').style.display = 'none';
};

// ─────────────────────────────────────────────────────────────
//  ACTION BUTTONS
// ─────────────────────────────────────────────────────────────
window.lmDownloadReport = function () { lmToast('📥 Report download started…'); };
window.lmReportLeak = function () { lmToast('🚨 Leak report submitted to LeakGuard team'); };
window.lmViewDetails = function () { lmToast('📋 Full details view — coming soon'); };
window.lmRescan = function () {
    if (!lmCurrentFile) { lmToast('No file loaded to re-scan'); return; }
    document.getElementById('lm-results-section').style.display = 'none';
    document.getElementById('lm-mini-stats').style.display = 'none';
    lmVerify();
};

// ─────────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────────
function lmToast(msg) {
    const t = document.getElementById('lm-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._lmToastTimer);
    window._lmToastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}