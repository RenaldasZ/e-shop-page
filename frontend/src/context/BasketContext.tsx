import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Basket } from "../models/basket";

interface BasketContextType {
  basket: Basket[] | null;
  setBasket: Dispatch<SetStateAction<Basket[] | null>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const defaultContextValue: BasketContextType = {
  basket: null,
  setBasket: () => {},
  count: 0,
  setCount: () => {},
};

export const BasketContext = createContext<BasketContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const BasketProvider = ({ children }: Props) => {
  const [basket, setBasket] = useState<Basket[] | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      const basketItems = JSON.parse(storedBasket);
      setBasket(basketItems);
    }
  }, [setBasket]);

  useEffect(() => {
    if (basket) {
      const newCount = basket.reduce((sum, item) => sum + item.selectedQuantity, 0);
      setCount(newCount);
    }
  }, [basket]);

  return <BasketContext.Provider value={{ basket, setBasket, count, setCount }}>{children}</BasketContext.Provider>;
};
