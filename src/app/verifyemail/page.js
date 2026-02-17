
'use client'
import axios from 'axios';
import {useState,useEffect} from 'react'
import {useSearchParams} from 'next/navigation'
const Verifyemail=()=>{
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState("");
    const [error,setError]=useState(false);
    const searchParams=useSearchParams();
    
    const verifyuseremail=async ()=>{
        try{
        await axios.get('/api/users/verify-email',{
  params: { token }
})
        setVerified(true);
        }
        catch(error){
            console.log(error);
            setError(true);
        }
    }
    useEffect(()=>{
        (async()=>{   
            const urlToken=searchParams.get("token");
            console.log(urlToken);
            setToken(urlToken||"");
        })()

},[searchParams])
useEffect(()=>{
    (async()=>{
        if(token.length>0){
            verifyuseremail();
        }
    })()
},[token])


    return(
        <div>

            <h1>verify email</h1>
            <h2>{token?`${token}`:"no token"}</h2>
           <p>{verified&&"user verified"}</p> 

        </div>
 
)

}

export default Verifyemail;