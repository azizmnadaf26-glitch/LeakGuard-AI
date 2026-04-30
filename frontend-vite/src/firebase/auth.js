import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./config";
import { api } from "../api";

/**
 * Handles Google Login using a popup.
 * On success, stores user details in backend and email in localStorage.
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send to Backend
    await api("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
        loginType: "google"
      })
    });

    // Store session identifier
    localStorage.setItem("userEmail", user.email || "");
    localStorage.setItem("loginType", "google");

    console.log("Google Login Success (Backend Sync Done):", user.displayName);

    // Show optional wallet connect modal
    if (window.showConnectModal) {
      window.showConnectModal();
    } else {
      window.goTo('s3');
    }
  } catch (error) {
    console.error("Google Login Error:", error.message);
  }
}

/**
 * Handles Google Logout.
 */
export async function logoutGoogle() {
  try {
    await signOut(auth);
    console.log("Google Logout Success");
    
    // Clear user info from localStorage if needed
    // localStorage.removeItem("userName");
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("userPhoto");

  } catch (error) {
    console.error("Google Logout Error:", error.message);
  }
}

// Make them available globally if needed for inline onclicks (though not recommended by clean code rules, user might need it)
window.signInWithGoogle = signInWithGoogle;
window.logoutGoogle = logoutGoogle;
