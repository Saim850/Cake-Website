import { Heart, Cake, Star } from "lucide-react";
import CakeImage from '../assets/HomeMadeCake.jpg'
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="py-20 bg-pink-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div data-aos="fade-right">
            <img
              src={CakeImage}
              alt="Homemade Cake"
              className="w-full rounded-3xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div data-aos="fade-left">
            <span className="text-pink-600 font-semibold">
              ABOUT MY CAKES
            </span>

            <h2 className="text-4xl font-bold mt-3 mb-6">
              Homemade Cakes Crafted With Love
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Every cake is freshly baked in my home kitchen using
              quality ingredients and lots of care. I believe every
              celebration deserves a special cake that tastes as
              wonderful as it looks.
            </p>

            <p className="text-gray-600 leading-8 mb-8">
              From birthdays and anniversaries to custom-themed cakes,
              each order is handcrafted to make your moments memorable.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="text-pink-600" />
                <span>Made fresh for every order</span>
              </div>

              <div className="flex items-center gap-3">
                <Cake className="text-pink-600" />
                <span>Custom designs available</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-pink-600" />
                <span>Premium ingredients & homemade recipes</span>
              </div>
            </div>

            <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold">
              <Link to="/cakes">Order Cake</Link>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}