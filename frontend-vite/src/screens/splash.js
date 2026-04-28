document.getElementById('app').insertAdjacentHTML('beforeend', `
<div class="screen active" id="s1">
  <div class="s1-deco">
    <div class="deco-circle dc1"></div>
    <div class="deco-circle dc2"></div>
    <div class="deco-circle dc3"></div>
  </div>
  <div class="s1-wrap">
    <div class="s1-badge"><span class="s1-badge-dot"></span>Blockchain-Verified Security</div>
    <div class="logo-ring">
      <svg viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="16" stroke="white" stroke-width="2"/>
        <path d="M12 19l5.5 5.5 8.5-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h1 class="s1-title">LeakGuard <em>AI</em><br/>+ CreatorChain</h1>
    <p class="s1-sub">AI-powered content piracy detection &amp; blockchain-verified creator ownership — protecting your digital work across every platform.</p>
    <div class="s1-features">
      <div class="s1-feat">🔍 Deep Leak Detection</div>
      <div class="s1-feat">🔗 Blockchain Ownership</div>
      <div class="s1-feat">💧 Invisible Watermarking</div>
    </div>
    <button class="cta-btn" onclick="goTo('s2')">Enter the Ecosystem →</button>
    <div class="s1-note"><span class="live-dot"></span>Powered by AI + Algorand Blockchain</div>
  </div>
</div>
`);