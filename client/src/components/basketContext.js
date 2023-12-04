import React, { createContext, useContext } from "react";
import { basket } from "./itemMaps"; // Import your MapFunctions instance

const BasketContext = createContext();

export const BasketProvider = ({ children }) => (
  <BasketContext.Provider value={basket}>{children}</BasketContext.Provider>
);

export const useBasket = () => useContext(BasketContext);
