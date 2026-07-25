import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <div className={styles.container}>
        <span>Free Shipping on All Orders</span>
        <span className={styles.divider}>·</span>
        <span>Get 10% Off Your First Purchase! Use Code: NEWPET</span>
      </div>
    </div>
  );
}