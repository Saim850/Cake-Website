import { User, Mail, Phone, ShoppingBag, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState([])
  const [orders, setOrder] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try{
        const [userData, orderData] = await Promise.all([ 
          api.get('auth/users/me/'),
          api.get('order/')
        ])
        setUser(userData.data)
        setOrder(orderData.data)

      }catch(error){
        console.log(error)
      }
    } 
    fetchData();
  }, [])

  return (
    <section className="min-h-screen bg-pink-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-28 h-28 mx-auto bg-pink-100 rounded-full flex items-center justify-center">
              <User size={50} className="text-pink-600" />
            </div>

            <h2 className="text-2xl font-bold mt-4">
              {user.full_name}
            </h2>

            <p className="text-gray-500">{user.email}</p>

            <button to="/edit-profile/" className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700">
              <Link to="/edit-profile/">Edit Profile</Link>
            </button>

            <button
              className="mt-3 w-full border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/login";
              }}
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

          {/* User Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-5">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-pink-600" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-pink-600" />
                  <span>{user.phone_number}</span>
                </div>

              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-5">
                Account Summary
              </h3>

              <div className="flex items-center gap-4">
                <ShoppingBag
                  size={40}
                  className="text-pink-600"
                />
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <h4 className="text-2xl font-bold">
                    {orders.length}
                  </h4>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-5">
                Recent Orders
              </h3>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <h4 className="text-xl font-bold mt-4">
                        {order.id}
                      </h4>
                    </div>

                    <div className="">
                      <p className="font-bold mt-4">Time: {order.ordered_at.split("T")[0]}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ৳{order.total_price}
                      </p>

                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : order.status === "delivered"
                            ? "bg-yellow-100 text-yellow-600"
                            :order.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;