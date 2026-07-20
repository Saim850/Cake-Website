import { useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api";

export default function LoginNavber() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('cart/')
        if(res.data.length !== 0){
          setCount(res.data[0].items.length)
        }

      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

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
              to="/cakes"
              className="font-medium hover:text-pink-600 transition"
            >
              Cakes
            </Link>

            <Link
              to="/about"
              className="font-medium hover:text-pink-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="font-medium hover:text-pink-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Cart and Profile Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:bg-pink-50 rounded-full">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            </Link>

            <Link to="/profile-page" className="p-2 hover:bg-pink-50 rounded-full">
              <User size={22} />
            </Link>
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
                to="/cakes"
                className="hover:text-pink-600"
              >
                Cakes
              </Link>

              <Link
                to="/about"
                className="hover:text-pink-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-pink-600"
              >
                Contact
              </Link> 

              <button className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <Link to='/cart'>Cart</Link>
              </button>

              <button className="flex items-center gap-2">
                <User size={20} />
                <Link to='/profile-page'>Account</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}