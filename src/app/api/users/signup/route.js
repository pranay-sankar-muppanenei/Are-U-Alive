import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";
import connect from "@/dbConfig";

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const { username, password, email } = body;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }
   
    const hashedpassword = await bcryptjs.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });
  
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });
    return NextResponse.json({
      message: "user created successfully",
      isVerified: newUser.isVerified,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while signing up a user1" ,error:error.message},
          );
  }
}
