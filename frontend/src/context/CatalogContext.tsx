import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Product } from "../models/product";

interface CatalogContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  products: Product[] | null;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
  uniqueBrands: string[] | null;
  uniqueSizes: string[] | null;
  uniquePrice: string[] | null;
  filterOptions: FilterOptions; 
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
}

const defaultContextValue: CatalogContextType = {
  currentPage: 1,
  setCurrentPage: () => {},
  products: null,
  setProducts: () => {},
  uniqueBrands: null,
  uniqueSizes: null,
  uniquePrice: null,
  filterOptions: {
    brands: {},
    sizes: {},
    prices: {},
  },
  setFilterOptions: () => {},
};

export const CatalogContext = createContext<CatalogContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export interface FilterOptions {
  brands: { [key: string]: boolean };
  sizes: { [key: string]: boolean };
  prices: { [key: string]: boolean };
}

export const CatalogProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [uniquePrice, setUniquePrice] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: {},
    sizes: {},
    prices: {},
  });

  useEffect(() => {
    if (products) {
      const brands = Array.from(new Set(products.map((product: Product) => product.brand)));
      setUniqueBrands(brands);
      const sizes = Array.from(new Set(products.map((product: Product) => product.productSize)));
      setUniqueSizes(sizes);
      const prices = Array.from(new Set(products.map((product: Product) => product.price)));
      setUniquePrice(prices);
    }
  }, [products]);
  

  useEffect(() => {
    if (products) {
      const brands = Array.from(new Set(products.map((product: Product) => product.brand)));
      const storedFilterOptions = JSON.parse(localStorage.getItem('filterOptions') || '{}');
      setFilterOptions((prevFilterOptions) => ({
        ...prevFilterOptions,
        brands: { ...Object.fromEntries(brands.map((brand) => [brand, false])), ...storedFilterOptions.brands },
      }));
    }
  }, [products, setFilterOptions]);

  useEffect(() => {
    localStorage.setItem('filterOptions', JSON.stringify(filterOptions));
  }, [filterOptions]);

  return (
    <CatalogContext.Provider
      value={{ currentPage, setCurrentPage, products, setProducts, uniqueBrands, uniqueSizes, uniquePrice,filterOptions,setFilterOptions }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
