import { IAction, ICityImage } from "../../interfaces";
import {
  RESET_APP,
  SET_RWANDAN_CITY,
  SET_RWANDAN_CITY_IMAGES,
  SET_SWEDEN_CITY,
  SET_SWEDEN_CITY_IMAGES,
} from "../actions/app";

interface IAppReducer {
  swedenCity: string;
  rwandanCity: string;
  rwandanCityImages: ICityImage[];
  swedenCityImages: ICityImage[];
}

const initialState: IAppReducer = {
  swedenCity: "",
  rwandanCity: "",
  rwandanCityImages: [],
  swedenCityImages: [],
};

const appReducer = (
  state: IAppReducer = initialState,
  action: IAction
): IAppReducer => {
  switch (action.type) {
    case SET_RWANDAN_CITY:
      return { ...state, rwandanCity: action.payload };
    case SET_SWEDEN_CITY:
      return { ...state, swedenCity: action.payload };
    case SET_RWANDAN_CITY_IMAGES:
      return { ...state, rwandanCityImages: action.payload };
    case SET_SWEDEN_CITY_IMAGES:
      return { ...state, swedenCityImages: action.payload };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default appReducer;
