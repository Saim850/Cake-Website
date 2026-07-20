import { Phone, Cake, Mail, MapPin} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cake className="text-pink-500" />
            <h2 className="text-2xl font-bold text-white">
              SweetCake
            </h2>
          </div>

          <p className="text-sm leading-6">
            Freshly baked delicious cakes made with love. We deliver
            happiness to your doorstep for every celebration.
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-pink-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
            <li><Link to="/cakes" className="hover:text-pink-500">Cakes</Link></li>
            <li><Link to="/about" className="hover:text-pink-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1XXXXXXXXX
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> support@sweetcake.com
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Newsletter
          </h3>

          <p className="text-sm mb-4">
            Get updates on new cakes & offers.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500"
            />

            <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-sm">
        © {new Date().getFullYear()} SweetCake. All rights reserved.
      </div>
    </footer>
  );
}