'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CheckoutBar from '@/components/CheckoutBar';
import OrderSummary from '@/components/OrderSummary';
import styles from './page.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, subtotal } = useCart();
  const router = useRouter();

  if (cart.length === 0) return (
    <>
      <CheckoutBar current={1} />
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like your pup (or cat) is still window shopping.</p>
        <Link href="/products"><button className="btn-primary" style={{marginTop:24}}>Browse Products</button></Link>
      </div>
    </>
  );

  return (
    <>
      <CheckoutBar current={1} />
      <div className={styles.body}>
        <div>
          <h2 className={styles.heading}>Your Cart ({cart.reduce((s,i)=>s+i.qty,0)} items)</h2>
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemImg}>
                <Image src={item.img} alt={item.name} fill style={{objectFit:'cover'}} sizes="88px"/>
              </div>
              <div className={styles.itemBody}>
                <div className={styles.itemSub}>{item.sub}</div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemDesc}>{item.desc.slice(0,70)}…</div>
                <div className={styles.qtyRow}>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className={styles.qtyVal}>{item.qty}</span>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            </div>
          ))}
          <div className={styles.actions}>
            <Link href="/products"><button className="btn-outline">← Continue Shopping</button></Link>
            <button className="btn-cta" onClick={() => router.push('/checkout')}>Proceed to Checkout →</button>
          </div>
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
