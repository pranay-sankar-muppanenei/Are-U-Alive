import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req) {
  const userid = await getDataFromToken(req);
  const user = await User.findOne({ _id: userid }).select("-password");
  return NextResponse.json({
    message: "User Data retrieved successfully",
    data: user,
  });
}
