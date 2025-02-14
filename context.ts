import React, { useContext } from "react";

export const DBContext = React.createContext<any>({});

export const useDB = () => {
  return useContext(DBContext);
};
