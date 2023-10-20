import { IAction, ICityImage, ICityWeatherInfo } from "../../interfaces";
import {
  RESET_APP,
  SET_RWANDAN_CITY,
  SET_RWANDAN_CITY_IMAGES,
  SET_RWANDAN_CITY_WEATHER_INFO,
  SET_SWEDEN_CITY,
  SET_SWEDEN_CITY_IMAGES,
  SET_SWEDEN_CITY_WEATHER_INFO,
  SET_APP_THEME_MODE,
} from "../actions/app";

interface IAppReducer {
  swedenCity: string;
  rwandanCity: string;
  themeMode: "light" | "dark";
  rwandanCityImages: ICityImage[];
  swedenCityImages: ICityImage[];
  swedenCityWeatherInfo: ICityWeatherInfo | undefined;
  rwandanCityWeatherInfo: ICityWeatherInfo | undefined;
}

const initialState: IAppReducer = {
  swedenCity: "",
  rwandanCity: "",
  themeMode: "dark",
  rwandanCityImages: [],
  swedenCityImages: [],
  rwandanCityWeatherInfo: undefined,
  swedenCityWeatherInfo: undefined,
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
    case SET_RWANDAN_CITY_WEATHER_INFO:
      return { ...state, rwandanCityWeatherInfo: action.payload };
    case SET_SWEDEN_CITY_WEATHER_INFO:
      return { ...state, swedenCityWeatherInfo: action.payload };
    case SET_APP_THEME_MODE:
      return { ...state, themeMode: action.payload };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default appReducer;
