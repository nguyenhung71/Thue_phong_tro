import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
  roleId: null,
  msg: "",
  isRegisterSuccess: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        roleId: null,
        msg: action.data || "",
        isRegisterSuccess: true,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        roleId: action.data.roleId,
        msg: action.data.msg || "",
        isRegisterSuccess: false,
      };

    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        roleId: null,
        msg: action.data || "",
        isRegisterSuccess: false,
      };

    case actionTypes.CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        msg: "",
        isRegisterSuccess: false,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        roleId: null,
        msg: "",
        isRegisterSuccess: false,
      };

    default:
      return state;
  }
};

export default authReducer;
