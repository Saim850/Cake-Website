import api from "../api";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function ProfilePage() {
  const [user, setUser] = useState([])
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async() =>{
      try{
        const res = await api.get('auth/users/me/')
        setUser(res.data)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

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
    <>
      {user.is_staff ? (
        <Navigate to="/admin/orders/"/>
      ):(
        <Navigate to="/profile"/>
      )}
    </>
  )
}
