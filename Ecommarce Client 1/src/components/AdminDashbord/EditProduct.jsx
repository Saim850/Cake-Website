import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";

export default function EditProduct() {
  const { id } = useParams();
  const[category, setCategory] = useState([]);
  const[currentImage, setCurrentImage]  = useState("");
  const[formData, setFormData] = useState({
    image:null,
    name:"",
    category:"",
    category_name:"",
    price:"",

  })
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        const [res1, res2] = await Promise.all([
           api.get(`product/${id}/`),
           api.get(`category/`),
        ])
        setCategory(res2.data);
        setFormData({
          name:res1.data.name,
          image:null,
          category:res1.data.category,
          category_name:res1.data.category_name,
          price:res1.data.price
        })
        setCurrentImage(res1.data.image)

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    fetchData();  
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
      console.log(files[0])
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.patch(`product/${id}/`, data );

      alert("Product information updated successfully");
      
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      {/* Image */}
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Product Image
            </label>

            <img
                src={currentImage || null}
                alt="Cake"
                className="w-48 h-48 object-cover rounded-lg border mb-4"
            />

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="file-input file-input-secondary"
            />
        </div>

        {/* Name */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Product Name
            </label>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
            />
        </div>

        {/* Category */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Category
            </label>

            <select onChange={handleChange} name="category" value={formData.category} className="w-full border rounded-lg px-4 py-3">
              {category.map((val) => (
                  <option key={val.id} value={val.id}>{val.name}</option>
              ))}
            </select>
        </div>

        {/* Price */}
        <div className="mb-8">
            <label className="block mb-2 font-medium">
                Price
            </label>

            <input
                type="number"
                onChange={handleChange}
                name="price"
                value={formData.price}
                className="w-full border rounded-lg px-4 py-3"
            />
        </div>

        <div className="flex justify-end gap-4">
            <button onClick={() => window.location.reload()} className="px-6 py-3 border rounded-lg">
                Cancel
            </button>

            <button type="submit" className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  )
}
