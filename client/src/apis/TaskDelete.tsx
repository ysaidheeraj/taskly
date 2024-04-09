import axios from "axios";
import { Dispatch } from "redux";
import { TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAIL } from "../constants/TaskConstants";
import Notification from "../components/Notification";


export const deleteTaskRequest = (taskId: string | undefined) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST
    });

    let access_token = localStorage.getItem("access_token");
    const config = {
        headers : {
            'Authorization': 'Bearer '+access_token
        }
    }

   await axios.delete(`/api/tasks/${taskId}`, config);

    dispatch({
      type: TASK_DELETE_SUCCESS,
    });

    Notification.success("Task deleted successfully!");

  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error
    });
  }
};

