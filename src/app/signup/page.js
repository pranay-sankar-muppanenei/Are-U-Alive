"use client";
import { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
const Signup = () => {
  const router=useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");



  const sign=async(event)=>{
    event.preventDefault();
    try{
        const response=await axios.post('/api/users/signup',user);
        console.log("sign up success");
        router.push('/login')

    }
    catch(error){
      console.log("signup failed");
      toast.error(error.message);
    }
  
 
  }

  return (
    <div className="bg-green-900 p-4">
      <div className="flex flex-col">
             <label htmlFor="username">Username</label>
        <input
          type="text"
          className="p-1 outline-none border border-sm bg-white w-[300px] h-[30px] rounded-sm placeholder:text-gray"
          placeholder="Enter Username "
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
   
        <p>{nameError}</p>
      </div>
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
      <button onClick={sign}>Signup</button>
         <p>{error}</p>
    </div>
  );
};

export default Signup;
