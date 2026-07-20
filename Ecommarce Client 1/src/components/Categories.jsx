import { Cake } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading]  = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get("category/")
        setCategories(res.data)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const handleCategoryClick = (categoryId) => {
    navigate(`/cakes?category=${categoryId}`);
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
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Browse Categories
      </h2>

      <div data-aos="fade-up" className="flex flex-wrap justify-center gap-5">
        {categories.map((category) => (
          <button
            onClick = {() => handleCategoryClick(category.id)}
            key={category.id}
            className="bg-pink-50 hover:bg-pink-100 transition p-6 rounded-2xl text-center cursor-pointer min-w-50"
          >
            <Cake className="mx-auto text-pink-600 mb-3" />
            <h3 className="font-semibold">{category.name}</h3>
          </button>
        ))}
      </div>
    </section>
  )
}
