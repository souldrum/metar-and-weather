import { useRef } from "react";

export const useSeasonColor = () => {
  const seasonRef = useRef("");

  const month = new Date().getMonth();

  switch (month) {
    case 11:
    case 0:
    case 1:
      seasonRef.current = "winter";
      break;
    case 2:
    case 3:
    case 4:
      seasonRef.current = "spring";
      break;
    case 5:
    case 6:
    case 7:
      seasonRef.current = "summer";
      break;
    case 8:
    case 9:
    case 10:
      seasonRef.current = "autumn";
      break;
    default:
      break;
  }

  return seasonRef.current;
};
