import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, InputForm } from "../../components";
import { apiResetPassword } from "../../services/auth";
import { logout } from "../../store/actions/auth";

const getPasswordError = (password) => {
  if (password.length < 8) {
    return "Mat khau phai co it nhat 8 ky tu";
  }

  if (!/[A-Z]/.test(password)) {
    return "Mat khau phai co it nhat 1 chu hoa";
  }

  if (!/[a-z]/.test(password)) {
    return "Mat khau phai co it nhat 1 chu thuong";
  }

  if (!/\d/.test(password)) {
    return "Mat khau phai co it nhat 1 so";
  }

  if (!/[^A-Za-z\d]/.test(password)) {
    return "Mat khau phai co it nhat 1 ky tu dac biet";
  }

  return "";
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const validate = () => {
    const errors = [];

    if (!email || !otp) {
      setIsError(true);
      setMsg("Thieu email hoac OTP hop le");
      return 1;
    }

    if (!payload.newPassword) {
      errors.push({
        name: "newPassword",
        message: "Truong nay khong duoc de trong",
      });
    } else {
      const passwordError = getPasswordError(payload.newPassword);
      if (passwordError) {
        errors.push({
          name: "newPassword",
          message: passwordError,
        });
      }
    }

    if (!payload.confirmPassword) {
      errors.push({
        name: "confirmPassword",
        message: "Truong nay khong duoc de trong",
      });
    } else if (payload.confirmPassword !== payload.newPassword) {
      errors.push({
        name: "confirmPassword",
        message: "Xac nhan mat khau khong khop",
      });
    }

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

      if (response?.data?.err === 0) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setIsError(true);
      setMsg("Co loi xay ra, vui long thu lai");
    }
  };

  return (
    <div className="bg-white w-[600px] mt-10 p-[50px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">Dat lai mat khau</h3>

      <div className="w-full flex flex-col gap-5">
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Mat khau moi"}
          value={payload.newPassword}
          setValue={setPayload}
          type={"newPassword"}
        />

        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Xac nhan mat khau moi"}
          value={payload.confirmPassword}
          setValue={setPayload}
          type={"confirmPassword"}
        />

        <Button
          text="Đặt lại mật khẩu"
          textColor="text-white"
          bgColor="bg-secondary"
          fullWidth
          onClick={handleSubmit}
        />

        {msg && (
          <small className={isError ? "text-red-500" : "text-green-600"}>
            {msg}
          </small>
        )}
      </div>

      <div className="mt-7">
        <small
          onClick={() => navigate("/login")}
          className="text-[blue] hover:text-[orange] cursor-pointer"
        >
          Quay lai dang nhap
        </small>
      </div>
    </div>
  );
};

export default ResetPassword;
