import { IAction, IUser } from "../../interfaces";
import { RESET_USER, SET_USER, SET_USER_TOKEN } from "../actions/user";

interface IUserReducer {
  user: IUser;
  token: string;
}

const initialState: IUserReducer = {
  user: {
    fName: "",
    lName: "",
    email: "",
    image: "",
    createdAt: "",
  },
  token: "",
};

const userReducer = (
  state: IUserReducer = initialState,
  action: IAction
): IUserReducer => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default userReducer;
