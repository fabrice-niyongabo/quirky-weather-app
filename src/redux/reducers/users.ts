import { IAction, IUser } from "../../interfaces";
import { RESET_USER, SET_USER } from "../actions/user";

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
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case RESET_USER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
