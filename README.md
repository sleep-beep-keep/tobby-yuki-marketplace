# Tobby & Yuki — Next.js Website

Premium pet lifestyle e-commerce site built with Next.js 14 App Router.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# Open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

## Deploy to Vercel (free, fastest path)

1. Push this folder to a GitHub repo
2. Go to vercel.com → "Add New Project"
3. Import the GitHub repo
4. Click Deploy — done. Vercel auto-detects Next.js.

## Add Razorpay Payments

1. Sign up at razorpay.com → get your Key ID
2. Create `.env.local` in the project root:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
   ```
3. In `src/app/payment/page.js`, replace the "Place Order" button handler with:
   ```js
   const loadRazorpay = () => {
     const options = {
       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
       amount: total * 100, // in paise
       currency: 'INR',
       name: 'Tobby & Yuki',
       description: 'Pet Gear Order',
       handler: (response) => {
         router.push('/confirmation');
       },
     };
     const rzp = new window.Razorpay(options);
     rzp.open();
   };
   ```
4. Add Razorpay script to `src/app/layout.js`:
   ```jsx
   <Script src="https://checkout.razorpay.com/v1/checkout.js" />
   ```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.js           # Home
│   ├── products/         # Product listing
│   ├── cart/             # Step 1: Cart review
│   ├── checkout/         # Step 2: Shipping details
│   ├── payment/          # Step 3: Payment
│   └── confirmation/     # Order confirmed
├── components/           # Reusable UI components
│   ├── Nav.js
│   ├── Footer.js
│   ├── ProductCard.js
│   ├── ProductModal.js
│   ├── OrderSummary.js
│   └── CheckoutBar.js
├── context/
│   └── CartContext.js    # Global cart state
├── data/
│   └── products.js       # Product catalogue
└── styles/
    └── globals.css       # CSS variables + base styles
public/
└── images/               # All 17 Tobby & Yuki product photos
```
