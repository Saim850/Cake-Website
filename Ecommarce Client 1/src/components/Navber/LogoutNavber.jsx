import { useState } from "react";
import { Menu, X} from "lucide-react";
import { Link } from "react-router-dom";

export default function LogoutNavber() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🎂</span>
            <h1 className="text-2xl font-bold text-pink-600">
              SweetCake
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-medium hover:text-pink-600 transition"
            >
              Home
            </Link>

            <Link
              to="/cakes/"
              className="font-medium hover:text-pink-600 transition"
            >
              Cakes
            </Link>

            <Link
              to="/about/"
              className="font-medium hover:text-pink-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact/"
              className="font-medium hover:text-pink-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Cart and Profile Icons */}
          <div className="hidden md:flex items-center gap-4">
              <Link to="/login/" className="bg-pink-600 text-white font-bold px-4 py-2 rounded-md">Log In</Link>
              <Link to="/sing-up/" className="bg-pink-600 text-white font-bold px-4 py-2 rounded-md">Sing Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="hover:text-pink-600"
              >
                Home
              </Link>

              <Link
                to="/cakes/"
                className="hover:text-pink-600"
              >
                Cakes
              </Link>

              <Link
                to="/about/"
                className="hover:text-pink-600"
              >
                About
              </Link>

              <Link
                to="/contact/"
                className="hover:text-pink-600"
              >
                Contact
              </Link> 

              <Link to="/login/" className="bg-pink-600 text-white font-bold px-4 py-2 rounded-md">Log In</Link>
              <Link to="/sing-up/" className="bg-pink-600 text-white font-bold px-4 py-2 rounded-md">Sing Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}