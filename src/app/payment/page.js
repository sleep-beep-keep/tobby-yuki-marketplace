'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutBar from '@/components/CheckoutBar';
import OrderSummary from '@/components/OrderSummary';
import styles from './page.module.css';

const METHODS = [
  { id:'card', icon:'💳', label:'Credit / Debit Card', sub:'Visa, Mastercard, RuPay accepted' },
  { id:'upi',  icon:'📱', label:'UPI', sub:'GPay, PhonePe, Paytm, any UPI app' },
  { id:'emi',  icon:'🏦', label:'EMI / Net Banking', sub:'0% EMI on orders above ₹2,000' },
  { id:'cod',  icon:'💵', label:'Cash on Delivery', sub:'₹30 COD fee · Available for orders under ₹5,000' },
];

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState('card');

  return (
    <>
      <CheckoutBar current={3} />
      <div className={styles.body}>
        <div>
          <h2 className={styles.heading}>Payment</h2>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Choose Payment Method</div>
            <div className={styles.methods}>
              {METHODS.map(m => (
                <div key={m.id} className={`${styles.method} ${method===m.id ? styles.selected : ''}`} onClick={() => setMethod(m.id)}>
                  <input type="radio" name="pay" checked={method===m.id} readOnly/>
                  <div className={styles.methodIcon}>{m.icon}</div>
                  <div><div className={styles.methodLabel}>{m.label}</div><div className={styles.methodSub}>{m.sub}</div></div>
                </div>
              ))}
            </div>

            {method === 'card' && (
              <div className={styles.cardFields}>
                <div className={`${styles.formGroup} ${styles.full}`}><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxLength={19}/></div>
                <div className={`${styles.formGroup} ${styles.full}`}><label>Name on Card</label><input type="text" placeholder="Rahul Sharma"/></div>
                <div className={styles.formGroup}><label>Expiry</label><input type="text" placeholder="MM / YY" maxLength={7}/></div>
                <div className={styles.formGroup}><label>CVV</label><input type="password" placeholder="•••" maxLength={4}/></div>
              </div>
            )}

            {method === 'upi' && (
              <div className={styles.upiField}>
                <div className={styles.formGroup}><label>UPI ID</label><input type="text" placeholder="yourname@upi"/></div>
              </div>
            )}
          </div>

          <div className={styles.secureNote}>
            <span style={{fontSize:22}}>🔒</span>
            <span><strong>100% Secure Checkout.</strong> Your payment details are encrypted and never stored on our servers.</span>
          </div>

          <button className={`btn-cta ${styles.placeBtn}`} onClick={() => router.push('/confirmation')}>Place Order →</button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
