import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';
import CartProvider from '../../providers/CartProvider';
import { Toaster } from 'react-hot-toast';


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'ecommerce electronic',
  description: 'Ecommerce project using Next .js api with Node.js and mongodb',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          gutter={8}
          toastOptions={{
            
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
