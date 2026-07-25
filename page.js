'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import styles from './page.module.css';

export default function CartPage() {
  const { cart, itemCount, total, updateQuantity, removeFromCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Cart</h1>
        <Link href="/products" className={styles.continueShopping}>Continue Shopping</Link>
      </div>
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          <div className={styles.itemsHeader}>
            <span>Product</span>
            <span className={styles.headerCenter}>Quantity</span>
            <span className={styles.headerRight}>Total</span>
          </div>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemImage}>
                  <Image src={item.img} alt={item.name} width={80} height={80} style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <div className={styles.itemQuantity}>
                <div className={styles.quantitySelector}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <div className={styles.itemTotal}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className={styles.promoCode}>
            <input type="text" placeholder="Discount code" />
            <button>Apply</button>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <p className={styles.summaryNote}>Taxes and shipping calculated at checkout</p>
          <Link href="/checkout" className={styles.checkoutButton}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}