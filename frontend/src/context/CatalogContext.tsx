import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Product } from "../models/product";

interface CatalogContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  products: Product[] | null;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
  uniqueBrands: string[] | null;
  uniqueSizes: string[] | null;
  uniquePrice: number[] | null;
  filterOptions: FilterOptions;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  filteredProducts: Product[] | null;
  setFilteredProducts: Dispatch<SetStateAction<Product[] | null>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
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
    maxPrice: 0,
  },
  setFilterOptions: () => {},
  loading: true,
  setLoading: () => {},
  filteredProducts: null,
  setFilteredProducts: () => {},
  totalCount: 0,
  setTotalCount: () => {},
};

export const CatalogContext = createContext<CatalogContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export interface FilterOptions {
  brands: { [key: string]: boolean };
  sizes: { [key: string]: boolean };
  maxPrice?: number;
}

export const CatalogProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [uniquePrice, setUniquePrice] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: {},
    sizes: {},
    maxPrice: 0,
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
      const sizes = Array.from(new Set(products.map((product: Product) => product.productSize)));
      const storedFilterOptions = JSON.parse(localStorage.getItem("filterOptions") || "{}");
      setFilterOptions((prevFilterOptions) => ({
        ...prevFilterOptions,
        brands: { ...Object.fromEntries(brands.map((brand) => [brand, false])), ...storedFilterOptions.brands },
        sizes: { ...Object.fromEntries(sizes.map((size) => [size, false])), ...storedFilterOptions.sizes },
        maxPrice: storedFilterOptions.maxPrice,
      }));
    }
  }, [products, setFilterOptions]);

  useEffect(() => {
    localStorage.setItem("filterOptions", JSON.stringify(filterOptions));
  }, [filterOptions]);

  return (
    <CatalogContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        products,
        setProducts,
        uniqueBrands,
        uniqueSizes,
        uniquePrice,
        filterOptions,
        setFilterOptions,
        loading,
        setLoading,
        filteredProducts,
        setFilteredProducts,
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
