import React from "react";
import { MetarContext } from "../context/metarContext";

const useApp = () => {
  const result = React.useContext(MetarContext);

  return result;
};

export default useApp;
