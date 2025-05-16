import React, { createContext, useContext, useState } from "react";

type Product = {
  id: number;
  name: string;
  quantity: number;
};

type ContextType = {
  lastProduct: Product | null;
  setLastProduct: (product: Product) => void;
};

const LastProductContext = createContext<ContextType>({
  lastProduct: null,
  setLastProduct: () => {},
});

export const useLastProduct = () => useContext(LastProductContext);

export function LastProductProvider({ children }: { children: React.ReactNode }) {
  const [lastProduct, setLastProduct] = useState<Product | null>(null);
  return (
    <LastProductContext.Provider value={{ lastProduct, setLastProduct }}>
      {children}
    </LastProductContext.Provider>
  );
}
