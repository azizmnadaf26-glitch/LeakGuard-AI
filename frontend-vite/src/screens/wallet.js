// ============================================================
//  wallet.js — LeakGuard AI · Pera Wallet Integration
// ============================================================

import PeraWalletConnect from "https://esm.sh/@perawallet/connect";

// Initialize
const peraWallet = new PeraWalletConnect();

// ============================================================
// 🔗 CONNECT WALLET (QR / Mobile Deep Link)
// ============================================================
async function connectWallet() {
  try {
    const accounts = await peraWallet.connect();

    const walletAddress = accounts[0];
    console.log("✅ Connected:", walletAddress);

    // Store wallet
    localStorage.setItem("walletAddress", walletAddress);

    // Navigate to dashboard
    if (window.goTo) window.goTo('s3');

  } catch (error) {
    console.error("❌ Wallet connection failed:", error);
  }
}

// ============================================================
// 🔄 RECONNECT SESSION (AUTO LOGIN)
// ============================================================
async function reconnectSession() {
  try {
    const accounts = await peraWallet.reconnectSession();

    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      console.log("🔄 Reconnected:", walletAddress);

      localStorage.setItem("walletAddress", walletAddress);

      // Auto enter app
      if (window.goTo) window.goTo('s3');
    }

  } catch (error) {
    console.error("Reconnect error:", error);
  }
}

// ============================================================
// 🔌 DISCONNECT (OPTIONAL)
// ============================================================
async function disconnectWallet() {
  await peraWallet.disconnect();
  localStorage.removeItem("walletAddress");

  if (window.goTo) window.goTo('s2');
}

// ============================================================
// 🌍 EXPOSE FUNCTIONS TO GLOBAL (VERY IMPORTANT)
// ============================================================

window.connectWallet = connectWallet;
window.reconnectSession = reconnectSession;
window.disconnectWallet = disconnectWallet;