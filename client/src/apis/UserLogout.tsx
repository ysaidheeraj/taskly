import { Dispatch } from "redux";
import { USER_LOGOUT } from "../constants/UserConstants";

export const logout = () => async (dispatch: Dispatch) => {
    dispatch({
      type: USER_LOGOUT
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

