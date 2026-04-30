// ============================================================
//  wallet.js — LeakGuard AI · Pera Wallet Integration
// ============================================================

import { PeraWalletConnect } from "@perawallet/connect";
import { api } from "./api";

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
    localStorage.setItem("loginType", "wallet");

    // Sync with backend if user is logged in via Google
    const email = localStorage.getItem("userEmail");
    if (email) {
      try {
        await api("/api/users/wallet", {
          method: "PUT",
          body: JSON.stringify({ email, walletAddress })
        });
      } catch (err) {
        console.warn("Backend sync failed, but wallet is connected locally:", err);
      }
    }

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
      localStorage.setItem("loginType", "wallet");

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