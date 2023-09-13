import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log('iniside ')
    const reqBody = await request.json();
    const {email  } = reqBody;
      console.log(reqBody);

    await sendEmail({ email, emailType: "RESET" });

    return NextResponse.json({
      message: "Email sent successfully.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
