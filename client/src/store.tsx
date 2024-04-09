import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userDetailsReducer } from "./reducers/UserReducer";
import { tasksReducer, taskCreateReducer, taskDetailsReducer } from "./reducers/TaskReducer";
import { TasksState, TaskState } from "./reducers/TaskReducer";
import { UserState } from "./reducers/UserReducer";
import { userRegisterReducer } from "./reducers/UserReducer";
import { userUpdateReducer } from "./reducers/UserReducer";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Defining the type of the dispatch function
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    tasksList: tasksReducer,
    taskCreate: taskCreateReducer,
    taskDetails: taskDetailsReducer
});

export interface RootState {
    userLogin: UserState;
    userDetails: UserState; 
    userRegister: UserState;
    userUpdate: UserState;
    tasksList: TasksState;
    taskCreate: TaskState;
    taskDetails: TaskState;
}

const middleware = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

export default store;