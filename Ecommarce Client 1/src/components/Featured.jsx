import { ArrowRight, Star,ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Featured() {
  const [featuredCakes, setfeaturedCakes] = useState([])
  const [isLoading, setLoading]  = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get('product/')
        setfeaturedCakes(res.data.results.slice(0, 4))
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const handleAddTOCart = async(id) => {
    try{
      const quantity = 1;
      const res = await api.post('cart-items/', {
        product:id, 
        quantity,
      })
      console.log(res)
      window.location.reload()
    }catch(error){
      console.log(error)
    }
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Featured Cakes</h2>

          <Link to="/cakes" className="flex items-center gap-2 text-pink-600 font-semibold">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {isLoading ? (
          <p className="text-center mt-5 text-pink-600">
            <span className="loading loading-spinner loading-xl"></span>
          </p>
        ):(
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCakes.map((cake) => (
              <div
                data-aos = 'fade-right'
                key={cake.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <h3 className="font-bold text-lg">
                    {cake.name}
                  </h3>

                  <p className="text-pink-600 font-bold text-xl mt-2">
                    ৳{cake.price}
                  </p>

                  <button onClick={() => handleAddTOCart(cake.id)} className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
