import { apiLogin, apiRegister } from "../../services/auth";
import actionTypes from "./actionTypes";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.msg,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response?.data?.msg || "Dang ky that bai",
      });
    }

    return response?.data;
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: "Co loi xay ra, vui long thu lai",
    });
    return null;
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: {
          token: response.data.token,
          roleId: response.data.roleId,
          msg: response.data.msg,
        },
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response?.data?.msg || "Dang nhap that bai",
      });
    }

    return response?.data;
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: "Co loi xay ra, vui long thu lai",
    });
    return null;
  }
};

export const clearAuthMessage = () => ({
  type: actionTypes.CLEAR_AUTH_MESSAGE,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
