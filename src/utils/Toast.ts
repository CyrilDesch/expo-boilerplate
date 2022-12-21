import Toast from "react-native-root-toast";

import { darkGreen, orange, red } from "../assets/constants/Colors";

export type ToastFunction = (message: string, duration?: number) => void;

export function showToast(
  message: string,
  backgroundColor: string | undefined,
  duration: number = 10000,
  hideOnPress: boolean = true,
): void {
  Toast.show(message, {
    duration,
    position: Toast.positions.TOP,
    containerStyle: {
      marginTop: 20,
    },
    backgroundColor,
    hideOnPress,
    opacity: 1,
    shadow: true,
    animation: true,
    delay: 0,
  });
}

export const showInfoToast: ToastFunction = (message, duration) => {
  showToast(message, undefined, duration);
};

export const showSuccessToast: ToastFunction = (message, duration) => {
  showToast(message, darkGreen, duration);
};

export const showErrorToast: ToastFunction = (message, duration) => {
  showToast(message, red, duration, false);
};

export const showWarningToast: ToastFunction = (message, duration) => {
  showToast(message, orange, duration);
};
