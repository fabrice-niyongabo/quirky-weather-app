import { IAction, IUser } from "../../interfaces";

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export const setUser = (user: IUser, token: string): IAction => ({
  type: SET_USER,
  payload: { user, token },
});

export const resetUser = () => ({
  type: RESET_USER,
});
