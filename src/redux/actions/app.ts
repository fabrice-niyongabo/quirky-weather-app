import { IAction, ICityImage } from "../../interfaces";

export const SET_SWEDEN_CITY = "SET_SWEDEN_CITY";
export const SET_RWANDAN_CITY = "SET_RWANDAN_CITY";
export const SET_RWANDAN_CITY_IMAGES = "SET_RWANDAN_CITY_IMAGES";
export const SET_SWEDEN_CITY_IMAGES = "SET_SWEDEN_CITY_IMAGES";
export const RESET_APP = "RESET_APP";

export const setRwandanCity = (city: string): IAction => ({
  type: SET_RWANDAN_CITY,
  payload: city,
});

export const setSwedenCity = (city: string): IAction => ({
  type: SET_SWEDEN_CITY,
  payload: city,
});

export const setRwandanCityImages = (images: ICityImage[]): IAction => ({
  type: SET_RWANDAN_CITY_IMAGES,
  payload: images,
});

export const setSwedenCityImages = (images: ICityImage[]): IAction => ({
  type: SET_SWEDEN_CITY_IMAGES,
  payload: images,
});

export const resetApp = () => ({
  type: RESET_APP,
});
