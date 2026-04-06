 import nodemailer from "nodemailer";
  require("dotenv").config();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  export const sendResetPasswordEmail = async (to, token) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?
  token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Reset password",
      html: `
        <div>
          <p>Bạn vừa yêu cầu đặt lại mật khẩu.</p>
          <p>Click vào link bên dưới để đặt lại mật khẩu:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Link sẽ hết hạn sau 15 phút.</p>
        </div>
      `,
    });
  };