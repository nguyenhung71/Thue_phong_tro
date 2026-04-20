import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, InputForm } from "../../components";
import { clearAuthMessage, login, register } from "../../store/actions/auth";

const getPasswordError = (password) => {
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
  if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa";
  if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường";
  if (!/\d/.test(password)) return "Mật khẩu phải có ít nhất 1 số";
  if (!/[^A-Za-z\d]/.test(password)) return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
  return "";
};

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, msg } = useSelector((state) => state.auth);
  const registerMode = useMemo(() => {
    const search = new URLSearchParams(location.search);
    if (typeof location?.state?.flag === "boolean") return location.state.flag;
    return search.get("mode") === "register";
  }, [location.search, location.state]);
  const [isRegister, setIsRegister] = useState(registerMode);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "TENANT",
  });

  useEffect(() => {
    setIsRegister(registerMode);
  }, [registerMode]);

  useEffect(() => {
    if (isLoggedIn) window.location.assign("/");
  }, [isLoggedIn]);

  useEffect(() => () => dispatch(clearAuthMessage()), [dispatch]);

  const resetForm = () => {
    setPayload({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: "TENANT",
    });
    setInvalidFields([]);
  };

  const switchMode = (flag) => {
    setIsRegister(flag);
    resetForm();
    dispatch(clearAuthMessage());
  };

  const validate = (data) => {
    const errors = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value === "") {
        errors.push({ name: key, message: "Trường này không được để trống" });
      }
    });

    if (data.phone && !/^\d{10}$/.test(data.phone)) {
      errors.push({ name: "phone", message: "Số điện thoại không hợp lệ" });
    }

    const passwordError = data.password ? getPasswordError(data.password) : "";
    if (passwordError) {
      errors.push({ name: "password", message: passwordError });
    }

    if (isRegister) {
      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        errors.push({ name: "email", message: "Email không hợp lệ" });
      }

      if (data.confirmPassword && data.password !== data.confirmPassword) {
        errors.push({ name: "confirmPassword", message: "Xác nhận mật khẩu không khớp" });
      }
    }

    setInvalidFields(errors);
    return errors.length;
  };

  const handleSubmit = async () => {
    dispatch(clearAuthMessage());

    if (isRegister) {
      const registerPayload = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
        roleId: payload.roleId,
      };

      if (validate(registerPayload) > 0) return;

      const response = await dispatch(
        register({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          password: payload.password,
          roleId: payload.roleId,
        })
      );

      if (response?.err === 0) {
        switchMode(false);
        window.location.assign("/login");
      }
      return;
    }

    const loginPayload = { phone: payload.phone, password: payload.password };
    if (validate(loginPayload) > 0) return;
    await dispatch(login(loginPayload));
  };

  return (
    <div className="bg-white w-full max-w-[600px] self-center mx-auto mt-10 p-8 lg:p-[50px] lg:pb-[80px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h3>

      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Họ và tên" value={payload.name} setValue={setPayload} type="name" />
        )}

        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Số điện thoại" value={payload.phone} setValue={setPayload} type="phone" />

        {isRegister && (
          <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Email" value={payload.email} setValue={setPayload} type="email" />
        )}

        <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Mật khẩu" value={payload.password} setValue={setPayload} type="password" />

        {isRegister && (
          <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label="Xác nhận mật khẩu" value={payload.confirmPassword} setValue={setPayload} type="confirmPassword" />
        )}

        {isRegister && (
          <div>
            <label className="block mb-2 font-medium text-gray-700">Vai trò</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="roleId" checked={payload.roleId === "LANDLORD"} onChange={() => setPayload((prev) => ({ ...prev, roleId: "LANDLORD" }))} />
                <span>Chủ trọ</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="roleId" checked={payload.roleId === "TENANT"} onChange={() => setPayload((prev) => ({ ...prev, roleId: "TENANT" }))} />
                <span>Khách thuê</span>
              </label>
            </div>
          </div>
        )}

        <Button text={isRegister ? "Đăng ký" : "Đăng nhập"} fullWidth onClick={handleSubmit} />

        {msg && <small className={isLoggedIn ? "text-green-600" : "text-red-500"}>{msg}</small>}
      </div>

      <div className="mt-7 flex items-center justify-between gap-3 flex-wrap">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span onClick={() => switchMode(false)} className="text-blue-500 hover:underline cursor-pointer">
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small onClick={() => window.location.assign("/forgot-password")} className="text-blue-600 hover:text-orange-500 cursor-pointer">
              Bạn quên mật khẩu?
            </small>
            <small onClick={() => switchMode(true)} className="text-blue-600 hover:text-orange-500 cursor-pointer">
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
