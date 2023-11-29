import React from "react";
import { MetarContext } from "./metarContext";
import { useMetarProvider } from "./useMetarProvider";

const MetarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { state, setIcao, setMetar, setTransformData, resetData, loadMetar } =
    useMetarProvider();

  return (
    <MetarContext.Provider
      value={{
        ...state,
        setIcao,
        setMetar,
        setTransformData,
        resetData,
        loadMetar,
      }}
    >
      {children}
    </MetarContext.Provider>
  );
};

export default MetarProvider;
