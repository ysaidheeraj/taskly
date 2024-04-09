import axios from "axios";
import { Dispatch } from "redux";
import { TASK_DETAILS_REQUEST, TASK_DETAILS_SUCCESS, TASK_DETAILS_FAIL } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface TaskCreateResponse {
  Task: Task;
}

export const getTaskDetails = (taskId: string | undefined) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TASK_DETAILS_REQUEST
    });

    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }

    const { data } = await axios.get<TaskCreateResponse>(`/api/tasks/${taskId}`, config);

    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data.Task
    });

  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload: error
    });
  }
};

