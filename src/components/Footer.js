import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.logo}>Tobby <span>&</span> Yuki</div>
          <p className={styles.tagline}>Built for adventure. Designed for comfort. Made for India's boldest pets and the humans who love them.</p>
        </div>
        <div className={styles.col}><h5>Shop</h5><Link href="/products?pet=dogs">Dogs</Link><Link href="/products?pet=cats">Cats</Link><Link href="/products">Collections</Link></div>
        <div className={styles.col}><h5>Help</h5><a>Sizing Guide</a><a>Shipping Policy</a><a>Returns</a><a>Contact Us</a></div>
        <div className={styles.col}><h5>Company</h5><a>About Us</a><a>Blog</a><a>Wholesale</a><a>Careers</a></div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Tobby & Yuki. All rights reserved.</span>
        <div className={styles.social}>
          <button>f</button><button>𝕏</button><button>▶</button>
        </div>
      </div>
    </footer>
  );
}
