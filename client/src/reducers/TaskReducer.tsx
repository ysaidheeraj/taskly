import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL, TASK_LIST_RESET } from "../constants/TaskConstants";
import { TASK_CREATE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_RESET } from "../constants/TaskConstants";
import { Task } from "../models/Task";

interface DefaultState{
    loading: boolean,
    error?: string
}
export interface TaskState extends DefaultState{
    task?: Task
}
export interface TasksState extends DefaultState{
    tasks?: Task[]
}

const tasksInitialState: TasksState = {
    loading: false,
};
const taskInitialState: TaskState = {
    loading: false,
};

export const tasksReducer = (state: TasksState = tasksInitialState, action: any ): TasksState =>{
    switch(action.type){
        case TASK_LIST_REQUEST:
            return {...state, loading: true, tasks: undefined, error: undefined}
        case TASK_LIST_SUCCESS:
            return {...state, loading: false, tasks:action.payload, error: undefined}
        case TASK_LIST_FAIL:
            return {...state, loading: false, tasks: undefined, error: action.payload}
        case TASK_LIST_RESET:
            return {...tasksInitialState, tasks: undefined, error: undefined}
        default:
            return state;
    }
}

export const taskCreateReducer = (state: TaskState = taskInitialState, action: any): TaskState => {
    switch(action.type){
        case TASK_CREATE_REQUEST:
            return {...state, loading: true, task: undefined, error: undefined}
        case TASK_CREATE_SUCCESS:
            return {...state, loading: false, task:action.payload, error: undefined}
        case TASK_CREATE_FAIL:
            return {...state, loading: false, task: undefined, error: action.payload}
        case TASK_CREATE_RESET:
            return {...taskInitialState, task: undefined, error: undefined}
        default:
            return state;
    }
}