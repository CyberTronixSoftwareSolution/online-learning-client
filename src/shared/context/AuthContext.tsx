import { createContext, useContext, useState } from "react";
import { LocalStorageService } from "../localStorage.service";

interface User {
  _id: string;
  role: string;
  email: string;
}

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    LocalStorageService.getUserId() !== null
      ? {
          userId: LocalStorageService.getUserId(),
          role: LocalStorageService.getUserRole(),
          email: LocalStorageService.getUserEmail(),
        }
      : null
  );

  const setUser = (user: User) => {
    setAuthUser({
      userId: user?._id || "0",
      role: user?.role || "",
      email: user?.email || "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
