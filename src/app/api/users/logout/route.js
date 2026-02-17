import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig";


export async function GET(req) {
  try {
    await connect();
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true ,expires:new Date(0)});
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "While logging out the user" },
      { status: 500 },
    );
  }
}
