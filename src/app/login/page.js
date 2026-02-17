"use client";
import { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
const Signup = () => {
  const router=useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");



  const log=async(event)=>{
    event.preventDefault();
    try{
        const response=await axios.post('/api/users/login',user);
        console.log("login success");
        router.push('/')

    }
    catch(error){
      console.log("login failed");
      toast.error(error.message);
    }
  
 
  }

  return (
    <div className="bg-green-900 p-4">
      <div className="flex flex-col">
        {" "}
         <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="p-1 outline-none border border-sm bg-white w-[300px] h-[30px] rounded-sm placeholder:text-gray"
          value={user.email}
          placeholder="Enter Email"
          onChange={(e)=>{setUser({...user,email:e.target.value})}}
        ></input>
       
        <p>{emailError}</p>
      </div>

      <div className="flex flex-col">
        {" "}
         <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="p-1 outline-none border border-sm bg-white w-[300px] h-[30px] rounded-sm placeholder:text-gray"
          value={user.password}
          placeholder="Enter Password"
          onChange={(e)=>{setUser({...user,password:e.target.value})}}
        ></input>
        <p>{passError}</p>
      </div>
      <button onClick={log}>Login</button>
         <p>{error}</p>
    </div>
  );
};

export default Signup;
