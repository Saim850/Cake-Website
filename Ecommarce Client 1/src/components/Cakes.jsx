import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import { useSearchParams } from "react-router-dom";

export default function Cake() {
  const [cakes, setCakes] = useState([])
  const [isLoading, setLoading]  = useState(true)
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);

  const categoryId = searchParams.get("category");

    let url = ``
    if(categoryId !== null){
      url = `product/?category=${categoryId}&page=${pageNumber}`
    }else{
      url = `product/?page=${pageNumber}`
    }

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await api.get(url)
        setCakes(res.data.results)
        console.log(res.data.results)
        setMaxPageNumber(Math.ceil(res.data.count/12));
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [pageNumber])

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
    <section className="bg-gray-50 py-5">
      <h1 className="text-3xl text-pink-600 font-bold mb-5 text-center">Cakes</h1>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <div 
              data-aos = "fade-right"
              key={cake.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={cake.image}
                alt={cake.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
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
        
        {/* pagination */}
        <div className="flex justify-center mt-15 mb-8">
          <div className="join">
            <button onClick={() => setPageNumber(pageNumber-1 < 1 ? 1 : pageNumber-1)} className="join-item btn">«</button>
            <button className="join-item btn">Page {pageNumber}</button>
            <button onClick={() => setPageNumber(pageNumber+1 > maxPageNumber ? pageNumber : pageNumber+1)} className="join-item btn">»</button>
          </div>
        </div>

    </div>
    </section>
  )
}
