import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";
import connect from "@/dbConfig";
import jwt from "jsonwebtoken";

export async function POST(req){
    try{
        await connect();
        const body=await req.json();
        const {email,password}=body;

        const user=await User.findOne({email});
        if(!user){
            return NextResponse({message:"user does not exist"},{status:400})
        }
        console.log("user exists");
        const valid=await bcryptjs.compare(password,user.password);
        if(!valid){
            return NextResponse.json({message:"your password is incorrect"},{status:400});
        }
        const data={
            id:user.id,
            username:user.username,
            email:user,
        }
        const token=await jwt.sign(data,process.env.SECRET,{expiresIn:'10d'});
        const response=NextResponse.json(
            {message:"Logged in Successfully",     success:true},
       
        )
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    }
    catch (error) {
    return NextResponse.json(
      { message: "Error while logging in a user", error:error.message },
      { status: 400 },
    );
  }
}
