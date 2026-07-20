import { useEffect, useState } from "react";
import api from "../../api";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });


  useEffect(() =>{
    const fetchData = async() =>{
      try{
        const res1 = await api.get('auth/users/me/')
        setFormData({
          ...formData, 
          full_name:res1.data.full_name,
          email:res1.data.email,
          phone_number:res1.data.phone_number,

        })
        
      }catch(error){
        console.log(error )

      }
    }
    fetchData();
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      api.put('auth/users/me/', formData),
      alert("Update profile successfully.")

    }catch(error){
      console.log(error.response.data);
      alert("Somthing went worng!!");

    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Enter phone number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => (window.location.reload())}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;