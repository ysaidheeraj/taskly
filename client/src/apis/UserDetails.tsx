import axios from "axios";
import { Dispatch } from "redux";
import { USER_DETAILS_REQUST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "../constants/UserConstants";
import { User } from "../models/User";

interface DetailsResponse {
  User: User;
}

export const userDetails = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUST
    });
    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }
    const { data } = await axios.get<DetailsResponse>("/api/auth/profile", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.User
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error
    });
  }
};