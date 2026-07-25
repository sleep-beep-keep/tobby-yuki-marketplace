import { CartProvider } from '@/context/CartContext';
import { ProfileProvider } from '@/context/ProfileContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'Tobby & Yuki — Built for Adventure',
  description: "India's premium pet lifestyle brand. Gear crafted for India's terrain, weather, and the dogs and cats who own the streets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ProfileProvider>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
