import { combineReducers } from "redux";
import appReducer from "./app";
import userReducer from "./users";
const rootReducer = combineReducers({
  appReducer,
  userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
