import api from '../api';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const[email, setEmail] = useState("");
  const[isLoding, setLoding] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      setLoding(true);
      await api.post('auth/users/reset_password/', {email});
      alert("Check your email.")
    }catch(error){
      console.log(error.response.data);
    }finally{
      setLoding(false)
    }
  }

  return (
    <section className='h-screen bg-pink-50'>
        <div className="h-[80vh] flex justify-center items-center">
            <div className="bg-white w-100 p-5 rounded-xl shadow-md">

                <div className="mb-5">
                  <h1 className='text-center text-2xl font-bold'>Forgot Your Password</h1>
                  <p className='text-center text-gray-400 mt-2'>Enter your email and get forgot passwrod link.</p>
                </div>

                <form action="" onSubmit={handleSubmit}>

                  <div className='mb-5'>
                    <lable className="block text-gray-700 mb-2">
                        Email
                    </lable>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500'
                    />
                  </div>
                  
                  {isLoding ? (
                    <div className="text-center mt-5">
                      <span className="loading loading-spinner text-secondary"></span>
                    </div>
                  ):(
                    <button type='submit' className='w-full text-white font-bold bg-pink-500 p-3 rounded-md'>Forgot Password</button>
                  )}

                </form>
            </div>
        </div>
    </section>
  )
}
