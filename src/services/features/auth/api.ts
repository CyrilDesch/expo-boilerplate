import axios, { AxiosPromise } from "axios";
import { User, LoginForm, UserRaw } from "./user";
import { baseURL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_STORAGE_USER_KEY = "user";

const baseAPI = axios.create({
  baseURL,
  xsrfCookieName: "access_token",
  xsrfHeaderName: "Authorization",
  url: "/",
  headers: {},
  timeout: 5000,
  withCredentials: true,
});

baseAPI.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-console
    //console.log("Res", response);
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    //console.log("Error", error, error.config, error.response);
    return Promise.reject(error);
  },
);

export interface LoggedUserRaw extends UserRaw {
  xsrfToken: string;
}

export interface LoggedUser extends User {
  xsrfToken: string;
}

export function logout(): AxiosPromise<void> {
  return baseAPI.get("/logout");
}

export function mapUserRawToUser(user: LoggedUserRaw): LoggedUser;
export function mapUserRawToUser(user: UserRaw): User;
export function mapUserRawToUser(
  user: LoggedUserRaw | UserRaw,
): LoggedUser | User {
  return {
    ...user,
    xsrfToken: "xsrfToken" in user ? user.xsrfToken : undefined,
  };
}

export function login(user: LoginForm): AxiosPromise<{
  user: LoggedUserRaw;
  message: string;
}> {
  return baseAPI.post("/login", user);
}

export async function getLocalUser(): Promise<LoggedUserRaw> {
  return JSON.parse(
    (await AsyncStorage.getItem(LOCAL_STORAGE_USER_KEY)) as string,
  );
}

export async function setLocalUser(user: LoggedUser): Promise<void> {
  return AsyncStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}

export async function isSetLocalUser(): Promise<boolean> {
  return (await AsyncStorage.getItem("user")) !== null;
}

export function deleteLocalUser(): Promise<void> {
  return AsyncStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export function getUserById(id: User["id"]): AxiosPromise<UserRaw> {
  return baseAPI.get("/users/" + id);
}

export default baseAPI;
