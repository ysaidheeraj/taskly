import axios from "axios";
import { Dispatch } from "redux";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/UserConstants";
import { User } from "../models/User";

interface RegisterResponse {
  User: User;
}

interface UserRegisterObject {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const register = (userObj: UserRegisterObject) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { data } = await axios.post<RegisterResponse>("/api/auth/register", userObj);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.User
    });

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error
    });
  }
};

