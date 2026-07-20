// import { Handbag, ShoppingCart, Users, Tag, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import api from "../../api"
import { Clock, HandCoins, ListOrdered, Package } from "lucide-react"
export default function AdminLayout() {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrder, setPendingOrder] = useState(0);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async() => {
      try{
        const[orders, product] = await Promise.all([
          api.get('order/'),
          api.get('product/'),
        ])
        setTotalOrder(orders.data.length);
        setTotalProduct(product.data.count);

        orders.data.map((val) =>{
          if(val.status === "completed"){
            setTotalRevenue(totalRevenue+val.total_price);
          }
          if(val.status === "pending"){
            setPendingOrder(pendingOrder+1)
          }
        })
        // console.log(orders)

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
    <section className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-50 bg-pink-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Cake Admin</h2>

        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/admin/orders/">Orders</Link> 
          </li>

          <li>
            <Link to="/admin/products/">Products</Link>
          </li>

          <li>
            <Link to="/admin/customers/">Customers</Link>
          </li>

          <li>
            <Link to="/admin/category">Category</Link>
          </li>

          <li>
            <Link to="../../edit-profile">Edit Profile</Link>
          </li>

          <li>
            <button onClick={() => {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");

              window.location.href = "/login";
            }}>
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-pink-50">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <div className="bg-blue-100 text-blue-500 p-2 rounded-md">
              <ListOrdered size={40}/>
            </div>
            <div className="">
              <h3>Total Orders</h3>
              <p className="text-2xl font-bold">{totalOrder}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <div className="bg-green-100 text-green-500 p-2 rounded-md">
              <Package size={40}/>
            </div>
            <div className="">
              <h3>Total Products</h3>
              <p className="text-2xl font-bold">{totalProduct}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-500 p-2 rounded-md">
              <HandCoins size={40}/>
            </div>
            <div className="">
              <h3>Revenue</h3>
              <p className="text-2xl font-bold">৳{totalRevenue}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <div className="bg-red-100 text-red-500 p-2 rounded-md">
              <Clock size={40}/>
            </div>
            <div className="">
              <h3>Pending Orders</h3>
              <p className="text-2xl font-bold">{pendingOrder}</p>
            </div>
          </div>
        </div>

        <Outlet />

      </main>
    </section>
  )
}
