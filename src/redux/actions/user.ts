import { IAction, IUser } from "../../interfaces";

export const SET_USER = "SET_USER";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const RESET_USER = "RESET_USER";

export const setUser = (user: IUser): IAction => ({
  type: SET_USER,
  payload: user,
});

export const setUserToken = (token: string): IAction => ({
  type: SET_USER_TOKEN,
  payload: token,
});

export const resetUser = () => ({
  type: RESET_USER,
});
