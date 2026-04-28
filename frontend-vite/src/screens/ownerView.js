document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s6">

  <!-- SIDEBAR -->
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
      <div class="nav-item active" onclick="goTo('s6'); setActive(this)">
        <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Owner View
      </div>
      <div class="sb-section">Monitoring</div>
      <div class="nav-item" onclick="goTo('s7'); setActive(this)">
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
        <div class="sb-avatar">AN</div>
        <div>
          <div class="sb-user-name">Aziz Nadaf</div>
          <div class="sb-user-role">Creator · Verified</div>
        </div>
      </div>
    </div>
  </div>

  <!-- MAIN AREA -->
  <div class="main-area">
    <div class="topbar">
      <div>
        <div class="topbar-title">Owner View</div>
        <div class="topbar-sub">Manage your profile, keys, and account</div>
      </div>
      <div class="topbar-actions">
        <button class="btn-outline" onclick="goTo('s3')">← Dashboard</button>
        <button class="btn-primary" onclick="goTo('s4')">
          <svg viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
          Upload Content
        </button>
         <button class="btn-danger" onclick="logoutUser()">
     Logout
  </button>
      </div>
    </div>

    <div class="content">

      <!-- ROW 1: Profile + API Key -->
      <div class="ov-top-row">

        <!-- Profile Card -->
        <div class="card ov-profile-card">
          <div class="ov-avatar-wrap">
            <div class="ov-avatar" id="ov-avatar-display">AN</div>
            <label class="ov-avatar-edit" for="ov-avatar-input" title="Upload photo">
              <svg viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/></svg>
            </label>
            <input type="file" id="ov-avatar-input" accept="image/*" style="display:none" onchange="handleAvatarUpload(event)"/>
          </div>
          <div class="ov-profile-info">
            <div class="ov-profile-name" id="ov-display-name">Aziz Nadaf</div>
            <div class="ov-profile-badges">
              <span class="badge badge-green">✓ Verified Creator</span>
              <span class="ov-security-badge" id="ov-2fa-badge">🔒 2FA On</span>
            </div>
            <div class="ov-wallet-row">
              <span class="ov-wallet-addr" id="ov-wallet-display">0x4f3a...8b2c</span>
              <button class="ov-icon-btn" onclick="copyToClipboard('0x4f3a9e21c8b2c', 'Wallet address')" title="Copy wallet">
                <svg viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              </button>
            </div>
            <div class="ov-meta-row">
              <span class="ov-meta-item">🕐 Last login: Today, 11:42 AM</span>
              <span class="ov-meta-item">📅 Joined: Jan 2024</span>
            </div>
          </div>
          <button class="btn-outline ov-edit-btn" onclick="openEditProfile()">Edit Profile</button>
        </div>

        <!-- API Key Card -->
        <div class="card ov-api-card">
          <div class="card-hdr">
            <h3>API Key</h3>
            <span class="badge badge-green">Active</span>
          </div>
          <div class="ov-api-usage">
            <span class="ov-api-usage-label">API Usage this month</span>
            <div class="ov-api-bar-wrap">
              <div class="ov-api-bar" style="width: 62%"></div>
            </div>
            <span class="ov-api-usage-num">6,200 / 10,000 calls</span>
          </div>
          <div class="ov-api-key-row">
            <div class="ov-api-key-box">
              <span class="ov-api-key-text" id="ov-api-key-text">lkg_live_•••• •••• •••• ••••</span>
            </div>
            <button class="ov-icon-btn" id="ov-copy-key-btn" onclick="copyApiKey()" title="Copy key" style="display:none">
              <svg viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="ov-api-actions">
            <button class="btn-outline" style="flex:1" onclick="revealApiKey()">
              <span id="ov-reveal-btn-text">🔍 Reveal Key</span>
            </button>
            <button class="btn-outline" style="flex:1; color: var(--danger); border-color: var(--danger);" onclick="confirmRegenKey()">↺ Regenerate</button>
          </div>
          <!-- Inline password prompt -->
          <div class="ov-password-prompt" id="ov-password-prompt" style="display:none">
            <input type="password" class="form-input" id="ov-key-password" placeholder="Enter password to reveal..." style="margin-bottom:8px"/>
            <div style="display:flex;gap:8px">
              <button class="btn-primary" style="flex:1;justify-content:center" onclick="verifyAndReveal()">Confirm</button>
              <button class="btn-outline" style="flex:1" onclick="cancelReveal()">Cancel</button>
            </div>
          </div>
        </div>

      </div>

      <!-- ROW 2: Stats Grid -->
      <div class="ov-stats-grid">
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(45,106,79,0.1);">📤</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val green" id="ov-stat-uploads">12</div>
            <div class="ov-stat-label">Total Uploads</div>
            <div class="ov-stat-trend trend-up">↑ 2 this week</div>
          </div>
        </div>
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(45,106,79,0.1);">🛡️</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val green">24</div>
            <div class="ov-stat-label">Protected Assets</div>
            <div class="ov-stat-trend trend-up">↑ 3 this week</div>
          </div>
        </div>
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(224,82,82,0.1);">🚨</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val red">7</div>
            <div class="ov-stat-label">Leaks Detected</div>
            <div class="ov-stat-trend trend-down">↑ 2 new today</div>
          </div>
        </div>
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(240,165,0,0.1);">💧</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val amber">142</div>
            <div class="ov-stat-label">Active Watermarks</div>
            <div class="ov-stat-trend" style="color:var(--muted)">across 24 files</div>
          </div>
        </div>
      </div>

      <!-- ROW 3: Activity + Actions -->
      <div class="ov-bottom-row">

        <!-- Activity Summary -->
        <div class="card" style="flex: 1.4;">
          <div class="card-hdr">
            <h3>Activity Summary</h3>
            <span>Last 7 days</span>
          </div>
          <div class="ov-activity-tabs">
            <button class="ov-tab active" onclick="switchOvTab(this, 'uploads')">Uploads</button>
            <button class="ov-tab" onclick="switchOvTab(this, 'leaks')">Leak Alerts</button>
          </div>
          <div id="ov-tab-uploads" class="ov-tab-content">
            <div class="ov-act-item">
              <div class="ov-act-icon">🎬</div>
              <div class="ov-act-info"><div class="ov-act-title">Short Film — "Echoes"</div><div class="ov-act-meta">Uploaded · 2 days ago · Movies</div></div>
              <span class="badge badge-green">Protected</span>
            </div>
            <div class="ov-act-item">
              <div class="ov-act-icon">🎵</div>
              <div class="ov-act-info"><div class="ov-act-title">Track — "Dawn Breaks"</div><div class="ov-act-meta">Uploaded · 4 days ago · Music</div></div>
              <span class="badge badge-green">Protected</span>
            </div>
            <div class="ov-act-item">
              <div class="ov-act-icon">📄</div>
              <div class="ov-act-info"><div class="ov-act-title">Script v3.pdf</div><div class="ov-act-meta">Uploaded · 6 days ago · Docs</div></div>
              <span class="badge badge-green">Protected</span>
            </div>
            <div class="ov-act-item">
              <div class="ov-act-icon">🖼️</div>
              <div class="ov-act-info"><div class="ov-act-title">Artwork — "Neon Bloom"</div><div class="ov-act-meta">Uploaded · 7 days ago · Art</div></div>
              <span class="badge badge-green">Protected</span>
            </div>
          </div>
          <div id="ov-tab-leaks" class="ov-tab-content" style="display:none">
            <div class="ov-act-item">
              <div class="ov-act-icon">🚨</div>
              <div class="ov-act-info"><div class="ov-act-title">Short Film — "Echoes" leaked</div><div class="ov-act-meta">Telegram · 2 hours ago</div></div>
              <span class="badge badge-red">Critical</span>
            </div>
            <div class="ov-act-item">
              <div class="ov-act-icon">⚠️</div>
              <div class="ov-act-info"><div class="ov-act-title">Track — "Dawn Breaks" shared</div><div class="ov-act-meta">Reddit · 6 hours ago</div></div>
              <span class="badge badge-amber">Moderate</span>
            </div>
            <div class="ov-act-item">
              <div class="ov-act-icon">✅</div>
              <div class="ov-act-info"><div class="ov-act-title">Artwork — "Neon Bloom" resolved</div><div class="ov-act-meta">Pinterest · 1 day ago</div></div>
              <span class="badge badge-green">Resolved</span>
            </div>
          </div>
        </div>

        <!-- Actions + Security -->
        <div style="display:flex;flex-direction:column;gap:14px;flex:1;">

          <!-- Quick Actions -->
          <div class="card">
            <div class="card-hdr"><h3>Quick Actions</h3></div>
            <div class="ov-actions-grid">
              <button class="ov-action-btn" onclick="goTo('s4')">
                <span class="ov-action-icon">📤</span>
                <span>Upload Content</span>
              </button>
              <button class="ov-action-btn" onclick="goTo('s5')">
                <span class="ov-action-icon">📁</span>
                <span>View My Content</span>
              </button>
              <button class="ov-action-btn" onclick="runLeakScan()">
                <span class="ov-action-icon">🔍</span>
                <span>Run Leak Scan</span>
              </button>
              <button class="ov-action-btn" onclick="downloadReport()">
                <span class="ov-action-icon">📊</span>
                <span>Download Report</span>
              </button>
            </div>
          </div>

          <!-- Security Status -->
          <div class="card">
            <div class="card-hdr"><h3>Security Status</h3><span class="badge badge-green">Secure</span></div>
            <div class="ov-security-rows">
              <div class="ov-sec-row">
                <span class="ov-sec-label">Two-Factor Auth</span>
                <span class="badge badge-green">Enabled</span>
              </div>
              <div class="ov-sec-row">
                <span class="ov-sec-label">Blockchain Verified</span>
                <span class="badge badge-green">Active</span>
              </div>
              <div class="ov-sec-row">
                <span class="ov-sec-label">AI Watermark Engine</span>
                <span class="badge badge-green">Online</span>
              </div>
              <div class="ov-sec-row">
                <span class="ov-sec-label">API Key Status</span>
                <span class="badge badge-green">Valid</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div><!-- /content -->
  </div><!-- /main-area -->

  <!-- Edit Profile Modal -->
  <div class="ov-modal-overlay" id="ov-modal" style="display:none" onclick="closeEditProfile(event)">
    <div class="ov-modal-card">
      <div class="card-hdr" style="margin-bottom:1.2rem">
        <h3>Edit Profile</h3>
        <button class="ov-icon-btn" onclick="closeEditProfileDirect()">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Display Name</label>
        <input type="text" class="form-input" id="ov-edit-name" placeholder="Your name..." />
      </div>
      <div class="form-group">
        <label class="form-label">Wallet Address</label>
        <input type="text" class="form-input" id="ov-edit-wallet" placeholder="0x..." />
      </div>
      <div class="form-group">
        <label class="form-label">Bio</label>
        <textarea class="form-textarea" id="ov-edit-bio" rows="2" placeholder="Short bio..."></textarea>
      </div>
      <div style="display:flex;gap:10px;margin-top:1rem">
        <button class="btn-primary" style="flex:1;justify-content:center" onclick="saveProfile()">Save Changes</button>
        <button class="btn-outline" style="flex:1" onclick="closeEditProfileDirect()">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="ov-toast" id="ov-toast"></div>

