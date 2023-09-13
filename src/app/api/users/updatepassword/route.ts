import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log(requestBody);
    const { token, password, confirmPassword } = requestBody;
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password doesn't match" },
        { status: 400 }
      );
    }

    // find the user based on the token and expiry
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or time expired!" },
        { status: 400 }
      );
    }
    console.log(user);

    const hashedPassword = await bcryptjs.hash(password, 10);

    // update hashedPassword in database
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
