import { IAction, ISelectedCities } from "../../interfaces";
import { RESET_APP, SET_SELECTED_CITIES } from "../actions/app";

interface IAppReducer {
  selectedCities: ISelectedCities;
}

const initialState: IAppReducer = {
  selectedCities: { rwanda: "", sweden: "" },
};

const appReducer = (
  state: IAppReducer = initialState,
  action: IAction
): IAppReducer => {
  switch (action.type) {
    case SET_SELECTED_CITIES:
      return { ...state, selectedCities: action.payload };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default appReducer;
