import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import api from "../api";

const SignupPage = () => {
  const[isLoding, setLoding] = useState(false);
  const[error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name:"",
    email: "",
    phone_number:"",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError("");

    setLoding(true);
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      await api.post(
        "sing-up/",
        formData
      );

      navigate("/login");
    } catch (err) {
      console.log(err.response?.data)
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
    finally{
      setLoding(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec"
            alt="Cake"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600">
              Sweet Cakes 🍰
            </h1>
            <p className="text-gray-500 mt-2">
              Create your account
            </p>
          </div>

          {/* full name  */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* email address  */}
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

            {/* phone number  */}
            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;