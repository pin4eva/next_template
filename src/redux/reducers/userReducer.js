import Cookies from "js-cookie";
import { SET_USER, LOGOUT } from "../types";

export const userState = {
  single: null,
  users: [],
  loading: false,
  isAuth: null,
  current: {},
  role: "",
};

const userReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        single: payload,
        isAuth: payload ? true : false,
        loading: false,
      };

    case LOGOUT:
      Cookies.remove("token");
      return {
        isAuth: false,
        userState,
      };

    default:
      return state;
  }
};

export default userReducer;
