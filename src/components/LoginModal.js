'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import styles from './LoginModal.module.css';

const methods = [
  { key: 'email', label: 'Email' },
  { key: 'google', label: 'Google' },
  { key: 'phone', label: 'Phone' },
];

const STORAGE_KEY = 'tobby-yuki-user';

export default function LoginModal({ onClose, onSaveProfile }) {
  const [mode, setMode] = useState('login');
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [petName, setPetName] = useState('');
  const [petCategory, setPetCategory] = useState('dogs');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.name) setFullName(data.name);
        if (data.contact) setContactNumber(data.contact);
        if (data.petName) setPetName(data.petName);
        if (data.petCategory) setPetCategory(data.petCategory);
      } catch {}
    }
  }, []);

  const primaryText = useMemo(() => {
    if (mode === 'login') return 'Login to your profile';
    return 'Create a new profile';
  }, [mode]);

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
    setMessage('');
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedOtp = otp.trim();

    setTimeout(() => {
      if (method === 'google') {
        const profileData = { method: 'google', email: 'testuser@gmail.com', name: 'Test User', createdAt: new Date().toISOString() };
        saveProfile(profileData);
        setMessage('Logged in with Google test account.');
        onClose();
        setIsSubmitting(false);
        return;
      }

      if (method === 'email') {
        if (!trimmedEmail || !password) {
          setMessage('Please enter email and password.');
          setIsSubmitting(false);
          return;
        }

        if (mode === 'create' && (!fullName || !contactNumber || !petName || !petCategory)) {
          setMessage('Please fill all profile details.');
          setIsSubmitting(false);
          return;
        }

        const profileData = {
          method: 'email',
          email: trimmedEmail,
          name: fullName,
          contact: contactNumber,
          petName,
          petCategory,
          createdAt: new Date().toISOString(),
        };

        saveProfile(profileData);
        setMessage(mode === 'login' ? 'Logged in successfully.' : 'Profile created successfully.');
        onClose();
        setIsSubmitting(false);
        return;
      }

      if (method === 'phone') {
        if (!trimmedPhone || !trimmedOtp) {
          setMessage('Please enter phone and OTP.');
          setIsSubmitting(false);
          return;
        }

        if (mode === 'create' && (!fullName || !contactNumber || !petName || !petCategory)) {
          setMessage('Please fill all profile details.');
          setIsSubmitting(false);
          return;
        }

        const profileData = {
          method: 'phone',
          phone: trimmedPhone,
          name: fullName,
          contact: contactNumber,
          petName,
          petCategory,
          createdAt: new Date().toISOString(),
        };

        saveProfile(profileData);
        setMessage(mode === 'login' ? 'Logged in successfully.' : 'Profile created successfully.');
        onClose();
        setIsSubmitting(false);
        return;
      }

      setMessage('Invalid login method.');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close login popup">×</button>

        <div className={styles.panel}>
          <div className={styles.brandBlock}>
            <div className={styles.logoWrap}>
              <Image src="/logo.png" alt="Tobby & Yuki" width={84} height={84} />
              <div>
                <div className={styles.brandLabel}>Tobby & Yuki</div>
                <p className={styles.subBrand}>Premium checkout experience</p>
              </div>
            </div>
            <h2>Save shopping details for faster checkout.</h2>
            <p>Sign in once and store your address, payment preferences, and order history for seamless shopping.</p>
          </div>
          <div className={styles.features}>
            <div>
              <strong>Quick checkout</strong>
              <p>Auto-fill your profile and speed through orders.</p>
            </div>
            <div>
              <strong>Secure profile</strong>
              <p>Your email, phone, and saved details stay protected.</p>
            </div>
            <div>
              <strong>Premium experience</strong>
              <p>Designed to match the look and feel of your adventure brand.</p>
            </div>
          </div>
        </div>

        <div className={styles.formWrap}>
          <div className={styles.headerRow}>
            <div>
              <p className={styles.overline}>Welcome Back</p>
              <h3>{primaryText}</h3>
            </div>
            <div className={styles.modeSwitch}>
              <button type="button" className={mode === 'login' ? styles.activeMode : ''} onClick={() => setMode('login')}>Login</button>
              <button type="button" className={mode === 'create' ? styles.activeMode : ''} onClick={() => setMode('create')}>Create</button>
            </div>
          </div>

          <div className={styles.methodRow}>
            {methods.map(m => (
              <button
                key={m.key}
                type="button"
                className={method === m.key ? styles.methodActive : ''}
                onClick={() => setMethod(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {method === 'google' ? (
              <button type="submit" className={`btn-cta ${styles.googleBtn}`}>
                Continue with Google
              </button>
            ) : null}

            {method === 'email' ? (
              <>
                <label className={styles.field}>
                  Email Address
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
                </label>
                <label className={styles.field}>
                  Password
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter password" required />
                </label>
                {mode === 'create' ? (
                  <>
                    <label className={styles.field}>
                      Full Name
                      <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="Your full name" required />
                    </label>
                    <label className={styles.field}>
                      Contact Number
                      <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} type="tel" placeholder="+91 98765 43210" required />
                    </label>
                    <label className={styles.field}>
                      Pet Name
                      <input value={petName} onChange={e => setPetName(e.target.value)} type="text" placeholder="Your pet's name" required />
                    </label>
                    <label className={styles.field}>
                      Pet Category
                      <select value={petCategory} onChange={e => setPetCategory(e.target.value)}>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                      </select>
                    </label>
                  </>
                ) : null}
              </>
            ) : null}

            {method === 'phone' ? (
              <>
                <label className={styles.field}>
                  Phone Number
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+91 98765 43210" required />
                </label>
                <label className={styles.field}>
                  OTP
                  <input value={otp} onChange={e => setOtp(e.target.value)} type="text" placeholder="Enter OTP" required />
                </label>
                {mode === 'create' ? (
                  <>
                    <label className={styles.field}>
                      Full Name
                      <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="Your full name" required />
                    </label>
                    <label className={styles.field}>
                      Contact Number
                      <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} type="tel" placeholder="+91 98765 43210" required />
                    </label>
                    <label className={styles.field}>
                      Pet Name
                      <input value={petName} onChange={e => setPetName(e.target.value)} type="text" placeholder="Your pet's name" required />
                    </label>
                    <label className={styles.field}>
                      Pet Category
                      <select value={petCategory} onChange={e => setPetCategory(e.target.value)}>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                      </select>
                    </label>
                  </>
                ) : null}
              </>
            ) : null}

            <div className={styles.ctaRow}>
              <button type="submit" className="btn-cta" disabled={isSubmitting}>
                {isSubmitting ? 'Working...' : mode === 'login' ? 'Continue' : 'Create Account'}
              </button>
              <button type="button" className="btn-outline" onClick={onClose}>Maybe later</button>
            </div>
          </form>

          {message ? <div className={styles.statusMessage}>{message}</div> : null}
          <p className={styles.footerText}>By continuing, you agree to our privacy policy and enjoy faster checkout on your next order.</p>
        </div>
      </div>
    </div>
  );
}
