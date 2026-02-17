import User from "@/models/userModel";

import connect from "@/dbConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    console.log("got token");
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log("user found");
    if (!user) {
      return NextResponse.json({
        error: "Invalid Token,Error while verifying email",
      });
    }
    console.log("point");
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "User verified Successfully" });
  } catch (error) {
    console.log("Error while verifying email:", error);
    return NextResponse.json({ error: "Error while verifying email", error });
  }
}
