import { IAction, ISelectedCities } from "../../interfaces";

export const SET_SELECTED_CITIES = "SET_SELECTED_CITIES";
export const RESET_APP = "RESET_APP";

export const setSelectedCities = (cities: ISelectedCities): IAction => ({
  type: SET_SELECTED_CITIES,
  payload: cities,
});

export const resetApp = () => ({
  type: RESET_APP,
});
