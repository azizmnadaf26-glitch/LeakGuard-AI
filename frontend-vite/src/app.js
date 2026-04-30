import { fetchUser } from "./api";

// ============================================================
//  app.js  —  LeakGuard AI · Navigation & Global Utilities
// ============================================================

// 🔁 Navigate to a screen
function goTo(id) {
  updateSidebarUserInfo();
  const target = document.getElementById(id);

  if (!target) {
    console.warn('Screen not found:', id);
    return;
  }

  // 🛡️ SECURITY: Enforce authentication for s3-s7
  const protectedScreens = ['s3', 's4', 's5', 's6', 's7'];
  const wallet = localStorage.getItem("walletAddress");
  const googleUser = localStorage.getItem("userEmail");

  if (protectedScreens.includes(id) && !wallet && !googleUser) {
    console.warn('Unauthorized access: Please login or connect wallet first.');
    alert("Please login with Google or connect your Algorand wallet to continue.");
    // Force redirect to Auth screen (s2)
    id = 's2';
    const authTarget = document.getElementById(id);
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    authTarget.classList.add('active');
    return;
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  target.classList.add('active');

  // Trigger screen-specific hooks
  if (id === 's4') {
    if (window.refreshUploadScreen) window.refreshUploadScreen();
    if (window.loadUploadWallet) window.loadUploadWallet();
  }
  if (id === 's5' && window.renderMyProperty) window.renderMyProperty();
  if (id === 's6') {
    if (window.loadOwnerProfile) window.loadOwnerProfile();
    if (window.loadOwnerWallet) window.loadOwnerWallet();
  }
  if (id === 's7' && window.lmReset) window.lmReset();
}

// 🎯 Sidebar active state
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}

// 👤 Update Sidebar User Info
async function updateSidebarUserInfo() {
  const nameEls = document.querySelectorAll('.sb-user-name');
  const avatarEls = document.querySelectorAll('.sb-avatar');
  const wallet = localStorage.getItem("walletAddress");
  
  let displayName = "Guest User";
  let photo = null;

  try {
    const user = await fetchUser();
    if (user) {
      displayName = user.name || displayName;
      photo = user.photo;
    } else if (wallet) {
      displayName = "User " + wallet.slice(0, 4).toUpperCase();
    }
  } catch (err) {
    console.warn("Sidebar fetch failed", err);
    if (wallet) {
      displayName = "User " + wallet.slice(0, 4).toUpperCase();
    }
  }
  
  nameEls.forEach(el => el.textContent = displayName);
  
  const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  avatarEls.forEach(el => {
    if (photo) {
      el.style.backgroundImage = `url(${photo})`;
      el.style.backgroundSize = 'cover';
      el.textContent = '';
    } else {
      if (!el.style.backgroundImage) el.textContent = initials;
    }
  });
}

window.updateSidebarUserInfo = updateSidebarUserInfo;

// ============================================================
// 🔥 WALLET AUTO-RECONNECT HANDLER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  updateSidebarUserInfo();
  setTimeout(() => {
    if (window.reconnectSession) {
      window.reconnectSession();
    }
  }, 300);
});


// ============================================================
// 📦 MODAL SYSTEM
// ============================================================

document.body.insertAdjacentHTML('beforeend', `
  <div class="modal-overlay" id="global-modal-overlay">
    <div class="modal-content" id="global-modal-content">
      <div class="modal-hdr">
        <h3 class="modal-title" id="modal-title">Title</h3>
      </div>
      <div class="modal-body" id="modal-body">
        Message body goes here...
      </div>
      <div class="modal-actions" id="modal-actions">
        <!-- Actions injected dynamically -->
      </div>
    </div>
  </div>
`);

function hideModal() {
  document.getElementById('global-modal-overlay').classList.remove('active');
}

window.showConnectModal = function() {
  const overlay = document.getElementById('global-modal-overlay');
  document.getElementById('modal-title').textContent = "Connect Wallet";
  document.getElementById('modal-body').textContent = "Add your Algorand wallet to enable blockchain ownership features.";
  
  const actions = document.getElementById('modal-actions');
  actions.innerHTML = `
    <button class="btn-primary" onclick="connectWalletAndHide()">Connect Wallet</button>
    <button class="btn-outline" onclick="skipConnect()">Skip for now</button>
  `;
  
  overlay.classList.add('active');
};

window.connectWalletAndHide = function() {
  hideModal();
  if (window.connectWallet) window.connectWallet();
};

window.skipConnect = function() {
  hideModal();
  window.goTo('s3');
};

window.showManualWalletModal = function(callback) {
  const overlay = document.getElementById('global-modal-overlay');
  document.getElementById('modal-title').textContent = "Add Wallet Address";
  document.getElementById('modal-body').innerHTML = `
    <p style="margin-bottom:12px">Enter your Algorand wallet address manually.</p>
    <input type="text" id="manual-wallet-input" class="form-input" placeholder="e.g. 7Z...3A" style="width:100%"/>
  `;
  
  const actions = document.getElementById('modal-actions');
  actions.innerHTML = `
    <button class="btn-primary" onclick="saveManualWallet('${callback}')">Save Wallet</button>
    <button class="btn-outline" onclick="hideModal()">Cancel</button>
  `;
  
  overlay.classList.add('active');
};

window.saveManualWallet = function(callbackName) {
  const val = document.getElementById('manual-wallet-input').value.trim();
  if (!val) { alert("Please enter an address"); return; }
  
  localStorage.setItem("walletAddress", val);
  hideModal();
  
  if (callbackName && window[callbackName]) {
    window[callbackName]();
  } else {
    window.updateSidebarUserInfo();
  }
};


// ============================================================
// 🌍 MAKE FUNCTIONS GLOBAL (VERY IMPORTANT)
// ============================================================

window.goTo = goTo;
window.setActive = setActive;
window.hideModal = hideModal;
window.updateSidebarUserInfo = updateSidebarUserInfo;