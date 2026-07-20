import { useEffect, useState } from "react"
import api from "../../api";

export default function AdminCustomers() {
  const[customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('auth/users/');
        setCustomers(res.data);
        
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async(id) =>{
    if(confirm(`Are you sure ?`)){
      try{
        api.delete(`admin/users/${id}/`);
        window.location.reload();
      }catch(error){
        console.log(error);
        alert("Somthing went worng!!");
      }
    }
  }

  return (
    <div className={`bg-white rounded shadow p-4`}>
      <h2 className="text-xl font-bold mb-4">Products</h2>
        <table className="w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="pb-3">ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Phone Number</th>
              <th className="pb-3">Total Ordered</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((val) => (
              <tr key={val.id} className="bg-gray-100">
                <td className="py-2">{val.id}</td>
                <td className="py-2">{val.full_name}</td>
                <td className="py-2">{val.email}</td>
                <td className="py-2">{val.phone_number}</td>
                <td className="py-2">10</td>
                <td className="py-2">
                  <button onClick={() => handleDelete(val.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ) )}
          </tbody>

        </table>
    </div>
  )
}
