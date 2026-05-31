import { ISignIn } from "@/components/types";
import { storageKeys } from "@/config/storageKeys";
import { AuthService } from "@/services/AuthService";
import { httpClient } from "@/services/httpClient";
import { createContext, useCallback, useLayoutEffect, useRef, useState } from "react";

interface IAuthcontextValue {
  signedIn: boolean;
  signIn(formData: any): Promise<{ accessToken: string | undefined, refreshToken: string | undefined }>;
}

export const AuthContext = createContext({} as IAuthcontextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken)
  });
  const isRefreshing = useRef(false);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storageKeys.accessToken);

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return (() => {
      httpClient.interceptors.request.eject(interceptorId);
    })
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const storageRefreshToken = localStorage.getItem(storageKeys.refreshToken);
        const originalRequest = error.config;
        if (error.response && error.response.status === 409 || !storageRefreshToken) {
          setSignedIn(false);
          localStorage.removeItem(storageKeys.accessToken);
          localStorage.removeItem(storageKeys.refreshToken);
          return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 && !isRefreshing.current) {
          isRefreshing.current = true;
          try{
          const { accessToken, refreshToken } = await AuthService.refreshToken(storageRefreshToken);
          localStorage.setItem(storageKeys.accessToken, accessToken);
          localStorage.setItem(storageKeys.refreshToken, refreshToken);
          originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
          return httpClient(originalRequest);
          } catch (refreshError) {
            setSignedIn(false);
            localStorage.removeItem(storageKeys.accessToken);
            localStorage.removeItem(storageKeys.refreshToken);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing.current = false;
          }
        };
        return Promise.reject(error);
      }
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: ISignIn) => {
    const { accessToken, refreshToken } = await AuthService.signIn({ email, password });
    setSignedIn(true);
    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
    return { accessToken, refreshToken };
  }, []);

  const value: IAuthcontextValue = {
    signedIn,
    signIn,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
