import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const token = uuidv4();

    // Save token in DB
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $et: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GUSER,
        pass: process.env.GPASS,
      },
    });

    const actionUrl =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/reset-password?token=${token}`;

    // Send email
    await transporter.sendMail({
      from: `"ARE U ALIVE" <${process.env.GUSER}>`,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click the link below:</p>
        <a href="${actionUrl}">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
        <p>This link expires in 1 hour.</p>
      `,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
