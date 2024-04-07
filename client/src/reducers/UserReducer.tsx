import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/UserConstants";
import { USER_DETAILS_REQUST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "../constants/UserConstants";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_RESET } from "../constants/UserConstants";
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET } from "../constants/UserConstants";
import { User } from "../models/User";

export interface UserState {
  loading: boolean;
  user?: User;
  error?: string;
}

const initialState: UserState = {
  loading: false,
};

export const userLoginReducer = (state: UserState = initialState, action: any): UserState => {
  // Switch statement to determine the action type
  switch(action.type){
    // When the user login request is dispatched
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: undefined };
    // When the user login is successful
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: undefined };
    // When the user login fails
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, user: undefined };
    // When the user logs out
    case USER_LOGOUT:
      return { ...initialState, user: undefined, error: undefined };
    default:
      return state;
  }
};

export const userDetailsReducer = (state: UserState = initialState, action: any): UserState => {
  // Switch statement to determine the action type
  switch(action.type){
    // When the user details request is dispatched
    case USER_DETAILS_REQUST:
      return { ...state, loading: true, error: undefined };
    // When the user details is successful
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: undefined };
    // When the user details fails
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload, user: undefined };
    case USER_LOGOUT:
      return { ...initialState, user: undefined, error: undefined };
    default:
      return state;
  }
};

export const userRegisterReducer = (state: UserState = initialState, action: any): UserState => {
  switch(action.type){
    case USER_REGISTER_REQUEST:
      return {...state, loading: true, error: undefined};
    case USER_REGISTER_SUCCESS:
      return {...state, loading: false, user: action.payload, error: undefined};
    case USER_REGISTER_FAIL:
      return {...state, loading: false, user: undefined, error: action.payload};
    case USER_REGISTER_RESET:
      return {...state, loading: false, user: undefined, error: undefined};
    default:
      return state;
  }
}

export const userUpdateReducer = (state: UserState = initialState, action: any): UserState => {
  switch(action.type){
    case USER_UPDATE_REQUEST:
      return {...state, loading: true, error: undefined};
    case USER_UPDATE_SUCCESS:
      return {...state, loading: false, user: action.payload, error: undefined};
    case USER_UPDATE_FAIL:
      return {...state, loading: false, user: undefined, error: action.payload};
    case USER_UPDATE_RESET:
      return {...state, loading: false, user: undefined, error: undefined};
    default:
      return state;
  }
}
