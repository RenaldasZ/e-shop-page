import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface LoginContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: LoginContextType = {
  darkMode: false,
  setDarkMode: () => {},
};

export const LoginContext = createContext<LoginContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const LoginProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
      setDarkMode(true);
    }
    if (savedMode === "light") {
      setDarkMode(false);
    }
  }, []);

  return <LoginContext.Provider value={{ darkMode, setDarkMode }}>{children}</LoginContext.Provider>;
};
