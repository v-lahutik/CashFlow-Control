import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
import Verify from "../models/verify.model.js";

dotenv.config();

export const createError = (msg, status) => {
  const err = new Error(msg);
  if (status) err.status = status;
  return err;
};

export const generateVerificationToken = async (user) => {
  const verify_token = crypto.randomBytes(16).toString("hex");

  return await Verify.create({
    token: verify_token,
    userId: user._id,
  });
};

export const sendEmail = async (user, token) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify your account! 😊",
      html: emailTemplate(user.firstName, token.token, user._id),
    });


  } catch (error) {
    console.error("Error sending email:", error);
    throw createError("Error sending email", 500); 
  }
};

export const emailTemplate = (name, token, userId) => {
  const link = `https://localhost:5000/users/verify/${token}/${userId}`

  return `
  <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.1);">
      <div style="background-color: #4CAF50; padding: 10px 20px;">
        <h2 style="color: white; text-align: center;">Verify Your Email Address</h2>
      </div>
      <div style="padding: 20px;">
        <h3>Hi ${name},</h3>
        <p>Thank you for registering with us! To complete your sign-up process, please confirm your email by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${link}" 
             style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
             Verify Email
          </a>
        </div>
        <p>If the button above doesn't work, please copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href="${link}" style="color: #4CAF50;">${link}</a></p>
        <p>This link will expire in 24 hours, so please verify your email as soon as possible.</p>
        <p>If you did not create this account, you can safely ignore this email.</p>
        <p>Best regards,</p>
        <p>The Team</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center; color: #777;">
        <p style="font-size: 12px;">Please do not reply to this email. If you need help, contact our support team.</p>
      </div>
    </div>
  </div>
`;
};