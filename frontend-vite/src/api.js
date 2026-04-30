const BASE_URL = "http://127.0.0.1:8080";

/**
 * Global API helper
 * @param {string} path - Endpoint path (e.g. "/api/users/login")
 * @param {object} options - Fetch options
 */
export async function api(path, options = {}) {
  try {
    console.log(`[API Request] ${path}`, options);
    const res = await fetch(BASE_URL + path, {
      headers: { 
        "Content-Type": "application/json" 
      },
      ...options
    });
    
    console.log(`[API Response] ${path} - Status: ${res.status}`);

    const text = await res.text();
    console.log(`[API Raw Text] ${path}:`, text);

    if (!res.ok) {
      let errData = {};
      try {
        if (text) errData = JSON.parse(text);
      } catch (e) {}
      throw new Error(errData.message || `API Error: ${res.status}`);
    }
    
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      console.error(`[API Parse Error] ${path}:`, e.message, "Text:", text);
      throw new Error(`Failed to parse response: ${e.message}`);
    }
  } catch (error) {
    console.error(`[API Error] ${path}:`, error.message);
    // Don't alert here, let the caller handle it for better UX
    throw error;
  }
}

/**
 * Fetch current user details from backend
 */
export async function fetchUser() {
  const loginType = localStorage.getItem("loginType");
  const email = localStorage.getItem("userEmail");
  const wallet = localStorage.getItem("walletAddress");

  if (loginType === "google" && email) {
    return await api(`/api/users/${email}`);
  } else if (loginType === "wallet" && wallet) {
    return await api(`/api/users/wallet/${wallet}`);
  }
  
  return null;
}

/**
 * Fetch assets for current user
 */
export async function fetchAssets() {
  const loginType = localStorage.getItem("loginType");
  const email = localStorage.getItem("userEmail");
  const wallet = localStorage.getItem("walletAddress");

  if (loginType === "google" && email) {
    return await api(`/api/assets/email/${email}`);
  } else if (loginType === "wallet" && wallet) {
    return await api(`/api/assets/wallet/${wallet}`);
  }
  
  return [];
}

/**
 * Global sync helper to refresh all screens after data changes
 */
window.refreshUserAssets = async function() {
  console.log("🔄 Syncing user assets across UI...");
  if (window.refreshDashboard) await window.refreshDashboard();
  if (window.renderMyProperty) await window.renderMyProperty();
  if (window.refreshOwnerStats) await window.refreshOwnerStats();
};
