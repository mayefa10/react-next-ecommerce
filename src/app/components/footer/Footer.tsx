import React from 'react';
import Container from '../Container';
import FooterList from './FooterList';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram,FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col justify-between md:flex-row pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop categories</h3>
            <Link href={'/'}>Phone</Link>
            <Link href={'/'}>Laptops</Link>
            <Link href={'/'}>Desktops</Link>
            <Link href={'/'}>Watches</Link>
            <Link href={'/'}>TVS</Link>
            <Link href={'/'}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href={'/'}>Contact Us</Link>
            <Link href={'/'}>Shipping policy</Link>
            <Link href={'/'}>Returns & Exchanges</Link>
            <Link href={'/'}>FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Everything you want in appliances and cutting-edge technology,
              with the best prices and the best quality standards. Our staff
              always prioritizes good treatment of our clients since the first
              thing is the customer service that you expect. Place your orders
            </p>
            <p className="">
              &copy;{new Date().getFullYear()}
              <span className="ml-2 font-semibold text-lg">
                Electronic Shop.
              </span>{' '}
              All rights reserved
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-3">
              <Link href={'/'}>
                <FaFacebook size={24} />
              </Link>
              <Link href={'/'}>
                <FaSquareXTwitter size={24} />
              </Link>
              <Link href={'/'}>
                <FaInstagram size={24} />
              </Link>
              <Link href={'/'}>
                <FaYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
