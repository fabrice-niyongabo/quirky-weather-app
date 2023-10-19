import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./views/home"));
const WeatherInfo = lazy(() => import("./views/weather-info"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:swedenCity/:rwandanCity" element={<WeatherInfo />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" />
    </>
  );
}

export default App;
