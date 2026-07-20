import { Trash2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const Cart = () => {
  const[cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('cart-items/')
        setCartItems(res.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async(id) =>{
    try{
      const res = await api.delete(`cart-items/${id}/`)
      console.log(res)
      window.location.reload()
    }catch(error){
      console.log(error)
    }
  }

  const handlePlusMinus = async(id, plus_or_minus) => {
    try{
      const {data} = await await api.get(`cart-items/${id}/`)

      if(plus_or_minus){
        const res = await api.put(`cart-items/${id}/`, {
          product: data.product,
          quantity: data.quantity+1,
        })
        console.log(res)
        window.location.reload()

      } else{
        if(data.quantity !== 1){
          const res = await api.put(`cart-items/${id}/`, {
            product: data.product,
            quantity: data.quantity-1,
          })
          console.log(res)
          window.location.reload()
        }
      }

    }catch(error){
      console.log(error)

    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      {cartItems.length === 0 ? (
        <h1 className="text-center font-bold text-3xl m-auto">Cart is empty</h1>
      ):(
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Shopping Cart
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4"
                >
                  <img
                    src={`http://127.0.0.1:8000/media/${item.image}`}
                    alt={item.name}
                    className="w-full max-h-70 md:w-40 md:h-40 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-pink-600 font-bold mt-2">
                      ৳{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button onClick={() => handlePlusMinus(item.id, false)} className="p-2 bg-gray-100 rounded">
                        <Minus size={16} />
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => handlePlusMinus(item.id, true)} className="p-2 bg-gray-100 rounded">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <p className="font-semibold">
                      ৳{item.price * item.quantity}
                    </p>

                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h3 className="text-2xl font-bold mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>৳{deliveryFee}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>৳{total}</span>
                </div>

                <button className="w-full bg-pink-600 text-white py-3 rounded-lg mt-4 hover:bg-pink-700 transition">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </button>

                <button className="w-full border border-pink-600 text-pink-600 py-3 rounded-lg">
                  <Link to="/cakes">Continue Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;