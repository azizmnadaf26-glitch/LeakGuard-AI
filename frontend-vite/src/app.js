// ============================================================
//  app.js  —  LeakGuard AI · Navigation & Global Utilities
// ============================================================

// 🔁 Navigate to a screen
function goTo(id) {
  const target = document.getElementById(id);

  if (!target) {
    console.warn('Screen not found:', id);
    return;
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  target.classList.add('active');

  // Trigger screen-specific hooks
  if (id === 's5' && window.renderMyProperty) window.renderMyProperty();
  if (id === 's6' && window.refreshOwnerStats) window.refreshOwnerStats();
  if (id === 's7' && window.lmReset) window.lmReset();
}

// 🎯 Sidebar active state
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}


// ============================================================
// 🔥 WALLET AUTO-RECONNECT HANDLER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (window.reconnectSession) {
      window.reconnectSession();
    }
  }, 300);
});


// ============================================================
// 🌍 MAKE FUNCTIONS GLOBAL (VERY IMPORTANT)
// ============================================================

window.goTo = goTo;
window.setActive = setActive;