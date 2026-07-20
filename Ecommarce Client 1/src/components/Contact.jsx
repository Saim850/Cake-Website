import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import api from '../api'

export default function Contact() {
  const[formData, setFormDate] = useState({
  name:"",
  email:"",
      phone:"",
      message:"",
  })

  const handleChange = (e) =>{
    setFormDate({...formData, [e.target.name]:e.target.value})
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await api.post('contact/', formData)
      alert("Message submit successfully")
    }catch(error){
      console.log(error.response.data);
      alert("Somthing went worng!")
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div data-aos="fade-down" className="text-center mb-12">
          <span className="text-pink-600 font-semibold uppercase">
            Contact Us
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Let's Create Something Sweet
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a custom cake idea or want to place an order?
            We'd love to hear from you. Get in touch today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div data-aos="fade-down" className="space-y-6">
            <div className="flex items-start gap-4 p-5 bg-pink-50 rounded-2xl">
              <Phone className="text-pink-600" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">
                  +880 1XXXXXXXXX
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-pink-50 rounded-2xl">
              <Mail className="text-pink-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">
                  hello@sweetcake.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-pink-50 rounded-2xl">
              <MapPin className="text-pink-600" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-up" className="bg-pink-50 p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-500"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-500"
              />

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your cake order..."
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}