document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen" id="s2">
  <button class="s2-back" onclick="goTo('s1')">← Back</button>
  <div class="s2-card">
    <div class="s2-inner">
      <div class="s2-brand">
        <div class="s2-brand-dot">
          <svg viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.5"/>
            <path d="M4.5 7l2 2 3-3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="s2-brand-name">LeakGuard AI</span>
      </div>
      <h2 class="s2-title">Join the Ecosystem</h2>
      <p class="s2-desc">Connect your identity to register, protect, and monetize your creative assets with AI + blockchain backing.</p>
      <button class="auth-btn wallet" onclick="goTo('s3')">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
          <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
        </svg>
        Continue with Google
      </button>
      <div class="divider-row"><span>or connect wallet</span></div>
      <button class="auth-btn wallet" onclick="connectWallet()">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1.5" y="4.5" width="15" height="10" rx="2" stroke="#2D6A4F" stroke-width="1.5"/>
          <path d="M1.5 7.5h15" stroke="#2D6A4F" stroke-width="1.5"/>
          <circle cx="13.5" cy="11" r="1.5" fill="#2D6A4F"/>
        </svg>
        Connect Pera / Algorand Wallet
      </button>
      <div class="auth-features">
        <div class="auth-feat">
          <div class="af-icon">
            <svg viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2.5 4v3c0 2.5 2 4.5 4.5 5 2.5-.5 4.5-2.5 4.5-5V4L7 1.5z" stroke="#2D6A4F" stroke-width="1.3" stroke-linejoin="round"/></svg>
          </div>
          <div class="af-text"><p>Tamper-proof ownership</p><span>Immutable records stored on Algorand blockchain</span></div>
        </div>
        <div class="auth-feat">
          <div class="af-icon">
            <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#2D6A4F" stroke-width="1.3"/><path d="M5 7l1.5 1.5 2.5-2.5" stroke="#2D6A4F" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <div class="af-text"><p>AI-backed leak detection</p><span>Deep learning watermark tracing across platforms</span></div>
        </div>
        <div class="auth-feat">
          <div class="af-icon">
            <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="5" width="10" height="7" rx="1.5" stroke="#2D6A4F" stroke-width="1.3"/><path d="M5 5V4a2 2 0 014 0v1" stroke="#2D6A4F" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <div class="af-text"><p>Secure monetization</p><span>Licensed access and ownership transfer via smart contracts</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
`);