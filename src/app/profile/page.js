'use client'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default  function Profile() {
    const router=useRouter();
    const [data,setData]=useState(null);
    const getUserDetails=async()=>{
        try{
            const response=await axios.post('/api/users/me');
            setData(response.data.data);
        }
        catch(error){
            console.log("Error fetching user details");
        }
    }
    const logout=async()=>{
        try{
            await axios.get('/api/users/logout');
            toast.success("logout success")
            router.push('/login');
        }
        catch(error){
            console.log("Error logging out");
        }
    }
    useEffect(()=>{ getUserDetails(); },[]);



  return (
    <div>
      <h1>User Profile</h1>
        {data&&(
          <div>
            <p>Email: {data.email}</p>
            <p>Joined: {new Date(data.createdAt).toLocaleDateString()}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
    </div>
  );
}
