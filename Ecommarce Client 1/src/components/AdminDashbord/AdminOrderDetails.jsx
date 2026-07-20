import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useNavigate } from 'react-router-dom';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`all-orders/${id}/`);
        setOrder(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  const handleUpdate = async(order_id) =>{
    try{
      await api.put(`all-orders/${order_id}/`,{status});
      window.location.reload()
    }catch(error){
      console.log(error);
      alert("Somthing went worng!!");
    }
  }

  const handleDelete = async(order_id) =>{
    if(confirm(`Are you sure ?`)){
      try{
        await api.delete(`all-orders/${order_id}/`);
        navigate('/admin/orders/')
      }catch(error){
        console.log(error.response?.data);
        alert("Somthing went worng!!");
      }
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500">
            Placed on {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <div>
          {edit ? (
            <div>
              <span onClick={() => handleUpdate(order.id)} className="px-4 py-2 mr-2 rounded-md text-white bg-green-500">Update</span>

              <select className="border-2 border-pink-500 rounded-md p-1 outline-none" onChange={handleChange} name="" id="">
                <option value={order.status}>{order.status}</option>
                <option value={"pending"}>{"pending"}</option>
                <option value={"paid"}>{"paid"}</option>
                <option value={"delivered"}>{"delivered"}</option>
                <option value={"completed"}>{"completed"}</option>
                <option value={"cancelled"}>{"cancelled"}</option>
              </select> 
            </div>
          ):(
            
            <div>
              <span onClick={() => setEdit(true)} className="px-4 py-2 mr-2 rounded-md text-white bg-green-500">Edit</span>
              <span
                className={`px-4 py-2 rounded-md text-white
                  ${
                    order.status === "pending"
                      ? "bg-yellow-500"
                      : order.status === "processing"
                      ? "bg-blue-500"
                      : order.status === "completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
              >
                {order.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Customer & Shipping */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Customer Information
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {order.user.full_name}
            </p>

            <p>
              <strong>Email:</strong> {order.user.email}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Shipping Address
          </h2>

          <div className="space-y-2">
            <p>{order.shipping_address.full_name}</p>

            <p>{order.shipping_address.phone}</p>

            <p>
              {order.shipping_address.full_address}
            </p>

            <p>
              {order.shipping_address.upazila.name},{" "}
              {order.shipping_address.district.name}
            </p>

            <p>
              {order.shipping_address.division.name}
            </p>

            <p>
              Postal Code:{" "}
              {order.shipping_address.postal_code}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow rounded-xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Order Items
          </h2>
        </div>

        <div className="divide-y">
          {order.orderitems_order.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6"
            >
              <div className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.product.name}
                  </h3>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-gray-500">
                    Price: ৳{item.price}
                  </p>
                </div>
              </div>

              <div className="font-bold text-lg">
                ৳{item.quantity * item.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>{order.payment_method}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{order.total_price}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>৳{100}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>- ৳{order.discount}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>৳{order.total_price+100}</span>
          </div>

          {order.notes && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p>{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-4 py-2 rounded-md font-bold">Delete</button>
      </div>

    </div>
  );
}