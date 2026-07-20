import { useEffect, useState } from "react"
import api from "../../api";
import { Link } from "react-router-dom";

export default function AdminProduct() {
  const[order, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('product/');
        setOrder(res.data.results);
        
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();  
  }, [])

  const handleDelete = async(id) =>{
    if(confirm(`Are you sure?`)){
      try{
        api.delete(`product/${id}/`);
        window.location.reload();
      }catch(error){
        console.log(error);
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
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <button className="bg-green-500 text-white rounded-md font-bold h-9 px-3 flex items-center"><Link to="../add-product/">Add</Link> <span className="ml-1 text-xl mb-0.5">+</span></button>
      </div>
        <table className="w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="pb-3">ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {order.map((val) => (
              <tr key={val.id} className="bg-gray-100">
                <td className="py-2">{val.id}</td>
                <td className="py-2">{val.name}</td>
                <td className="py-2">৳{val.price}</td>
                <td className="py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    <Link to ={`../edit-product/${val.id}/`}>Edit</Link>
                  </button>

                  <button onClick={() => handleDelete(val.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
