import React, { useCallback } from "react";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultils/contant";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn} = useSelector(state => state.auth)
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, [navigate]);

  return (
    <div className="w-1100 flex items-center justify-between">
      <Link to={"/"}>
        <img
          src="https://file.phongtro.vn/1/logo_phongtro_vn_55384fa9a1_8bfa3a822a.webp"
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
      <div className="flex items-center gap-1">
        {!isLoggedIn && <div className="flex items-center gap-1">
            <small>Phongtro.vn xin chào!</small>
            <Button
              text="Đăng nhập"
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(false)}
            />
            <Button
              text="Đăng ký"
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(true)}
            />
        </div>}
        {isLoggedIn && <div className="flex items-center gap-1">
            <small>Tên!</small>
            <Button
              text="Đăng xuất"
              textColor="text-white"
              bgColor="bg-red-500"
              onClick={() => dispatch(logout())}
            />
        </div>}
        <Button
          text="Đăng tin mới"
          textColor="text-white"
          bgColor="bg-accent"
          IcAfter={AiOutlinePlusCircle}
        />
      </div>
    </div>
  );
};

export default Header;
