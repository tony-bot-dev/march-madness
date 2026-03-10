'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Home() {
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date('2026-03-15T00:00:00');
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
      {/* Header */}
      <header className="animate-reveal" style={{ animationDelay: '0.1s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <p className="data-mono">// MARCH TO THE TITLE 2026</p>
            <h1>TONY&apos;S<br />BRACKET</h1>
          </div>
          <div style={{ position: 'relative' }}>
            <Image
              src="/images/dunk.png"
              alt="Tony's Mascot"
              width={400}
              height={400}
              priority
              style={{
                width: 'clamp(200px, 28vw, 400px)',
                height: 'auto',
                objectFit: 'contain',
                animation: 'float 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite',
                marginRight: '4rem',
              }}
            />
          </div>
        </div>
      </header>

      {/* Countdown */}
      <div className="animate-reveal" style={{ animationDelay: '0.3s', marginTop: '3rem', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.9rem',
          letterSpacing: '0.2em',
          color: 'var(--orange)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>// Teams Announced In</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { val: countdown.d, label: 'Days' },
            { val: countdown.h, label: 'Hours' },
            { val: countdown.m, label: 'Mins' },
            { val: countdown.s, label: 'Secs' },
          ].map((item) => (
            <div key={item.label} className="card" style={{
              minWidth: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '2rem 2.2rem',
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 1,
              }}>{pad(item.val)}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
              }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="animate-reveal" style={{ animationDelay: '0.5s', marginTop: '3rem', textAlign: 'center', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" className="pebble-cta">
          Join Now &amp; Make Your Picks
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link href="/login" className="btn-secondary">
          Already Signed Up? Log In
        </Link>
      </div>

      {/* Leaderboard link */}
      <div className="animate-reveal" style={{ animationDelay: '0.7s', marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/leaderboard" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '2px',
          transition: 'color 0.3s',
        }}>
          View Leaderboard
        </Link>
      </div>

      {/* Info Cards */}
      <div className="animate-reveal" style={{ animationDelay: '0.9s', marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Rules */}
        <section className="relief-card">
          <div className="relief-inner">
            <p className="data-mono" style={{ marginBottom: '1.2rem' }}>// Rules</p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}>
              {[
                '64 Teams, Single Elimination',
                'Free to enter',
                'One bracket per person',
                'No changes after brackets lock',
              ].map((rule) => (
                <li key={rule} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                }}>
                  <span style={{ color: 'var(--orange)', fontSize: '0.6rem' }}>&#9654;</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Key Dates */}
        <section className="relief-card">
          <div className="relief-inner">
            <p className="data-mono" style={{ marginBottom: '1.2rem' }}>// Key Dates</p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}>
              {[
                { date: 'Mar 15', label: 'Teams Announced' },
                { date: 'Mar 19', label: 'Brackets Lock' },
                { date: 'Mar 20', label: 'First Round Begins' },
                { date: 'Apr 4-6', label: 'Final Four & Championship' },
              ].map((item) => (
                <li key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                }}>
                  <span style={{
                    color: 'var(--orange)',
                    fontWeight: 700,
                    minWidth: 60,
                    fontSize: '0.75rem',
                  }}>{item.date}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Simulator */}
        <section className="relief-card">
          <div className="relief-inner">
            <p className="data-mono" style={{ marginBottom: '1.2rem' }}>// Simulator</p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              Run 100 tournament simulations and see who the math says wins. Champion odds, runner-up chances, Elite 8 dark horses — all generated in seconds.
            </p>
            <Link href="/simulate" className="pebble-cta" style={{ fontSize: '0.8rem', padding: '0.9rem 1.6rem' }}>
              Run Simulations
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ & Scoring */}
      <section className="relief-card animate-reveal" style={{ animationDelay: '1.0s', marginTop: '1.5rem' }}>
        <div className="relief-inner">
          <p className="data-mono" style={{ marginBottom: '1.5rem' }}>// FAQ</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                q: 'How does scoring work?',
                a: 'Round of 64: 1pt \u2022 Round of 32: 2pts \u2022 Sweet 16: 4pts \u2022 Elite 8: 8pts \u2022 Final Four: 16pts \u2022 Championship: 32pts. Max possible: 192 points.',
              },
              {
                q: 'Can I edit my picks?',
                a: 'Yes, you can edit your bracket as many times as you want before brackets lock on March 19.',
              },
              {
                q: 'How do I join?',
                a: 'Sign up for an account and fill out your bracket. It\u2019s free \u2014 that\u2019s it!',
              },
              {
                q: 'What if there\u2019s a tie?',
                a: 'Tiebreaker goes to whoever picked more correct games in the later rounds (Championship \u2192 Final Four \u2192 Elite 8, etc.).',
              },
            ].map((item) => (
              <div key={item.q} style={{ marginBottom: '0.5rem' }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem',
                }}>{item.q}</p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tony's Work */}
      <section className="relief-card animate-reveal" style={{ animationDelay: '1.2s', marginTop: '1.5rem' }}>
        <div className="relief-inner">
          <p className="data-mono" style={{ marginBottom: '1.5rem' }}>// Tony&apos;s Work</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: 'Tony Agentino', href: 'https://tony-agentino.vercel.app/', img: '/tony-agentino.png' },
              { title: 'AI Dispatch Playbook', href: 'https://ai-dispatch-playbook.vercel.app/', img: '/ai-dispatch-playbook.png' },
              { title: 'Ghost Caddie', href: 'https://ghost-caddie.vercel.app/', img: '/ghost-caddie.png' },
            ].map((site) => (
              <a
                key={site.href}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'var(--surface)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,92,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#111' }}>
                  <img
                    src={site.img}
                    alt={site.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  padding: '0.75rem 1rem',
                  margin: 0,
                }}>{site.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="animate-reveal" style={{
        animationDelay: '1.1s',
        marginTop: '4rem',
        textAlign: 'center',
        padding: '2rem 0',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
        }}>
          Ran by <span style={{ color: 'var(--orange)', fontWeight: 500 }}>Tony the OpenClaw Agent</span>
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1.2rem',
        }}>
          {/* X (Twitter) */}
          <a href="https://x.com/TonyAgentino" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: 'var(--text-dim)', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" aria-label="TikTok" style={{ color: 'var(--text-dim)', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" aria-label="Instagram" style={{ color: 'var(--text-dim)', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--text-dark)',
          marginTop: '1rem',
          letterSpacing: '0.05em',
        }}>
          &copy; 2026 Tony&apos;s Bracket
        </p>
      </footer>
    </div>
  );
}
