import { api, fetchUser, fetchAssets } from "../api";

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
        <div class="sb-avatar">--</div>
        <div>
          <div class="sb-user-name">Guest User</div>
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
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3H13C13.5523 3 14 3.44772 14 4V12C14 12.5523 13.5523 13 13 13H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M2 8H10M10 8L7 5M10 8L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
            <div class="ov-avatar" id="ov-avatar-display">--</div>
            <label class="ov-avatar-edit" for="ov-avatar-input" title="Upload photo">
              <svg viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/></svg>
            </label>
            <input type="file" id="ov-avatar-input" accept="image/*" style="display:none" onchange="handleAvatarUpload(event)"/>
          </div>
          <div class="ov-profile-info">
            <div class="ov-profile-name" id="ov-display-name">Guest User</div>
            <div class="ov-profile-bio" id="ov-display-bio" style="font-size: 13px; color: var(--muted); margin: 4px 0 10px; line-height: 1.4;">No bio set yet.</div>
            <div class="ov-profile-badges">
              <span class="badge badge-green">✓ Verified Creator</span>
              <span class="ov-security-badge" id="ov-2fa-badge">🔒 2FA On</span>
            </div>
            <div class="ov-wallet-row">
              <span class="ov-wallet-addr" id="ov-wallet-display">0x0000...0000</span>
            </div>
            <div class="ov-meta-row">
              <span class="ov-meta-item">🕐 Last login: Today, 11:42 AM</span>
              <span class="ov-meta-item">📅 Joined: Jan 2024</span>
            </div>
          </div>
          <button class="btn-outline ov-edit-btn" onclick="openEditProfile()">Edit Profile</button>
        </div>

        <!-- Connected Wallet Card -->
        <div class="card ov-api-card">
          <div class="card-hdr">
            <h3>Connected Wallet</h3>
            <span class="badge badge-green">Active</span>
          </div>
          <div class="ov-api-usage">
            <span class="ov-api-usage-label">Wallet Activity</span>
            <div class="ov-api-bar-wrap">
              <div class="ov-api-bar" style="width: 62%"></div>
            </div>
            <span class="ov-api-usage-num">62% reputation score</span>
          </div>
          <div class="ov-api-key-row">
            <div class="ov-api-key-box" title="Full address available on hover">
              <span class="ov-api-key-text" id="ov-api-key-text">0x0000...0000</span>
            </div>
            <button class="ov-icon-btn" id="ov-copy-key-btn" onclick="copyOwnerWallet()" title="Copy wallet" style="display:none">
              <svg viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="ov-api-actions">
            <button class="btn-outline" style="flex:1" onclick="toggleWalletVisibility()">
              <span id="ov-toggle-btn-text">🔍 Show Wallet</span>
            </button>
            <button class="btn-outline" style="flex:1" onclick="reconnectSession()">
              <span>↺ Refresh Session</span>
            </button>
          </div>
          <div style="font-size: 11px; color: var(--muted); margin-top: 8px; text-align: center;">
            Wallet is hidden for security. Enter password to reveal.
          </div>
        </div>

      </div>

      <!-- ROW 2: Stats Grid -->
      <div class="ov-stats-grid">
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(45,106,79,0.1);">📤</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val green" id="ov-stat-uploads">--</div>
            <div class="ov-stat-label">Total Uploads</div>
            <div class="ov-stat-trend trend-up">↑ 2 this week</div>
          </div>
        </div>
        <div class="ov-stat-card">
          <div class="ov-stat-icon" style="background: rgba(45,106,79,0.1);">🛡️</div>
          <div class="ov-stat-body">
            <div class="ov-stat-val green" id="ov-stat-protected">--</div>
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
            <div class="ov-stat-trend" style="color:var(--muted)">across -- files</div>
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
            <!-- Dynamic uploads log -->
          </div>
          <div id="ov-tab-leaks" class="ov-tab-content" style="display:none">
            <div class="ov-act-item">
              <div class="ov-act-icon">🚨</div>
              <div class="ov-act-info"><div class="ov-act-title">Short Film — "Echoes" leaked</div><div class="ov-act-meta">Telegram · 2 hours ago</div></div>
              <span class="badge badge-red">Critical</span>
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

// ─── WALLET LOAD & TOGGLE ────────────────────────────────
let walletRevealed = false;

window.loadOwnerWallet = function () {
    const wallet = localStorage.getItem("walletAddress");
    const googleEmail = localStorage.getItem("userEmail");

    if (!wallet && !googleEmail) {
        alert("Please login or connect wallet");
        if (window.goTo) window.goTo('s2');
        return;
    }

    walletRevealed = false;
    const keyText = document.getElementById("ov-api-key-text");
    const toggleBtnText = document.getElementById("ov-toggle-btn-text");
    const toggleBtn = toggleBtnText ? toggleBtnText.parentElement : null;
    const copyBtn = document.getElementById("ov-copy-key-btn");
    
    if (copyBtn) copyBtn.style.display = 'none';
    if (keyText) {
        keyText.textContent = wallet ? (wallet.slice(0, 6) + "..." + wallet.slice(-4)) : 'Not Connected';
    }
    
    if (toggleBtnText) {
        if (wallet) {
            toggleBtnText.textContent = "🔍 Show Wallet";
            toggleBtn.onclick = () => toggleWalletVisibility();
            toggleBtn.disabled = false;
        } else {
            toggleBtnText.textContent = "➕ Add Wallet";
            toggleBtn.onclick = () => showManualWalletModal('loadOwnerWallet');
            toggleBtn.disabled = false;
        }
    }
};

