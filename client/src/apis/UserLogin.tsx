import axios from "axios";
import { Dispatch } from "redux";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_DETAILS_SUCCESS } from "../constants/UserConstants";
import { User } from "../models/User";

interface LoginResponse {
  user: User;
  tokens: {
    access: string,
    refresh: string
  }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const { data } = await axios.post<LoginResponse>("/api/auth/login", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user
    });

    dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.user
    });

    localStorage.setItem("access_token", data.tokens.access)
    localStorage.setItem("refresh_token", data.tokens.refresh)

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error
    });
  }
};

