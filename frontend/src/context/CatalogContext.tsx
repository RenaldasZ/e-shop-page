import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface CatalogContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const defaultContextValue: CatalogContextType = {
  currentPage: 1,
  setCurrentPage: () => {},
};

export const CatalogContext = createContext<CatalogContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const CatalogProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return <CatalogContext.Provider value={{ currentPage, setCurrentPage }}>{children}</CatalogContext.Provider>;
};
