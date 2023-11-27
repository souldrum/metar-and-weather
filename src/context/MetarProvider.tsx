import { FC, PropsWithChildren, Reducer, useReducer } from "react";
import MetarService from "../services/metarService";
import { ExtractMetarDataType } from "../services/metarService.types";
import { MetarContext } from "./metarContext";

export type TransformDataType =
  | Omit<ExtractMetarDataType, "metar">
  | Record<string, never>;

type StateType = {
  icao: string;
  metar: string;
  transformData: TransformDataType;
  isLoading: boolean;
  errorData: string;
};

type ActionType =
  | { type: "SET_ICAO"; payload: string }
  | { type: "SET_METAR"; payload: string }
  | { type: "SET_DATA"; payload: TransformDataType }
  | { type: "LOADING"; payload: boolean }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

const { getDataRows } = new MetarService();

const initialState: StateType = {
  icao: "",
  metar: "",
  transformData: {},
  isLoading: false,
  errorData: "",
};

const reducer: Reducer<StateType, ActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_ICAO":
      return { ...state, icao: action.payload };
    case "SET_METAR":
      return { ...state, metar: action.payload };
    case "SET_DATA":
      return { ...state, transformData: action.payload };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    case "ERROR":
      return { ...state, errorData: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const MetarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIcao = (icao: string) =>
    dispatch({ type: "SET_ICAO", payload: icao });
  const setMetar = (metar: string) =>
    dispatch({ type: "SET_METAR", payload: metar });
  const setTransformData = (transformData: TransformDataType) =>
    dispatch({ type: "SET_DATA", payload: transformData });
  const setIsLoading = (loading: boolean) =>
    dispatch({ type: "LOADING", payload: loading });
  const resetData = () => dispatch({ type: "RESET" });
  const setErrorData = (error: string) =>
    dispatch({ type: "ERROR", payload: error });

  const loadMetar = () => {
    setIsLoading(true);
    getDataRows(state.icao)
      .then(({ metar, ...otherData }) => {
        setMetar(metar);
        setTransformData(otherData);
        setErrorData("");
      })
      .catch((e: Error) => {
        setErrorData(e.message);
        setMetar("");
        setTransformData({});
      })
      .finally(() => setIsLoading(false));
  };

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
