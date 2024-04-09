import axios from "axios";
import { Dispatch } from "redux";
import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface DetailsResponse {
  Task: Task[];
}

export const tasksList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TASK_LIST_REQUEST
    });
    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }
    const { data } = await axios.get<DetailsResponse>("/api/tasks", config);

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data.Task
    });

  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload: error
    });
  }
};