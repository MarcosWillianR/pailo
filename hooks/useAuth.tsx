import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    router.push("./");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn: handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside a AuthContext provider.");
  }

  return context;
}

export { AuthProvider, useAuth };
