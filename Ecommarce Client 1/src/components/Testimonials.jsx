import { Star } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {["Amazing taste!", "Best cake ever!", "Fast delivery!"].map(
          (review, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-8 rounded-3xl"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-4">
                "{review}"
              </p>

              <h4 className="font-bold">Happy Customer</h4>
            </div>
          )
        )}
      </div>
    </section>
  )
}
