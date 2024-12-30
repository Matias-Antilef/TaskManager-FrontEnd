import React, { ReactNode, useContext, useEffect, useState } from "react";
import { UserModel } from "../models/UserModel";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../models/routes";
interface UserContextType {
  user: UserModel | null;
  createUser: (username: string, jwt: string) => void;
  logout: () => void;
}

export const userContext = React.createContext<UserContextType | undefined>(
  undefined
);

type UserProviderProps = {
  children: ReactNode;
};

export function useUserContext() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserModel | null>({
    username: "",
    jwt: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");

    if (jwt && username) {
      setUser({ username, jwt });
    }
  }, []);

  function createUser(jwt: string, username: string) {
    setUser({ username, jwt });

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("username", username);
  }

  function logout() {
    setUser(null);
    localStorage.clear();
    navigate(PublicRoutes.LOGIN, { replace: true });
  }

  return (
    <userContext.Provider value={{ user, createUser, logout }}>
      {children}
    </userContext.Provider>
  );
}
