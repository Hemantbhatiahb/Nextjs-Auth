import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;
    console.log(token);

    // find the user based on token and expiry time
    const user = await User.findOne({
    verfiyToken: token,
    verfiyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verfiyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
