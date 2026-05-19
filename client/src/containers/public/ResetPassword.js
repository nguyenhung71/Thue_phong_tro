import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, InputForm } from "../../components";
import { apiResetPassword } from "../../services/auth";
import { logout } from "../../store/actions/auth";

const getPasswordError = (password) => {
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
  if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa";
  if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường";
  if (!/\d/.test(password)) return "Mật khẩu phải có ít nhất 1 số";
  if (!/[^A-Za-z\d]/.test(password)) return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
  return "";
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ newPassword: "", confirmPassword: "" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const validate = () => {
    const errors = [];

    if (!email || !otp) {
      setIsError(true);
      setMsg("Thiếu email hoặc OTP hợp lệ");
      return 1;
    }

    if (!payload.newPassword) errors.push({ name: "newPassword", message: "Trường này không được để trống" });
    else {
      const passwordError = getPasswordError(payload.newPassword);
      if (passwordError) errors.push({ name: "newPassword", message: passwordError });
    }

    if (!payload.confirmPassword) errors.push({ name: "confirmPassword", message: "Trường này không được để trống" });
    else if (payload.confirmPassword !== payload.newPassword) errors.push({ name: "confirmPassword", message: "Xác nhận mật khẩu không khớp" });

    setInvalidFields(errors);
    return errors.length;
  };

  const handleSubmit = async () => {
    setMsg("");
    setIsError(false);
    if (validate() > 0) return;

    try {
      const response = await apiResetPassword({
        email,
        otp,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      });

      setMsg(response?.data?.msg || "");
      setIsError(response?.data?.err !== 0);
      if (response?.data?.err === 0) setTimeout(() => window.location.assign("/login"), 1000);
    } catch (error) {
      setIsError(true);
      setMsg("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="bg-white w-full max-w-[600px] self-center mx-auto mt-10 p-8 lg:p-[50px] lg:pb-[80px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">Đặt lại mật khẩu</h3>

      <div className="w-full flex flex-col gap-5">
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Mật khẩu mới" value={payload.newPassword} setValue={setPayload} type="newPassword" />
        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Xác nhận mật khẩu mới" value={payload.confirmPassword} setValue={setPayload} type="confirmPassword" />
        <Button text="Đặt lại mật khẩu" fullWidth onClick={handleSubmit} />
        {msg && <small className={isError ? "text-red-500" : "text-green-600"}>{msg}</small>}
      </div>

      <div className="mt-7">
        <small onClick={() => window.location.assign("/login")} className="text-blue-600 hover:text-orange-500 cursor-pointer">
          Quay lại đăng nhập
        </small>
      </div>
    </div>
  );
};

export default ResetPassword;
