'use client';
import styles from './ProfileModal.module.css';

export default function ProfileModal({ profile, onClose, onLogout }) {
  if (!profile) return null;

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close profile modal">×</button>
        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>{profile.name ? profile.name.charAt(0).toUpperCase() : 'P'}</div>
          <div>
            <h3>{profile.name || 'Tobby & Yuki Shopper'}</h3>
            <p>{profile.email || profile.phone || 'Guest User'}</p>
            <span className={styles.profileTag}>{profile.petCategory ? profile.petCategory.toUpperCase() : 'PET'}</span>
          </div>
        </div>
        <div className={styles.profileDetails}>
          <div><strong>Contact</strong><p>{profile.contact || 'Not set'}</p></div>
          <div><strong>Pet Name</strong><p>{profile.petName || 'Not set'}</p></div>
          <div><strong>Pet Category</strong><p>{profile.petCategory || 'Not set'}</p></div>
          <div><strong>Saved With</strong><p>{profile.method === 'google' ? 'Google' : profile.method === 'phone' ? 'Phone' : 'Email'}</p></div>
        </div>
        <div className={styles.actions}>
          <button className="btn-ghost" onClick={onClose}>Close</button>
          <button className="btn-cta" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
