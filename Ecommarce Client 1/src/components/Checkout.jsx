import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    shipping_address: null,
    payment_method: "cash_on_delivery",
    notes:"",
    cart:{},
  });
  const[isLoading, setLoading] = useState(true);

  const[shippingAddress, setShippingAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          api.get("cart/"),
          api.get("shipping-address/"),
        ]);

        setFormData(prev => ({
          ...prev,
          cart: res1.data[0],
        }));
        setShippingAddress(res2.data);

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const deliveryCharge = 100;

  const total = (formData.cart?.total_price || 0) + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "shipping_address"
          ? Number(value)
          : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.cart.items.length === 0){
      alert("Cart is empty")
      return;
    }
    try {
      const res = await api.post("order/", {
        cart: formData.cart.id,
        shipping_address: formData.shipping_address,
        payment_method: formData.payment_method,
        notes: formData.notes,
      });

      console.log(res.data);
      alert("Order place successfully.")
      
    } catch (error) {
      console.log(error.response.data);
      alert("Somthing went worng!!")

    }
  };

  const handleDelete = async(id) => {
    try{
      api.delete(`shipping-address/${id}/`)
      window.location.reload()
    }catch(error){
      console.log(error)
    }
  } 
  
  if(isLoading){
    return(
      <div className="h-screen">
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Shipping Form */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white shadow rounded-xl p-6 space-y-5"
        >

          <h2 className="text-xl font-semibold">
            Shipping Information
          </h2>

          <div>
            <div className="flex justify-between items-center mb-3">
              <lable className="block mb-2 font-medium text-gray-700">
                Select Shipping Address
              </lable>

              <Link 
                to="/shipping-address" 
                className="bg-pink-600 text-white font-medium px-8 py-1 rounded-md hover:bg-pink-700 transition ease-in-out duration-200"
              >
                Add Shipping Address +
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shippingAddress.map((address) => (
                <label
                  key={address.id}
                  className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition"
                >
                  <div className="flex justify-between">
                    <input
                      type="radio"
                      name="shipping_address"
                      value={address.id}
                      className="mr-2"
                      onChange={handleChange}
                    />

                    <button onClick={() => handleDelete(address.id)}><Trash2 className="text-red-500" /></button>
                  </div>

                  <div className="mt-2">
                    <p>
                      <span className="font-semibold">Name:</span> {address.full_name}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {address.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {address.full_address}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="">
            <lable className="block mb-2 font-medium text-gray-700">
              Notes
            </lable>
            <textarea onChange={handleChange} name="notes" id="" rows={2} className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-none focus:ring-pink-500"></textarea>
          </div>
          
          <div>
            <h2 className="font-semibold mb-2">
              Payment Method
            </h2>

            <label className="flex gap-2">
              <input
                type="radio"
                name="payment_method"
                value="Cash"
                checked={
                  formData.payment_method ===
                  "Cash"
                }
                onChange={handleChange}
              />

              Cash on Delivery
            </label>
          </div>

          <button
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition ease-in-out duration-200"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}

        <div className="bg-white min-w-md shadow rounded-xl p-6 h-fit">

          <h2 className="text-xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{formData.cart.total_price}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{total}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}