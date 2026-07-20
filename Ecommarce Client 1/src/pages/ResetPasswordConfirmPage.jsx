import api from '../api';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordConfirmPage() {
  const[password, setPassword] = useState("");
  const[password2, setPassword2] = useState("");

  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  const[message, setMessage] = useState("");

  const handleSubmit = async(e) => {
      e.preventDefault()
      if(password != password2){
        setMessage('Password dose not metch!!');

      }else{
        try{
          await api.post('auth/users/reset_password_confirm/', {
            uid,
            token,
            new_password:password,
          });
          navigate('/login')

        }catch(error){
          if(error.response.data.new_password){
            setMessage(error.response.data.new_password[0]);
          }

          console.log(error.response.data)
        }
      }
    }

    return (
      <section className='h-screen bg-pink-50'>
          <div className="h-[80vh] flex justify-center items-center">
              <div className="bg-white w-100 p-5 rounded-xl shadow-md">
  
                  <div className="mb-3">
                    <h1 className='text-center text-2xl font-bold'>Forgot Your Password</h1>
                    <p className='text-center text-gray-400 mt-2'>Enter your email and get forgot passwrod link.</p>
                  </div>
  
                  <form action="" onSubmit={handleSubmit}>
  
                    {message && (
                      <div role="alert" className="alert alert-error alert-soft mb-2">
                        <span>{message}</span>
                      </div>
                    )}
  
                    <div className='mb-5'>
                      <lable className="block text-gray-700 mb-2">
                          Password
                      </lable>
                      <input 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500'
                      />
                    </div>
  
                    <div className='mb-5'>
                      <lable className="block text-gray-700 mb-2">
                          Confirm Password
                      </lable>
                      <input 
                          type="password"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500'
                      />
                    </div>
  
                    <button type='submit' className='w-full text-white font-bold bg-pink-500 p-3 rounded-md'>Forgot Password</button>
                  </form>
              </div>
          </div>
      </section>
    )
  }