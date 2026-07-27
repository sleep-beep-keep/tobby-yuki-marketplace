'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './LoginModal.module.css';

const methods = [
  { key: 'email', label: 'Email' },
  { key: 'google', label: 'Google' },
  { key: 'phone', label: 'Phone' },
];

const STORAGE_KEY = 'tobby-yuki-user';

export default function LoginModal({ onClose, onSaveProfile }) {
  const [mode, setMode] = useState('login');
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.email) setEmail(data.email);
        if (data.name) setFullName(data.name);
      } catch {}
    }
  }, []);

  const saveProfile = (profile) => {
    if (onSaveProfile) {
      onSaveProfile(profile);
      return;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('');
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();

    setTimeout(() => {
      if (authMethod === 'google') {
        const profileData = { method: 'google', email: 'testuser@gmail.com', name: 'Test User', createdAt: new Date().toISOString() };
        saveProfile(profileData);
        setStatus('Logged in with Google test account.');
        onClose();
        setIsSubmitting(false);
        return;
      }

      if (authMethod === 'email') {
        if (!trimmedEmail || !password) {
          setStatus('Please enter email and password.');
          setIsSubmitting(false);
          return;
        }

        if (mode === 'register' && !fullName) {
          setStatus('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }

        const profileData = {
          method: authMethod,
          email: trimmedEmail,
          name: fullName,
          createdAt: new Date().toISOString(),
        };

        saveProfile(profileData);
        setStatus(mode === 'login' ? 'Logged in successfully.' : 'Profile created successfully.');
        onClose();
        setIsSubmitting(false);
        return;
      }

      setStatus('Invalid login method.');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close login popup">×</button>

        <div className={styles.panel}>
          <h2>Access Wholesale Tiers & Merchant Services</h2>
          <p>Sign in to unlock trade pricing, download commercial catalogs, request custom order quotes, and track nationwide freight.</p>
          <ul className={styles.b2bFeatures}>
            <li>✓ Tiered Wholesale Rates & MOQs</li>
            <li>✓ GST Invoicing & Credit Terms</li>
            <li>✓ Dedicated B2B Order Tracking</li>
          </ul>
          <div className={styles.panelFooter}>
            <Image src="/logo.png" alt="Tobby & Yuki" width={40} height={40} />
            <span>Tobby & Yuki B2B Portal</span>
          </div>
        </div>

        <div className={styles.formWrap}>
          <div className={styles.headerRow}>
            <div>
              <div className={styles.overline}>Merchant Portal</div>
              <h3>{mode === 'login' ? 'Sign In' : 'Create Account'}</h3>
            </div>
            <div className={styles.modeSwitch}>
              <button className={mode === 'login' ? styles.activeMode : ''} onClick={() => setMode('login')}>Merchant Login</button>
              <button className={mode === 'register' ? styles.activeMode : ''} onClick={() => setMode('register')}>Apply for Account</button>
            </div>
          </div>

          <div className={styles.methodRow}>
            {methods.map(m => (
              <button
                key={m.key} type="button"
                className={authMethod === m.key ? styles.methodActive : ''}
                onClick={() => setAuthMethod(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {status && <div className={styles.statusMessage}>{status}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {authMethod === 'google' ? (
              <button type="submit" className={styles.googleBtn}>
                Continue with Google
              </button>
            ) : null}

            {authMethod === 'email' ? (
              <>
                <label className={styles.field}>
                  Email Address
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
                </label>
                <label className={styles.field}>
                  Password
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </label>
                {mode === 'register' ? (
                  <>
                    <label className={styles.field}>
                      Full Name
                      <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="Your full name" required />
                    </label>
                  </>
                ) : (
                  <div className={styles.utilityRow}>
                    <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                  </div>
                )}
              </>
            ) : null}

            <div className={styles.ctaRow}>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? '...' : mode === 'login' ? 'Sign In to Portal' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
