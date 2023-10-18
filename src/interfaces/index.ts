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
