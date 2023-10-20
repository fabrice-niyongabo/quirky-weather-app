import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./controllers/protected-route";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

const Home = lazy(() => import("./views/home"));
const WeatherInfo = lazy(() => import("./views/weather-info"));
const SavedWeathers = lazy(() => import("./views/saved-weathers"));

function App() {
  const { themeMode } = useSelector((state: RootState) => state.appReducer);
  const theme =
    themeMode === "dark"
      ? createTheme({
          palette: {
            mode: "dark",
          },
        })
      : createTheme({
          palette: {
            mode: "light",
          },
        });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:swedenCity/:rwandanCity" element={<WeatherInfo />} />
          <Route
            path="/weathers"
            element={
              <ProtectedRoute>
                <SavedWeathers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" />
    </ThemeProvider>
  );
}

export default App;
