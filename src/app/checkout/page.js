'use client';
import styles from './page.module.css';

export default function WholesalePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., send the data to your backend or a service like Formspree.
    alert('Thank you for your inquiry! We will get back to you shortly.');
    e.target.reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Partner with Tobby & Yuki</h1>
        <p className={styles.subtitle}>
          Join our pack of trusted retailers and bring our premium, adventure-ready pet gear to your customers.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.benefits}>
          <h2>Why Partner With Us?</h2>
          <ul>
            <li>✓ High-quality, durable products tested in Indian conditions.</li>
            <li>✓ Strong brand recognition and a loyal customer base.</li>
            <li>✓ Attractive wholesale pricing and low minimum order quantities.</li>
            <li>✓ Marketing support and assets to help you sell.</li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Become a Stockist</h2>
          <p>Fill out the form below, and our partnership team will get in touch with you.</p>
          <div className={styles.formGrid}>
            <input type="text" placeholder="Business Name" required />
            <input type="text" placeholder="Contact Person" required />
          </div>
          <div className={styles.formGrid}>
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" required />
          </div>
          <input type="text" placeholder="Website or Store Location" required />
          <textarea placeholder="Tell us a bit about your business..." rows="4"></textarea>
          <button type="submit" className="btn-primary">Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
}