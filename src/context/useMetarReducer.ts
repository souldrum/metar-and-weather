import React from "react";
import { ExtractMetarDataType } from "../services/metarService.types";

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

export const enum AT {
  SET_ICAO = "SET_ICAO",
  SET_METAR = "SET_METAR",
  SET_DATA = "SET_DATA",
  LOADING = "LOADING",
  ERROR = "ERROR",
  RESET = "RESET",
}

type ActionType =
  | { type: AT.SET_ICAO; payload: string }
  | { type: AT.SET_METAR; payload: string }
  | { type: AT.SET_DATA; payload: TransformDataType }
  | { type: AT.LOADING; payload: boolean }
  | { type: AT.ERROR; payload: string }
  | { type: AT.RESET };

export const useMetarReducer = () => {
  const initialState: StateType = {
    icao: "",
    metar: "",
    transformData: {},
    isLoading: false,
    errorData: "",
  };

  const reducer: React.Reducer<StateType, ActionType> = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case AT.SET_ICAO:
        return { ...state, icao: action.payload };
      case AT.SET_METAR:
        return { ...state, metar: action.payload };
      case AT.SET_DATA:
        return { ...state, transformData: action.payload };
      case AT.LOADING:
        return { ...state, isLoading: action.payload };
      case AT.ERROR:
        return { ...state, errorData: action.payload };
      case AT.RESET:
        return initialState;
      default:
        return state;
    }
  };

  return { initialState, reducer };
};
