import { Link } from "react-router-dom"
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value, 
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      const response = await api.post("/auth/jwt/create", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/");
      window.location.reload();
      alert("Login Successful!");

    } catch (error) {
      console.log(error.response?.data);
      alert("Invalid email or password");
    }finally{
      setLoding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
            alt="Cake"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600">
              Sweet Cakes 🍰
            </h1>
            <p className="text-gray-500 mt-2">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/reset-password"
                className="text-pink-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;