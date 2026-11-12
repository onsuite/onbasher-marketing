import { SIGN_IN_URL, SIGN_UP_URL, OPEN_APP_URL, PLATFORM_URL } from '@/lib/urls';

export default function MarketingPage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fff' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/icon.svg" alt="Basher" width={28} height={28} style={{ borderRadius: 7 }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#111827' }}>Basher</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href={SIGN_IN_URL} style={{ color: '#374151', textDecoration: 'none', fontSize: 14 }}>
            Sign in
          </a>
          <a href={SIGN_UP_URL} style={{
            background: '#2563eb', color: '#fff', padding: '8px 18px',
            borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500,
          }}>
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '96px 24px 80px' }}>
        <img src="/icon.svg" alt="Basher" width={72} height={72} style={{ borderRadius: 18, marginBottom: 24 }} />
        <h1 style={{ fontSize: 48, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
          Basher
        </h1>
        <p style={{ fontSize: 20, color: '#6b7280', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
          The reference starter app for the OnSuite platform — demonstrating
          authentication, SSO, and workspace management.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={OPEN_APP_URL} style={{
            background: '#2563eb', color: '#fff', padding: '14px 32px',
            borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 600,
          }}>
            Open App →
          </a>
          <a href="https://github.com/onsuite/onsuite-lib" style={{
            background: '#f3f4f6', color: '#374151', padding: '14px 32px',
            borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 500,
          }}>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 48px', background: '#f9fafb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 48 }}>
            What&apos;s included
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '🔐', title: 'SSO Authentication', desc: 'Single sign-on via the OnSuite platform with token-based sessions.' },
              { icon: '🏢', title: 'Multi-workspace', desc: 'Switch between workspaces. Each workspace has its own context and apps.' },
              { icon: '👥', title: 'Team management', desc: 'Invite members, assign roles, and manage pending invitations.' },
              { icon: '⚙️', title: 'Settings & orgs', desc: 'Manage your profile and organisations from a single settings page.' },
              { icon: '📱', title: 'Mobile app', desc: 'Expo React Native companion app with the same SSO and auth flow.' },
              { icon: '🚀', title: 'Scaffold ready', desc: 'Use store.sh to scaffold a new app from this template in seconds.' },
            ].map(f => (
              <div key={f.title} style={{
                background: '#fff', borderRadius: 12, padding: '24px',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 48px', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
        <a href="https://onsuite.in" style={{ color: '#9ca3af', textDecoration: 'none' }}>OnSuite</a>
        {' · '}
        <a href={PLATFORM_URL} style={{ color: '#9ca3af', textDecoration: 'none' }}>Platform</a>
      </footer>
    </div>
  );
}
