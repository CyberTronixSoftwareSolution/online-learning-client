import { createContext, useContext, useState } from "react";
import { LocalStorageService } from "../localStorage.service";

interface User {
  _id: string;
  role: string;
  email: string;
}

interface AuthContextType {
  authUser: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(() => {
    const userId = LocalStorageService.getUserId();
    const userRole = LocalStorageService.getUserRole();
    const userEmail = LocalStorageService.getUserEmail();

    if (userId && userRole && userEmail) {
      return { _id: userId, role: userRole, email: userEmail };
    }

    return null;
  });

  const setUser = (user: User) => {
    setAuthUser({ _id: user._id, role: user.role, email: user.email });
  };

  return (
    <AuthContext.Provider value={{ authUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
