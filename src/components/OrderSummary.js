import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './OrderSummary.module.css';

export default function OrderSummary({ shipping = 89 }) {
  const { cart, subtotal } = useCart();
  const total = subtotal + (subtotal >= 999 ? 0 : shipping);
  return (
    <div className={styles.box}>
      <div className={styles.title}>Order Summary</div>
      <div className={styles.items}>
        {cart.map(item => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemImg}>
              <Image src={item.img} alt={item.name} fill style={{ objectFit: 'contain' }} sizes="44px" />
            </div>
            <div>
              <div className={styles.itemName}>{item.name} × {item.qty}</div>
              <div className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.row}><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
      <div className={styles.row}>
        <span>Shipping</span>
        <span>{subtotal >= 999 ? <b style={{color:'var(--primary-mid)'}}>FREE</b> : `₹${shipping}`}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.total}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
      <p className={styles.secure}>🔒 SSL Secured · Free shipping above ₹999</p>
    </div>
  );
}
