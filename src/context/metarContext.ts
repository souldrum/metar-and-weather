import { createContext } from "react";
import { TransformDataType } from "./MetarProvider";

export type ContextValue = {
  icao: string;
  metar: string;
  transformData: TransformDataType;
  isLoading: boolean;
  errorData: string;
  setIcao: (icao: string) => void;
  setMetar: (metar: string) => void;
  setTransformData: (transformData: TransformDataType) => void;
  resetData: () => void;
  loadMetar: () => void;
};

const defaultValue: ContextValue = {
  icao: "",
  metar: "",
  transformData: {},
  isLoading: false,
  errorData: "",
  setIcao: () => {},
  setMetar: () => {},
  setTransformData: () => {},
  resetData: () => {},
  loadMetar: () => {},
};

export const MetarContext = createContext<ContextValue>(defaultValue);
