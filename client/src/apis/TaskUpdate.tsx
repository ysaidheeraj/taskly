import axios from "axios";
import { Dispatch } from "redux";
import { TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface TaskUpdateResponse {
  Task: Task;
}

export const updateTaskRequest = (taskObj: Task, taskId: string | undefined) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TASK_UPDATE_REQUEST
    });

    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }

    const { data } = await axios.put<TaskUpdateResponse>(`/api/tasks/${taskId}`, taskObj, config);

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data.Task
    });

  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: error
    });
  }
};