</div>
`);

// ─── STATE ───────────────────────────────────────────────
const OV_API_KEY = 'lkg_live_8f92bd4c1e3a7f2d9b5c0e8a1d4f7b3c';
let apiRevealed = false;

// ─── AVATAR ──────────────────────────────────────────────
window.handleAvatarUpload = function (event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const el = document.getElementById('ov-avatar-display');
        el.style.backgroundImage = `url(${e.target.result})`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.textContent = '';
    };
    reader.readAsDataURL(file);
};

// ─── API KEY ─────────────────────────────────────────────
window.revealApiKey = function () {
    if (apiRevealed) {
        hideApiKey();
        return;
    }
    const prompt = document.getElementById('ov-password-prompt');
    prompt.style.display = prompt.style.display === 'none' ? 'block' : 'none';
};

window.cancelReveal = function () {
    document.getElementById('ov-password-prompt').style.display = 'none';
    document.getElementById('ov-key-password').value = '';
};

window.verifyAndReveal = function () {
    const pw = document.getElementById('ov-key-password').value;
    const btn = document.getElementById('ov-reveal-btn-text');

    if (!pw) { showToast('Please enter your password'); return; }

    // Simulate loading
    btn.textContent = '⏳ Verifying...';
    setTimeout(() => {
        // Demo: any non-empty password works
        document.getElementById('ov-api-key-text').textContent = OV_API_KEY;
        document.getElementById('ov-copy-key-btn').style.display = 'flex';
        btn.textContent = '🙈 Hide Key';
        document.getElementById('ov-password-prompt').style.display = 'none';
        document.getElementById('ov-key-password').value = '';
        apiRevealed = true;
        showToast('API key revealed');
    }, 800);
};

function hideApiKey() {
    document.getElementById('ov-api-key-text').textContent = 'lkg_live_•••• •••• •••• ••••';
    document.getElementById('ov-copy-key-btn').style.display = 'none';
    document.getElementById('ov-reveal-btn-text').textContent = '🔍 Reveal Key';
    apiRevealed = false;
}

window.copyApiKey = function () {
    copyToClipboard(OV_API_KEY, 'API key');
};

window.confirmRegenKey = function () {
    if (confirm('Regenerate API key? Your current key will stop working immediately.')) {
        showToast('API key regenerated — update your integrations');
        hideApiKey();
    }
};

// ─── CLIPBOARD ───────────────────────────────────────────
window.copyToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast((label || 'Text') + ' copied to clipboard');
    }).catch(() => {
        showToast('Copy failed — please copy manually');
    });
};

// ─── TOAST ───────────────────────────────────────────────
function showToast(msg) {
    const t = document.getElementById('ov-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── TABS ────────────────────────────────────────────────
window.switchOvTab = function (btn, tab) {
    document.querySelectorAll('.ov-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('ov-tab-uploads').style.display = tab === 'uploads' ? 'block' : 'none';
    document.getElementById('ov-tab-leaks').style.display = tab === 'leaks' ? 'block' : 'none';
};

// ─── QUICK ACTIONS ───────────────────────────────────────
window.runLeakScan = function () {
    showToast('🔍 Leak scan initiated — results in ~30s');
};

window.downloadReport = function () {
    showToast('📊 Report download started');
};
window.logoutUser = function () {
  // Clear wallet session
  if (window.disconnectWallet) {
    window.disconnectWallet();
  }

  // Clear local data
  localStorage.clear();

  // Redirect to auth screen
  if (window.goTo) window.goTo('s2');

  console.log("🚪 User logged out");
};

// ─── EDIT PROFILE ────────────────────────────────────────
window.openEditProfile = function () {
    document.getElementById('ov-edit-name').value = document.getElementById('ov-display-name').textContent;
    document.getElementById('ov-edit-wallet').value = document.getElementById('ov-wallet-display').textContent;
    document.getElementById('ov-modal').style.display = 'flex';
};

window.closeEditProfile = function (e) {
    if (e.target === document.getElementById('ov-modal')) {
        document.getElementById('ov-modal').style.display = 'none';
    }
};

window.closeEditProfileDirect = function () {
    document.getElementById('ov-modal').style.display = 'none';
};

window.saveProfile = function () {
    const name = document.getElementById('ov-edit-name').value.trim();
    const wallet = document.getElementById('ov-edit-wallet').value.trim();
    if (!name) { showToast('Name cannot be empty'); return; }

    document.getElementById('ov-display-name').textContent = name;
    if (wallet) document.getElementById('ov-wallet-display').textContent = wallet;

    // Update sidebar avatar initials
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatarEl = document.getElementById('ov-avatar-display');
    if (!avatarEl.style.backgroundImage) avatarEl.textContent = initials;

    closeEditProfileDirect();
    showToast('Profile updated successfully');
};

// ─── STATS: sync from localStorage ───────────────────────
window.refreshOwnerStats = function () {
    const assets = JSON.parse(localStorage.getItem('creatorChainAssets') || '[]');
    const el = document.getElementById('ov-stat-uploads');
    if (el) el.textContent = assets.length || 12;
};

// call on screen open
const _origGoTo = window.goTo;
window.goTo = function (id) {
    _origGoTo(id);
    if (id === 's6') window.refreshOwnerStats && window.refreshOwnerStats();
};