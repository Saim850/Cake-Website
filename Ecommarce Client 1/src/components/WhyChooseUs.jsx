import { Truck, Cake, ShieldCheck } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div data-aos="fade-right" className="bg-pink-50 p-8 rounded-3xl text-center">
          <Truck
            size={50}
            className="mx-auto text-pink-600 mb-4"
          />
          <h3 className="font-bold text-xl mb-2">
            Fast Delivery
          </h3>
          <p className="text-gray-600">
            Same-day delivery available in selected areas.
          </p>
        </div>

        <div data-aos="fade" className="bg-pink-50 p-8 rounded-3xl text-center">
          <Cake
            size={50}
            className="mx-auto text-pink-600 mb-4"
          />
          <h3 className="font-bold text-xl mb-2">
            Freshly Baked
          </h3>
          <p className="text-gray-600">
            Every cake is baked fresh on order.
          </p>
        </div>

        <div data-aos="fade-left" className="bg-pink-50 p-8 rounded-3xl text-center">
          <ShieldCheck
            size={50}
            className="mx-auto text-pink-600 mb-4"
          />
          <h3 className="font-bold text-xl mb-2">
            Secure Payments
          </h3>
          <p className="text-gray-600">
            Safe and trusted payment methods.
          </p>
        </div>
      </div>
    </section>
  )
}
