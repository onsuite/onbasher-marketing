const VERSION = '2.1';
const DMG = `/download/Basher-${VERSION}.dmg`;
const VSIX = '/Applications/Basher.app/Contents/Resources/Basher.vsix';

const Icon = {
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5" />
    </svg>
  ),
  toggle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="10" rx="5" /><circle cx="16" cy="12" r="3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3z" />
    </svg>
  ),
};

export default function Page() {
  return (
    <div className="wrap">
      <nav className="nav" aria-label="Main">
        <a className="brand" href="/">
          <img src="/icon.png" alt="" width={30} height={30} />
          Basher
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#install">Install</a>
          <a href="#safety">Safety</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">For Claude Code on macOS</p>
            <h1>
              Claude asks.
              <br />
              <em>Basher answers.</em>
            </h1>
            <p className="lede">
              A small menu-bar app that says yes to Claude Code&rsquo;s bash prompts for you, in
              Terminal, VS Code and Cursor. You choose which sessions it watches, and risky commands
              still wait for you.
            </p>
            <div className="cta-row">
              <a className="btn" href={DMG} download>
                {Icon.download}
                Download for Mac
              </a>
              <span className="fine">v{VERSION} · macOS 13+ · notarized by Apple</span>
            </div>
          </div>

          <div className="term" role="img" aria-label="A Claude Code bash prompt being approved by Basher">
            <div className="term-bar"><i /><i /><i /><span>claude — zsh</span></div>
            <div className="term-body">
              <div className="step s1"><span className="t-dim">⏺</span> <span className="t-cmd">Bash</span>(npm test)</div>
              <div className="step s2 t-box">
                <div>Do you want to proceed?</div>
                <div className="t-sel"><span className="press">❯ 1. Yes</span></div>
                <div className="t-dim">&nbsp;&nbsp;2. No, and tell Claude what to do differently</div>
              </div>
              <div className="step s3 t-ok">✓ Basher approved · 0.4s</div>
              <div className="step s4 t-dim">  ⎿ 42 passing</div>
            </div>
          </div>
        </section>

        <section className="band" id="how">
          <h2>Stay in flow</h2>
          <p className="sub">
            Long Claude runs stall on &ldquo;Do you want to proceed?&rdquo; while you are in another window.
            Basher watches for that one prompt and presses Enter, even in background tabs.
          </p>
          <div className="grid3">
            <div className="feat">
              <div className="ico">{Icon.layers}</div>
              <h3>Every terminal you use</h3>
              <p>Terminal.app tabs, plus the integrated terminal in VS Code and Cursor through a bundled extension.</p>
            </div>
            <div className="feat">
              <div className="ico">{Icon.toggle}</div>
              <h3>A switch per session</h3>
              <p>The menu shows each Claude session, coloured by state. Turn any one off, or pause Basher entirely.</p>
            </div>
            <div className="feat">
              <div className="ico">{Icon.shield}</div>
              <h3>Risky commands wait</h3>
              <p>Deletes, sudo, force pushes and piped shells are never auto-approved. You click those yourself.</p>
            </div>
          </div>
        </section>

        <section className="band" id="install">
          <h2>Install in a minute</h2>
          <p className="sub">One download covers Terminal, VS Code and Cursor.</p>
          <ol className="steps">
            <li><span><b>Open the DMG</b> and drag Basher into Applications.</span></li>
            <li><span><b>Open Basher.</b> It lives in the menu bar, not the Dock. When macOS asks, allow it to control Terminal.</span></li>
            <li>
              <span>
                <b>For VS Code or Cursor,</b> install the bundled extension once:{' '}
                <code className="k">code --install-extension {VSIX}</code> (use <code className="k">cursor</code> for Cursor),
                then reload the window.
              </span>
            </li>
            <li><span><b>Pick your sessions</b> from the menu-bar icon. A green tick means Basher is approving there.</span></li>
          </ol>
        </section>

        <section className="band" id="safety">
          <h2>What Basher never approves</h2>
          <p className="sub">
            Basher only answers bash approval prompts, and skips any command that matches its deny list.
            Those prompts stay on screen for you to decide.
          </p>
          <div className="deny" aria-label="Commands Basher will not approve">
            {['rm -r / rm -f', 'sudo', 'git push --force', 'git reset --hard', '| sh · | bash', 'dd if=', 'mkfs', 'chmod -R', 'kill -9 · pkill'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <span>Basher · an OnSuite app</span>
        <a href={DMG} download>Download v{VERSION}</a>
      </footer>
    </div>
  );
}
