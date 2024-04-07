import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userDetailsReducer } from "./reducers/UserReducer";
import { UserState } from "./reducers/UserReducer";
import { userRegisterReducer } from "./reducers/UserReducer";

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer
});

export interface RootState {
    userLogin: UserState;
    userDetails: UserState; 
    userRegister: UserState;
}

const middleware = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

export default store;