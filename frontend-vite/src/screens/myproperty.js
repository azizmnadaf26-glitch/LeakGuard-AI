import { fetchAssets, fetchUser, api } from "../api";

document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s5">
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
      <div class="nav-item active" onclick="goTo('s5'); setActive(this)">
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
        <div class="topbar-title">My Property</div>
        <div class="topbar-sub">Manage your protected assets</div>
      </div>
      <div class="topbar-actions">
        <div style="display: flex; gap: 10px;">
          <input type="text" id="prop-search" class="form-input" placeholder="Search..."
                 onkeyup="renderMyProperty()" style="width: 200px;" />
          <select id="prop-filter" class="form-select" onchange="renderMyProperty()" style="width: 150px;">
            <option value="all">All Categories</option>
            <option value="movies">Movies</option>
            <option value="web-series">Web Series</option>
            <option value="anime">Anime</option>
            <option value="music">Music & Audio</option>
            <option value="docs">Documents & Scripts</option>
          </select>
        </div>
      </div>
    </div>
    <div class="content" id="property-list"
         style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; align-items: start;">
    </div>
  </div>
</div>
`);

window.toggleMoreInfo = function (index) {
  const el = document.getElementById('more-info-' + index);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

window.deleteAsset = async function (id) {
  if (!confirm("Are you sure you want to delete this asset? This action cannot be undone.")) return;

  try {
    await api(`/api/assets/${id}`, {
      method: "DELETE"
    });
    alert("Asset deleted successfully.");
    if (window.refreshUserAssets) {
      await window.refreshUserAssets();
    } else {
      renderMyProperty();
    }
  } catch (err) {
    alert("Failed to delete asset: " + err.message);
  }
};

window.renderMyProperty = async function () {
  const container = document.getElementById('property-list');
  if (!container) return;

  const query = (document.getElementById('prop-search').value || '').toLowerCase();
  const filter = document.getElementById('prop-filter').value;

  try {
    const [assets, user] = await Promise.all([fetchAssets(), fetchUser()]);
    const currentName = (user && user.name) ? user.name : "Anonymous Creator";

    const filtered = assets.filter(asset => {
      const matchesFilter = filter === 'all' || asset.category === filter;
      const matchesSearch = (asset.title || '').toLowerCase().includes(query) ||
        (asset.fileName || '').toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="card" style="grid-column:1/-1"><div style="text-align:center;color:#888;padding:2rem;">No protected assets found. <button class="btn-primary" style="margin-left:12px" onclick="goTo(\'s4\')">Upload Now</button></div></div>';
      return;
    }

    const icons = { movies: '🎬', 'web-series': '📺', anime: '🌸', music: '🎵', docs: '📄' };

    container.innerHTML = filtered.map((asset, i) => `
      <div class="card" style="display:flex;flex-direction:column;gap:1rem;position:relative;">
        <button class="ov-icon-btn" style="position:absolute;top:10px;right:10px;color:var(--danger);opacity:0.6;" 
                onclick="deleteAsset('${asset.id}')" title="Delete Asset">
          <svg viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;">
            <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M3 4l1 10a1 1 0 001 1h6a1 1 0 001-1l1-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="width:42px;height:42px;background:linear-gradient(135deg,#E8F4EE,#C8E6D9);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">
            ${icons[asset.category] || '📁'}
          </div>
          <span class="badge badge-green" style="margin-right:25px;">Protected</span>
        </div>
        <div>
          <h3 style="margin:0 0 4px;color:var(--ink);font-size:1rem;font-family:'Syne',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${asset.title}">${asset.title}</h3>
          <div style="font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${asset.fileName}">${asset.fileName}</div>
        </div>
        <div id="more-info-${i}" style="display:none;padding-top:0.8rem;border-top:1px solid var(--border);font-size:12.5px;color:var(--ink-soft);line-height:1.6;">
          <div><strong>Category:</strong> <span style="text-transform:capitalize">${asset.category}</span></div>
          <div><strong>Description:</strong> ${asset.description || 'No description.'}</div>
          <div><strong>Registered on:</strong> ${new Date(asset.createdAt).toLocaleDateString()}</div>
          <div><strong>Owner Name:</strong> ${currentName}</div>
        </div>
        <div style="margin-top:auto;">
          <button class="btn-outline" style="width:100%;justify-content:center;display:flex;font-size:12px;" onclick="toggleMoreInfo(${i})">Toggle Details</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="card" style="grid-column:1/-1"><div style="text-align:center;color:var(--danger);padding:2rem;">Failed to load assets: ${err.message}</div></div>`;
  }
};