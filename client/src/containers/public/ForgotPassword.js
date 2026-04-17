import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, InputForm } from "../../components";
import { apiForgotPassword, apiVerifyOtp } from "../../services/auth";
import { logout } from "../../store/actions/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ email: "", otp: "" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const validateEmail = () => {
    const errors = [];
    if (!payload.email) errors.push({ name: "email", message: "Trường này không được để trống" });
    else if (!/\S+@\S+\.\S+/.test(payload.email)) errors.push({ name: "email", message: "Email không hợp lệ" });
    setInvalidFields(errors);
    return errors.length;
  };

  const validateOtp = () => {
    const errors = [];
    if (!payload.otp) errors.push({ name: "otp", message: "Trường này không được để trống" });
    else if (!/^\d{6}$/.test(payload.otp)) errors.push({ name: "otp", message: "OTP phải gồm 6 chữ số" });
    setInvalidFields(errors);
    return errors.length;
  };

  const handleSendOtp = async () => {
    setMsg("");
    setIsError(false);
    if (validateEmail() > 0) return;

    try {
      const response = await apiForgotPassword({ email: payload.email });
      setMsg(response?.data?.msg || "");
      setIsError(response?.data?.err !== 0);
      if (response?.data?.err === 0) setStep(2);
    } catch (error) {
      setIsError(true);
      setMsg("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const handleVerifyOtp = async () => {
    setMsg("");
    setIsError(false);
    if (validateOtp() > 0) return;

    try {
      const response = await apiVerifyOtp({ email: payload.email, otp: payload.otp });
      setMsg(response?.data?.msg || "");
      setIsError(response?.data?.err !== 0);
      if (response?.data?.err === 0) {
        navigate(`/reset-password?email=${encodeURIComponent(payload.email)}&otp=${encodeURIComponent(payload.otp)}`);
      }
    } catch (error) {
      setIsError(true);
      setMsg("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="bg-white w-full max-w-[600px] self-center mx-auto mt-10 p-8 lg:p-[50px] lg:pb-[80px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">Quên mật khẩu</h3>

      <div className="w-full flex flex-col gap-5">
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Email" value={payload.email} setValue={setPayload} type="email" />

        {step === 2 && (
          <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Mã OTP" value={payload.otp} setValue={setPayload} type="otp" />
        )}

        {step === 1 ? (
          <Button text="Gửi mã OTP" fullWidth onClick={handleSendOtp} />
        ) : (
          <>
            <Button text="Xác thực OTP" fullWidth onClick={handleVerifyOtp} />
            <Button text="Gửi lại OTP" bgColor="bg-[#3961fb]" fullWidth onClick={handleSendOtp} />
          </>
        )}

        {msg && <small className={isError ? "text-red-500" : "text-green-600"}>{msg}</small>}
      </div>

      <div className="mt-7">
        <small onClick={() => navigate("/login")} className="text-blue-600 hover:text-orange-500 cursor-pointer">
          Quay lại đăng nhập
        </small>
      </div>
    </div>
  );
};

export default ForgotPassword;