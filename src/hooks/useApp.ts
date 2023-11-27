import { useContext } from "react";
import { MetarContext } from "../context/metarContext";

const useApp = () => {
  const result = useContext(MetarContext);

  return result;
};

export default useApp;
