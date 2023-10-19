export interface IAction {
  type: string;
  payload: any;
}

export interface ICityImage {
  id: string;
  width: number;
  height: number;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICityWeatherInfo {
  temperature: number;
  windSpeed: number;
  icon: string;
  humidity: number;
  pressure: number;
  description: string;
}

export interface IweatherReaponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  message?: string;
}

export interface IJoke {
  error: boolean;
  joke: string;
}

export type cityTpe = "Rwandan" | "Sweden";

export type ToastMessageTypes = "error" | "info" | "success";

export interface IUser {
  fName: string;
  lName: string;
  email: string;
  image: string;
  createdAt: string;
}
