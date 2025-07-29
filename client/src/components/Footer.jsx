import React from "react";
import { FaFacebook, FaInstagram, FaRegCommentAlt, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <section className="bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
          <div className="max-w-xl">
            <h2 className="font-semibold text-lg leading-6 mb-3">
              Sign Up &amp; Subscribe To Our Newsletter
            </h2>
            <p className="text-sm leading-5 font-normal max-w-[350px]">
              Subscribe to our latest newsletter to get news about special
              discounts &amp; upcoming sales
            </p>
            <form
              className="mt-5 flex max-w-md gap-3"
              onsubmit="event.preventDefault()"
            >
              <input
                className="rounded-md px-4 py-2 text-black bg-white text-sm w-full  focus:outline-none"
                placeholder="Email"
                required=""
                type="email"
              />
              <button
                className="bg-white text-black font-semibold text-xs uppercase rounded-md px-5 py-2 hover:bg-gray-200 transition"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-gray-700 text-sm">
          <div>
            <h3 className="font-semibold mb-4 text-black text-sm">
              Contact Us
            </h3>
            <p className="mb-1">Shopstic Mega Store</p>
            <p className="mb-1">507-Union Trade Ipsum Doler</p>
            <p className="mb-4">Centre France</p>
            <p className="mb-4">hello@blocks.com</p>
            <p className="text-[#dd3441] font-semibold mb-4 text-base">
              +81 520-150-001
            </p>
            <div className="flex items-center gap-2 text-black font-semibold text-sm cursor-pointer select-none max-w-max">
              <FaRegCommentAlt className="text-[#dd3441] text-lg border border-[#dd3441] rounded-sm p-[2px]" />
              <div>
                <p>Online Chat</p>
                <p>Get Expert Help</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
              <li>Policy for Buyers</li>
              <li>Policy for Sellers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black text-sm">
              Information
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>Size Chart</li>
              <li>Contact</li>
              <li>About Us</li>
              <li>FAQs</li>
              <li>Shipping &amp; Refund</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black text-sm">
              Your Account
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>Search</li>
              <li>About Us</li>
              <li>Delivery Information</li>
              <li>Contact</li>
              <li>FAQs</li>
              <li>Shipping</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black text-sm">
              Find Product
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>Furniture</li>
              <li>Kids Clothes</li>
              <li>Men’s Clothes</li>
              <li>Electronic</li>
              <li>Sunglasses</li>
              <li>Instruments</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 text-gray-600 text-xs">
          <div className="flex gap-4 mb-4 sm:mb-0">
            <a
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              href="#"
            >
              <FaFacebook />
            </a>
            <a
              aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              href="#"
            >
              <FaInstagram />
            </a>
            <a
              aria-label="YouTube"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              href="#"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="text-center sm:text-left">
            © 2025, Shopstic Store Powered by Shopify
          </p>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <img
              alt="Visa credit card logo"
              className="h-5 object-contain"
              height="20"
              src="https://storage.googleapis.com/a1aa/image/acefd62b-f8f6-4e61-964f-1d996bccac72.jpg"
              width="40"
            />
            <img
              alt="Mastercard credit card logo"
              className="h-5 object-contain"
              height="20"
              src="https://storage.googleapis.com/a1aa/image/3ec08793-68d9-47fb-703e-0d9fedc76e83.jpg"
              width="40"
            />
            <img
              alt="American Express credit card logo"
              className="h-5 object-contain"
              height="20"
              src="https://storage.googleapis.com/a1aa/image/dbdcbbf7-909c-48fe-0836-ae9ee0492845.jpg"
              width="40"
            />
            <img
              alt="PayPal payment logo"
              className="h-5 object-contain"
              height="20"
              src="https://storage.googleapis.com/a1aa/image/a1283643-d022-4d59-b751-4e2399f987d0.jpg"
              width="40"
            />
            <img
              alt="Discover credit card logo"
              className="h-5 object-contain"
              height="20"
              src="https://storage.googleapis.com/a1aa/image/70fa5a5f-a360-4f96-bfe5-3fbbccf82435.jpg"
              width="40"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
