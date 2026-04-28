document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s4">
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
      <div class="nav-item active" onclick="goTo('s4'); setActive(this)">
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
        <div class="sb-avatar">AN</div>
        <div>
          <div class="sb-user-name">Aziz Nadaf</div>
          <div class="sb-user-role">Creator · Verified</div>
        </div>
      </div>
    </div>
  </div>

  <div class="main-area">
    <div class="topbar">
      <div>
        <div class="topbar-title">Upload Content</div>
        <div class="topbar-sub">Protect new assets on CreatorChain</div>
      </div>
      <div class="topbar-actions">
        <button class="btn-outline" onclick="goTo('s3')">Cancel</button>
      </div>
    </div>
    <div class="content" style="display: flex; justify-content: center; align-items: flex-start;">
      <div class="card" style="width: 100%; max-width: 600px; margin-top: 1rem;">
        <div class="card-hdr" style="margin-bottom: 1.5rem;">
          <h3>Register New Asset</h3>
          <span>AI Watermark & Blockchain</span>
        </div>

        <div class="form-group">
          <label class="form-label">Upload API Key</label>
          <input type="text" id="upload-api-key" class="form-input" placeholder="e.g. lkg_live_8f92bd..." />
        </div>
        <div class="form-group">
          <label class="form-label">Title</label>
          <input type="text" id="upload-title" class="form-input" placeholder="Enter asset title..." />
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select id="upload-category" class="form-select">
            <option value="" disabled selected>Select category...</option>
            <option value="movies">Movies</option>
            <option value="web-series">Web Series</option>
            <option value="anime">Anime</option>
            <option value="music">Music & Audio</option>
            <option value="docs">Documents & Scripts</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea id="upload-desc" class="form-textarea" rows="3" placeholder="Provide a short description of the asset..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Media File</label>
          <input type="file" id="upload-file" style="display:none;" onchange="handleFileSelect(event)" />
          <div class="upload-zone" id="upload-drop-zone" style="margin-top: 5px; cursor: pointer;"
               onclick="triggerFileSelect()"
               ondragover="handleDragOver(event)"
               ondragleave="handleDragLeave(event)"
               ondrop="handleDrop(event)">
            <div class="upload-icon">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M5 5l3-3 3 3" stroke="#2D6A4F" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2 13h12" stroke="#2D6A4F" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="upload-title" id="upload-file-name">Drag and drop file here</div>
            <div class="upload-sub">Supports MP4, MKV, MP3, PDF up to 5GB</div>
          </div>
        </div>

        <div style="margin-top: 2.2rem;">
          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 14px;" onclick="handleUpload()">
            <svg viewBox="0 0 16 16" fill="none" style="width: 16px; height: 16px;">
              <path d="M12 4L8 1M8 1L4 4M8 1V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 11V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Upload and Protect Asset
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`);

window.triggerFileSelect = function () {
  document.getElementById('upload-file').click();
};

window.handleFileSelect = function (event) {
  const file = event.target.files[0];
  if (file) document.getElementById('upload-file-name').innerText = file.name;
};

window.handleDragOver = function (event) {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById('upload-drop-zone').style.borderColor = '#4ADE80';
};

window.handleDragLeave = function (event) {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById('upload-drop-zone').style.borderColor = '';
};

window.handleDrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById('upload-drop-zone').style.borderColor = '';
  if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    document.getElementById('upload-file-name').innerText = file.name;
    document.getElementById('upload-file').files = event.dataTransfer.files;
  }
};

window.handleUpload = function () {
  const title = document.getElementById('upload-title').value.trim();
  const category = document.getElementById('upload-category').value;
  const desc = document.getElementById('upload-desc').value.trim();
  const fileName = document.getElementById('upload-file-name').innerText;

  if (!title || !category || fileName === 'Drag and drop file here') {
    alert('Please fill in title, category, and select a file.');
    return;
  }

  const newAsset = {
    title, category, desc, fileName,
    date: new Date().toLocaleString(),
    uploader: 'Aziz Nadaf'
  };

  let assets = JSON.parse(localStorage.getItem('creatorChainAssets') || '[]');
  assets.push(newAsset);
  localStorage.setItem('creatorChainAssets', JSON.stringify(assets));

  alert('Asset uploaded and protected successfully!');

  // Reset form
  document.getElementById('upload-title').value = '';
  document.getElementById('upload-category').value = '';
  document.getElementById('upload-desc').value = '';
  document.getElementById('upload-file-name').innerText = 'Drag and drop file here';

  goTo('s5');
};