window.toggleWalletVisibility = function () {
    const wallet = localStorage.getItem("walletAddress");
    const savedPassword = localStorage.getItem("walletPassword");
    const el = document.getElementById("ov-api-key-text");
    const btnText = document.getElementById("ov-toggle-btn-text");
    const copyBtn = document.getElementById("ov-copy-key-btn");

    if (!wallet || !el) return;

    if (walletRevealed) {
        walletRevealed = false;
        el.textContent = wallet.slice(0, 6) + "..." + wallet.slice(-4);
        if (btnText) btnText.textContent = "🔍 Show Wallet";
        if (copyBtn) copyBtn.style.display = 'none';
        return;
    }

    if (!savedPassword) {
        const newPass = prompt("Set a password to secure your wallet:");
        if (!newPass) return;
        localStorage.setItem("walletPassword", newPass);
        showToast("Password set successfully");
    } else {
        const input = prompt("Enter password to view wallet:");
        if (input !== savedPassword) {
            alert("Incorrect password");
            return;
        }
    }

    walletRevealed = true;
    el.textContent = wallet;
    if (btnText) btnText.textContent = "🙈 Hide Wallet";
    if (copyBtn) copyBtn.style.display = 'block';
};

// ─── CLIPBOARD ───────────────────────────────────────────
window.copyToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast((label || 'Text') + ' copied to clipboard');
    }).catch(() => {
        showToast('Copy failed — please copy manually');
    });
};

window.copyOwnerWallet = function () {
    const wallet = localStorage.getItem("walletAddress");
    if (wallet) {
        copyToClipboard(wallet, 'Wallet address');
    } else {
        showToast('No wallet connected');
    }
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
  if (window.disconnectWallet) window.disconnectWallet();
  localStorage.clear();
  if (window.goTo) window.goTo('s2');
  console.log("🚪 User logged out");
};

// ─── EDIT PROFILE ────────────────────────────────────────
window.openEditProfile = function () {
    document.getElementById('ov-edit-name').value = document.getElementById('ov-display-name').textContent;
    document.getElementById('ov-edit-bio').value = document.getElementById('ov-display-bio').textContent === 'No bio set yet.' ? '' : document.getElementById('ov-display-bio').textContent;
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

// ─── PROFILE LOAD ────────────────────────────────────────
window.loadOwnerProfile = async function () {
    const loginType = localStorage.getItem("loginType");
    const wallet = localStorage.getItem("walletAddress");
    const email = localStorage.getItem("userEmail");

    if (!email && !wallet) return;

    try {
        const user = await fetchUser();
        if (!user) return;

        const nameEl = document.getElementById('ov-display-name');
        const bioEl = document.getElementById('ov-display-bio');
        const walletEl = document.getElementById('ov-wallet-display');
        const avatarEl = document.getElementById('ov-avatar-display');
        
        nameEl.textContent = user.name || "Guest User";
        if (bioEl) bioEl.textContent = user.bio || "No bio set yet.";

        if (user.walletAddress) {
            const formatted = user.walletAddress.slice(0, 6) + '...' + user.walletAddress.slice(-4);
            walletEl.textContent = formatted;
            localStorage.setItem("walletAddress", user.walletAddress); // Cache
        } else {
            walletEl.textContent = "Not Linked";
        }

        if (user.photo) {
            avatarEl.style.backgroundImage = `url(${user.photo})`;
            avatarEl.style.backgroundSize = 'cover';
            avatarEl.textContent = '';
        } else {
            const initials = (user.name || "G").split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            avatarEl.textContent = initials;
        }

        if (window.updateSidebarUserInfo) window.updateSidebarUserInfo();
        window.refreshOwnerStats();
    } catch (err) {
        console.error("Profile load failed:", err);
    }
};

window.saveProfile = async function () {
    const name = document.getElementById('ov-edit-name').value.trim();
    const bio = document.getElementById('ov-edit-bio').value.trim();
    const loginType = localStorage.getItem("loginType");
    const email = localStorage.getItem("userEmail");
    const wallet = localStorage.getItem("walletAddress");

    const identifier = loginType === "google" ? email : wallet;

    if (!name) { showToast('Name cannot be empty'); return; }
    if (!identifier) { showToast('No identity found'); return; }

    try {
        // Update user profile
        await api("/api/users/profile", {
            method: "PUT",
            body: JSON.stringify({ identifier, name, bio })
        });

        closeEditProfileDirect();
        showToast('Profile updated successfully');
        
        // Refresh everything
        window.loadOwnerProfile();
        if (window.updateSidebarUserInfo) window.updateSidebarUserInfo();
    } catch (err) {
        showToast('Update failed: ' + err.message);
    }
};

// ─── STATS ───────────────────────
window.refreshOwnerStats = async function () {
    try {
        const assets = await fetchAssets();
        
        const uploadStat = document.getElementById('ov-stat-uploads');
        const protectedStat = document.getElementById('ov-stat-protected');
        const tabContent = document.getElementById('ov-tab-uploads');

        if (uploadStat) uploadStat.textContent = assets.length;
        if (protectedStat) protectedStat.textContent = assets.length;

        if (tabContent) {
            const icons = { movies: '🎬', 'web-series': '📺', anime: '🌸', music: '🎵', docs: '📄' };
            tabContent.innerHTML = assets.slice(0, 5).map(asset => `
                <div class="ov-act-item">
                  <div class="ov-act-icon">${icons[asset.category] || '📁'}</div>
                  <div class="ov-act-info">
                    <div class="ov-act-title">${asset.title}</div>
                    <div class="ov-act-meta">Uploaded · ${new Date(asset.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span class="badge badge-green">Protected</span>
                </div>
            `).join('');
            
            if (assets.length === 0) {
                tabContent.innerHTML = '<div style="padding:2rem;text-align:center;color:#888">No activity found</div>';
            }
        }
    } catch (err) {
        console.error("Stats refresh failed:", err);
    }
};