import { Link } from "react-router-dom"

export default function Hero() {
  
  return (
      <section className="relative h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d"
          alt="Cake Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-bold mb-6">
              Delicious Cakes 
              <br />
              For Every Occasion
            </h1>

            <p data-aos="fade-up" className="max-w-xl text-lg text-gray-200 mb-8">
              Freshly baked with premium ingredients and delivered
              straight to your doorstep.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link data-aos="fade-right" to="/cakes" className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full font-semibold">
                Shop Now
              </Link>

              <Link data-aos="fade-left" to="/about" className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                About
              </Link>

            </div>
          </div>
        </div>
      </section>
  )
}
