export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const getOtpExpiry = (minutes = 1) =>
  Date.now() + Number(minutes) * 60 * 1000;

export const isOtpValid = (expiresAt) => Date.now() <= Number(expiresAt);
