import styles from './CheckoutSteps.module.css';

export default function CheckoutSteps({ current }) {
  const steps = ['Cart', 'Shipping', 'Payment'];
  return (
    <div className={styles.row}>
      {steps.map((label, i) => {
        const num = i + 1;
        const state = num < current ? 'done' : num === current ? 'active' : 'idle';
        return (
          <div key={label} className={styles.stepGroup}>
            <div className={`${styles.step} ${styles[state]}`}>
              <div className={styles.num}>{state === 'done' ? '✓' : num}</div>
              <span className={styles.label}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={styles.connector} />}
          </div>
        );
      })}
    </div>
  );
}
