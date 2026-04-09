import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otp) => {
  const expireMinutes = process.env.OTP_EXPIRE_MINUTES || 5;

  await transporter.sendMail({
    from: `"Hỗ trợ tài khoản" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Mã OTP đặt lại mật khẩu",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333; text-align: center;">Đặt lại mật khẩu</h2>
        <p style="color: #555;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p style="color: #555;">Mã OTP của bạn là:</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #4f46e5; background: #f0f0ff; padding: 12px 24px; border-radius: 8px;">${otp}</span>
        </div>
        <p style="color: #888; font-size: 13px;">Mã này có hiệu lực trong <strong>${expireMinutes} phút</strong>.</p>
      </div>
    `,
  });
};
