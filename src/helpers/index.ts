import { toast } from "react-toastify";
import { ToastMessageTypes } from "../interfaces";
import { googleLogout } from "@react-oauth/google";
export const handleAuthError = (error: any) => {
  try {
    if (error?.response?.status === 401) {
      googleLogout();
      //@ts-ignore
      window.location = "/";
      //@ts-ignore
    }
  } catch (error) {
    //@ts-ignore
    window.location = "/";
    //@ts-ignore
  }
};

export const toastMessage = (type: ToastMessageTypes, message: string) => {
  if (type === "info") {
    toast.info(message);
  }
  if (type === "error") {
    toast.error(message);
  }
  if (type === "success") {
    toast.success(message);
  }
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.msg) {
    toastMessage("error", error.response.data.msg);
  } else if (error?.msg) {
    toastMessage("error", error.msg);
  } else {
    toastMessage("error", error.message);
  }
  handleAuthError(error);
};
