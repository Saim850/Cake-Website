

export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-20">
      <div data-aos="fade-up" className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Get Sweet Offers
        </h2>

        <p className="text-gray-600 mb-8">
          Subscribe and receive exclusive discounts.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 rounded-xl border"
          />

          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 rounded-xl">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}
