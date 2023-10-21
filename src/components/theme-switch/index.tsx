import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { ThemeType } from "../../interfaces";
import { setAppThemeMode } from "../../redux/actions/app";

function ThemeSwitchButton() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state: RootState) => state.appReducer);
  const toggleTheme = () => {
    const updatedMode: ThemeType = themeMode === "dark" ? "light" : "dark";
    dispatch(setAppThemeMode(updatedMode));
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={themeMode === "dark"}
            onClick={() => toggleTheme()}
          />
        }
        label="Rwandan theme"
      />
    </FormGroup>
  );
}

export default ThemeSwitchButton;
