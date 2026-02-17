import Profile from "@/models/profileModel";
import { NextResponse } from "next/server";
import connect from "@/dbConfig";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req) {
  try {
    await connect();

    const id = getDataFromToken(req);
    console.log(id);
    const body = await req.json();
    const { name, emergencyEmail } = body;
    const newProfile = await Profile.findOneAndUpdate(
      { userId: id },
      { name, emergencyEmail },
      { new: true ,upsert:true},
    );
    return NextResponse.json({ newProfile, message: "successfully updated" });
  } catch (error) {
    console.log("Error while creating emergency profile details", error);
    return NextResponse.json(
      { error: "Failed to create emergency profile" },
      { status: 500 },
    );
  }
}
