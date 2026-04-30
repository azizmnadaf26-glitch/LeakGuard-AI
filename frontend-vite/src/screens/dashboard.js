import { fetchAssets } from "../api";

document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s3">
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
      <div class="nav-item active" onclick="goTo('s3'); setActive(this)">
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

  <div class="main-area">
    <div class="topbar">
      <div>
        <div class="topbar-title">Dashboard</div>
        <div class="topbar-sub" id="db-welcome-sub">Welcome back — Monitoring your ecosystem</div>
      </div>
      <div class="topbar-actions">
        <button class="btn-outline">Export Report</button>
        <button class="btn-primary" onclick="goTo('s4')">
          <svg viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
          Upload Content
        </button>
      </div>
    </div>
    <div class="content">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">Protected Assets</div><div class="stat-val green" id="stat-assets">--</div><div class="stat-sub">active on chain</div></div>
        <div class="stat-card"><div class="stat-label">Leaks Detected</div><div class="stat-val red">7</div><div class="stat-sub"><span class="trend-down">↑ 2</span>&nbsp;new today</div></div>
        <div class="stat-card"><div class="stat-label">Watermarks Active</div><div class="stat-val" id="stat-wm">--</div><div class="stat-sub" id="stat-wm-sub">across 0 files</div></div>
        <div class="stat-card"><div class="stat-label">Blockchain Records</div><div class="stat-val amber" id="stat-bc">--</div><div class="stat-sub">on Algorand</div></div>
      </div>

      <div class="two-col">
        <div class="card">
          <div class="card-hdr"><h3>Recent Leak Detections</h3><span class="badge badge-red">2 critical</span></div>
          <div class="leak-item"><div class="leak-thumb">🎬</div><div class="leak-info"><div class="leak-title">Short Film — "Echoes"</div><div class="leak-meta">Detected on Telegram · 2h ago</div></div><span class="badge badge-red">Critical</span></div>
          <div class="leak-item"><div class="leak-thumb">🎵</div><div class="leak-info"><div class="leak-title">Track — "Dawn Breaks"</div><div class="leak-meta">Detected on Reddit · 6h ago</div></div><span class="badge badge-amber">Moderate</span></div>
          <div class="leak-item"><div class="leak-thumb">🖼️</div><div class="leak-info"><div class="leak-title">Artwork — "Neon Bloom"</div><div class="leak-meta">Detected on Pinterest · 1d ago</div></div><span class="badge badge-green">Resolved</span></div>
          <div class="leak-item"><div class="leak-thumb">📄</div><div class="leak-info"><div class="leak-title">Document — "Script v3.pdf"</div><div class="leak-meta">Detected on Scribd · 2d ago</div></div><span class="badge badge-green">Resolved</span></div>
        </div>
        <div class="card">
          <div class="card-hdr"><h3>Watermark Health</h3><span>Active</span></div>
          <div class="wm-vis"><div class="wm-grid"></div><span class="wm-label">Watermark mesh active</span></div>
          <div class="mini-stats">
            <div class="mini-stat green"><div class="mini-stat-val">98%</div><div class="mini-stat-label">Detection Rate</div></div>
            <div class="mini-stat amber"><div class="mini-stat-val">14ms</div><div class="mini-stat-label">Avg Trace Time</div></div>
          </div>
          <div class="upload-zone" onclick="goTo('s4')" style="cursor:pointer">
            <div class="upload-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 2v9M5 5l3-3 3 3" stroke="#2D6A4F" stroke-width="1.5" stroke-linecap="round"/><path d="M2 13h12" stroke="#2D6A4F" stroke-width="1.5" stroke-linecap="round"/></svg></div>
            <div class="upload-title">Upload to Protect</div>
            <div class="upload-sub">Video, Audio, Image — AI embeds watermark</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr"><h3>Activity Log</h3><span>Last 24 hours</span></div>
        <div class="activity-grid">
          <div class="act-item"><div class="act-dot red"></div><div><div class="act-text">Leak traced to user ID #4821 on Telegram</div><div class="act-time">2 hours ago</div></div></div>
          <div class="act-item"><div class="act-dot"></div><div><div class="act-text">Watermark embedded in "Project Omega v2"</div><div class="act-time">5 hours ago</div></div></div>
          <div class="act-item"><div class="act-dot amber"></div><div><div class="act-text">Ownership record updated on Algorand chain</div><div class="act-time">8 hours ago</div></div></div>
          <div class="act-item"><div class="act-dot"></div><div><div class="act-text">New asset "Soundscape Vol.3" registered</div><div class="act-time">12 hours ago</div></div></div>
          <div class="act-item"><div class="act-dot red"></div><div><div class="act-text">Compression-resistant scan completed</div><div class="act-time">18 hours ago</div></div></div>
          <div class="act-item"><div class="act-dot"></div><div><div class="act-text">AI model retrained with 340 new samples</div><div class="act-time">1 day ago</div></div></div>
        </div>
      </div>
    </div>
  </div>
</div>
`);

window.refreshDashboard = async function () {
  try {
    const assets = await fetchAssets();
    const count = assets.length;

    // Update stats
    const sAssets = document.getElementById('stat-assets');
    const sBc = document.getElementById('stat-bc');
    const sWm = document.getElementById('stat-wm');
    const sWmSub = document.getElementById('stat-wm-sub');

    if (sAssets) sAssets.textContent = count;
    if (sBc) sBc.textContent = count;
    if (sWm) sWm.textContent = count * 6; // Mock active watermarks
    if (sWmSub) sWmSub.textContent = `across ${count} files`;

  } catch (err) {
    console.error("Dashboard refresh failed:", err);
  }
};