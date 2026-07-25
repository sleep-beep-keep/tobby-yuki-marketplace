import Link from 'next/link';
import CheckoutSteps from './CheckoutSteps';
import styles from './CheckoutBar.module.css';

export default function CheckoutBar({ current }) {
  return (
    <div className={styles.bar}>
      <Link href="/" className={styles.logo}>Tobby <span>&</span> Yuki</Link>
      <CheckoutSteps current={current} />
      <div />
    </div>
  );
}
