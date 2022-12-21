import { AxiosPromise } from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import baseAPI, {
  deleteLocalUser,
  getLocalUser,
  getUserById,
  LoggedUser,
  login as apiLogin,
  logout as apiLogout,
  mapUserRawToUser,
  setLocalUser,
} from "../api";
import { LoginForm } from "../user";

export interface ProviderAuthAPI {
  user: { currentUser: LoggedUser | null; initialized: boolean };
  login(user: LoginForm): AxiosPromise<LoggedUser>;
  logout(): Promise<void>;
}

export interface AuthAPIConnected extends ProviderAuthAPI {
  user: { currentUser: LoggedUser; initialized: boolean };
}

export const AuthContext = createContext<ProviderAuthAPI | null>(null);

export function useAuth(): ProviderAuthAPI {
  return useContext(AuthContext) as ProviderAuthAPI;
}

export function useProvideAuth(): ProviderAuthAPI {
  const [user, setUser] = useState<ProviderAuthAPI["user"]>({
    currentUser: null,
    initialized: false,
  });

  useEffect(() => {
    getLocalUser().then((user) => {
      if (user !== null) {
        baseAPI.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.xsrfToken}`;
        getUserById(user.id).then(
          (res) => {
            setUser({
              currentUser: { ...user, ...mapUserRawToUser(res.data) },
              initialized: true,
            });
          },
          (err) => {
            if (err?.response?.status === 401) {
              setUser({ currentUser: null, initialized: true });
            } else {
              setUser({
                currentUser: mapUserRawToUser(user),
                initialized: true,
              });
            }
          },
        );
      } else {
        setUser({ currentUser: null, initialized: true });
      }
    });
  }, []);

  useEffect(() => {
    if (user.initialized) {
      try {
        if (user.currentUser !== null) {
          setLocalUser(user.currentUser);
          baseAPI.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.currentUser.xsrfToken}`;
        } else {
          deleteLocalUser().then(() => {
            delete baseAPI.defaults.headers.common["Authorization"];
          });
        }
      } catch (e) {
        /* An error has occurred during storage modification */
      }
    }
  }, [user]);

  useEffect(() => {
    const interceptor = baseAPI.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          setUser({ currentUser: null, initialized: true });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      baseAPI.interceptors.response.eject(interceptor);
    };
  }, []);

  const login: ProviderAuthAPI["login"] = useCallback((u) => {
    return apiLogin(u).then((res) => {
      const newUser = res.data.user;
      baseAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newUser.xsrfToken}`;
      setUser({
        currentUser: mapUserRawToUser(res.data.user),
        initialized: true,
      });
      return {
        ...res,
        data: mapUserRawToUser(res.data.user),
      };
    });
  }, []);

  const logout: ProviderAuthAPI["logout"] = useCallback(() => {
    if (user !== null) setUser({ currentUser: null, initialized: true });
    return apiLogout().then(() => {
      return Promise.resolve();
    });
  }, [user]);

  return {
    user,
    login,
    logout,
  };
}

export const ProvideAuth = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const authAPI = useProvideAuth();

  return (
    <AuthContext.Provider value={authAPI}>{children}</AuthContext.Provider>
  );
};
