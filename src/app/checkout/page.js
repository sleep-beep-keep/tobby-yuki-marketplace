'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrderSummary from '@/components/OrderSummary';
import styles from './page.module.css';
import { ChevronRight } from 'lucide-react';

const DELIVERY_OPTS = [
  { id: 'standard', label: 'Standard Delivery', sub: '4–6 business days', price: 89 },
  { id: 'express', label: 'Express Delivery', sub: '2 business days', price: 199 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [delivery, setDelivery] = useState(DELIVERY_OPTS[0].id);
  const selectedDelivery = DELIVERY_OPTS.find(opt => opt.id === delivery);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>Tobby & Yuki</Link>
          <nav className={styles.breadcrumb}>
            <Link href="/cart">Cart</Link>
            <ChevronRight size={16} />
            <span className={styles.active}>Information</span>
            <ChevronRight size={16} />
            <span>Payment</span>
          </nav>
        </div>
        
        <form className={styles.form}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <input type="email" placeholder="Email" className={styles.input} />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.grid}>
              <input type="text" placeholder="First name" className={styles.input} />
              <input type="text" placeholder="Last name" className={styles.input} />
            </div>
            <input type="text" placeholder="Address" className={styles.input} />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" className={styles.input} />
            <div className={styles.grid}>
              <input type="text" placeholder="City" className={styles.input} />
              <select className={styles.input}>
                <option>Maharashtra</option><option>Delhi</option><option>Karnataka</option>
              </select>
              <input type="text" placeholder="PIN code" className={styles.input} />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping method</h2>
            <div className={styles.shippingOptions}>
              {DELIVERY_OPTS.map((opt) => (
                <label key={opt.id} className={`${styles.shippingOption} ${delivery === opt.id ? styles.selected : ''}`}>
                  <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={(e) => setDelivery(e.target.value)} />
                  <div className={styles.optionDetails}>
                    <span>{opt.label}</span>
                    <small>{opt.sub}</small>
                  </div>
                  <span className={styles.optionPrice}>₹{opt.price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/cart" className={styles.backLink}>&lt; Return to cart</Link>
            <button type="button" className="btn-primary" onClick={() => router.push('/payment')}>Continue to Payment</button>
          </div>
        </form>
      </div>
      <div className={styles.sidebar}>
        <OrderSummary shipping={selectedDelivery?.price || 0} />
      </div>
    </div>
  );
}
              </div>
              <div className={styles.formGroup}><label>PIN Code</label><input type="text" placeholder="411001" maxLength={6}/></div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockTitle}>Delivery Option</div>
            <div className={styles.deliveryOpts}>
              {DELIVERY_OPTS.map((opt, i) => (
                <div key={i} className={`${styles.deliveryOpt} ${delivery===i ? styles.selected : ''}`} onClick={() => setDelivery(i)}>
                  <input type="radio" name="delivery" checked={delivery===i} readOnly/>
                  <div className={styles.optBody}><div className={styles.optLabel}>{opt.label}</div><div className={styles.optSub}>{opt.sub}</div></div>
                  <div className={styles.optPrice}>₹{opt.price}</div>
                </div>
              ))}
            </div>
          </div>

          <button className={`btn-cta ${styles.continueBtn}`} onClick={() => router.push('/payment')}>Continue to Payment →</button>
        </div>
        <OrderSummary shipping={DELIVERY_OPTS[delivery].price} />
      </div>
    </>
  );
}
