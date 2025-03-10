import { ReactNode } from "react";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const loggedInUserEmail =
    (import.meta.env.VITE_LOGGED_IN_USER_EMAIL as string) || null;

  const value = {
    loggedInUserEmail,
    isLoggedIn: !!loggedInUserEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
