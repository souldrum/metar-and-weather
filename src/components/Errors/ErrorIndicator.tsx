import { FC } from "react";
import Error404 from "./Error404";
import ErrorIcao from "./ErrorIcao";

type PropsType = { errorData: string };

const ErrorIndicator: FC<PropsType> = ({ errorData }) => {
  if (errorData.startsWith("Invalid ICAO")) return <ErrorIcao />;

  return <Error404 errorData={errorData} />;
};

export default ErrorIndicator;
