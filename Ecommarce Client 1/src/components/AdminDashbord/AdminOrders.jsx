import { useEffect, useState } from "react"
import api from '../../api'
import { useNavigate } from "react-router-dom"

export default function AdminOrders() {
  const[orders, setOrders] = useState([])
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('all-orders/');
        setOrders(res.data)
        
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

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
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
        <table className="w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="pb-3">ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Total Price</th>
              <th className="pb-3">Ordered At</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          {orders.map((val) => (
            <tbody key={val.id}>
              <tr className="bg-gray-100">
                <td className="py-2">{val.id}</td>
                <td className="py-2">{val.user.full_name}</td>
                <td className="py-2">{val.total_price}</td>
                <td className="py-2">{val.ordered_at.split("T")[0]}</td>  
                <td className={`py-2 w-30 ${
                  val.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : val.status === "delivered"
                  ? "bg-blue-100 text-blue-600"
                  :val.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                  }`}>{val.status}</td>

                <td className="py-2">
                  <button onClick={() => {navigate(`../order/${val.id}/`)}} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Details
                  </button>
                </td>

              </tr>
            </tbody>
          ))}

        </table>
    </div>
  )
}
