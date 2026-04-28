// ============================================================
//  wallet.js — LeakGuard AI · Pera Wallet Integration
// ============================================================

import { PeraWalletConnect } from "@perawallet/connect";

// Initialize
const peraWallet = new PeraWalletConnect();


// ============================================================
// 🔗 CONNECT WALLET
// ============================================================
async function connectWallet() {
  try {
    const accounts = await peraWallet.connect();

    const walletAddress = accounts[0];
    console.log("✅ Connected:", walletAddress);

    localStorage.setItem("walletAddress", walletAddress);

    if (window.goTo) window.goTo('s3');

  } catch (error) {
    console.error("❌ Wallet connection failed:", error);
  }
}


// ============================================================
// 🔄 RECONNECT SESSION
// ============================================================
async function reconnectSession() {
  try {
    const accounts = await peraWallet.reconnectSession();

    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      console.log("🔄 Reconnected:", walletAddress);

      localStorage.setItem("walletAddress", walletAddress);

      if (window.goTo) window.goTo('s3');
    }

  } catch (error) {
    console.error("Reconnect error:", error);
  }
}


// ============================================================
// 🔌 DISCONNECT
// ============================================================
async function disconnectWallet() {
  await peraWallet.disconnect();
  localStorage.removeItem("walletAddress");

  if (window.goTo) window.goTo('s2');
}


// ============================================================
// 🌍 GLOBAL EXPORT
// ============================================================

window.connectWallet = connectWallet;
window.reconnectSession = reconnectSession;
window.disconnectWallet = disconnectWallet;


// ============================================================
// 🚀 AUTO RECONNECT
// ============================================================

reconnectSession();