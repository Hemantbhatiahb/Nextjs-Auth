import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // encrypt userId to send to db and UI
    const token =  emailType === 'VERIFY' ? userId : email
    const hashedToken = await bcryptjs.hash(token.toString(), 10);

    // update token values in db
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verfiyToken: hashedToken,
        verfiyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`No user found. Please signup`);
      }

      user.forgotPasswordToken = hashedToken;
      user.forgotPasswordTokenExpiry = Date.now() + 3600000;
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.FROMEMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType === "VERIFY" ? 'verifyemail' : 'updatepassword'}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/${emailType === "VERIFY" ? 'verifyemail' : 'updatepassword'}?token=${hashedToken}
        </p>`,
    };

    const mailResponse = await transporter.sendMail(emailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
