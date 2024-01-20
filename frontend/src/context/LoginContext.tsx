import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface LoginContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  userId?: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  userName: string | null;
  setUserName: Dispatch<SetStateAction<string | null>>;
}

const defaultContextValue: LoginContextType = {
  darkMode: false,
  setDarkMode: () => {},
  userId: null,
  setUserId: () => {},
  userName: null,
  setUserName: () => {},
};

export const LoginContext = createContext<LoginContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const LoginProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
      setDarkMode(true);
    }
    if (savedMode === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("userId-eshop");
    const userNumber = userString ? parseInt(userString) : null;

    if (userNumber != null) {
      setUserId(userNumber);
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username-eshop");
    setUserName(loggedInUser);
  }, []);

  return (
    <LoginContext.Provider value={{ darkMode, setDarkMode, userId, setUserId, userName, setUserName }}>
      {children}
    </LoginContext.Provider>
  );
};
