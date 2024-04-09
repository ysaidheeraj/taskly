import axios from "axios";
import { Dispatch } from "redux";
import { TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_FAIL } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface TaskCreateResponse {
  Task: Task;
}

export const createTaskRequest = (taskObj: Task) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST
    });

    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }

    const { data } = await axios.post<TaskCreateResponse>("/api/tasks/create", taskObj, config);

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data.Task
    });

  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error
    });
  }
};

