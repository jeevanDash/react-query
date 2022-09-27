import React from "react";
import { useState } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [fetchType, setFetchType] = useState({
    Cache: true,
    Stale: false,
    Refetch: false,
  });

  const value = {
    fetchType,
    setFetchType,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
