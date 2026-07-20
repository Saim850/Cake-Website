import { useEffect, useState } from "react";
import api from "../../api";

const AdminCategory = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);

  useEffect(() =>{
    const fetchData = async() =>{
      try{
        const res1 = await api.get('category/')
        setCategory(res1.data);
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const res = api.post('category/', {name})

      alert("Category add successfully.")

      setCategory([...category, res.data]);
      setName("");

    }catch(error){
      console.log(error.response?.data);
      alert("Somthing went worng!!");

    }
  };

  const handleDelete = async(id) => {
    try{
      await api.delete(`category/${id}/`) 
      setCategory((prev) => prev.filter((item) => item.id !== id));
      alert("Category delete successfully.")
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <label className="block mb-2 font-medium text-gray-700">
            Category
        </label>
        <div>
          <input
              type="text"
              name="category"
              placeholder="Category..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
              type="submit"
              className="bg-pink-600 p-3 ml-2 text-white rounded-lg hover:bg-pink-700 transition"
          >
              Add Category
          </button>
        </div>

      </form>

      <div className="bg-white rounded shadow p-4 mt-5">
        <table className="w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="pb-3">ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {category.map((val) => (
              <tr key={val.id} className="bg-gray-100">
                <td className="py-2">{val.id}</td>
                <td className="py-2">{val.name}</td>
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
    </div>
  );
};

export default AdminCategory;