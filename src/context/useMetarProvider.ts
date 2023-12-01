import React from "react";
import MetarService from "../services/metarService";
import { AT, TransformDataType, useMetarReducer } from "./useMetarReducer";

export const useMetarProvider = () => {
  const { initialState, reducer } = useMetarReducer();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setIcao = (icao: string) =>
    dispatch({ type: AT.SET_ICAO, payload: icao });
  const setMetar = (metar: string) =>
    dispatch({ type: AT.SET_METAR, payload: metar });
  const setTransformData = (transformData: TransformDataType) =>
    dispatch({ type: AT.SET_DATA, payload: transformData });
  const setIsLoading = (loading: boolean) =>
    dispatch({ type: AT.LOADING, payload: loading });
  const resetData = () => dispatch({ type: AT.RESET });
  const setErrorData = (error: string) =>
    dispatch({ type: AT.ERROR, payload: error });

  const loadMetar = () => {
    setIsLoading(true);
    MetarService.getDataRows(state.icao)
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

  return {
    state,
    setIcao,
    setMetar,
    setTransformData,
    setIsLoading,
    resetData,
    setErrorData,
    loadMetar,
  };
};
