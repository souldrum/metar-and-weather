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

type ActionType =
  | { type: "SET_ICAO"; payload: string }
  | { type: "SET_METAR"; payload: string }
  | { type: "SET_DATA"; payload: TransformDataType }
  | { type: "LOADING"; payload: boolean }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

export const useMetarStore = () => {
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

  return { initialState, reducer };
};
