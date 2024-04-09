import axios from "axios";
import { Dispatch } from "redux";
import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface DetailsResponse {
  Task: Task[];
}

export interface TaskListQuery{
  status?: Number;
  searchText?: string;
}

const buildQueryString = (params: TaskListQuery): string => {
  const queryParams: string[] = [];

  // Add status query parameter if provided
  if (params.status !== undefined) {
    queryParams.push(`status=${params.status}`);
  }

  // Add searchText query parameter if provided
  if (params.searchText) {
    queryParams.push(`searchText=${encodeURIComponent(params.searchText)}`);
  }

  // Join the query parameters with '&' and return the resulting query string
  return queryParams.join('&');
};

export const tasksList = (query?: TaskListQuery) => async (dispatch: Dispatch) => {
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
    let api:string ="/api/tasks";
    if(query){
      const paramString = buildQueryString(query);
      if(paramString.length){
        api += "?"+paramString;
      }
    }
    
    const { data } = await axios.get<DetailsResponse>(api, config);

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