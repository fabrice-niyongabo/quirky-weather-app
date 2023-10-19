import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./controllers/protected-route";

const Home = lazy(() => import("./views/home"));
const WeatherInfo = lazy(() => import("./views/weather-info"));
const SavedWeathers = lazy(() => import("./views/saved-weathers"));

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
