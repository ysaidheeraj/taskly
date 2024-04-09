import axios from "axios";
import { Dispatch } from "redux";
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_DETAILS_SUCCESS } from "../constants/UserConstants";
import { User } from "../models/User";

interface UpdateResponse {
  User: User;
}

export const update = (userObj: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }
    const { data } = await axios.put<UpdateResponse>("/api/auth/update", userObj, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.User
    });

    dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.User
      });

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error
    });
  }
};

