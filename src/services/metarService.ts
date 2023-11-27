import {
  createBarometerModifiedRow,
  createReportTimeModifiedRow,
  createTempModifiedRow,
  createUnmodifiedDataRow,
  createWindModifiedRow,
} from "../helpers/modifiedDataRows";
import { ApiResponseJsonType, FetchOptionsType } from "./metarService.types";

export default class MetarService {
  private API_BASE = "https://api.checkwx.com/metar/";

  getData = async <T>(icao: string): Promise<T> => {
    const URL = `${this.API_BASE}${icao}/decoded`;

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", import.meta.env.VITE_METAR_API_KEY);

    const options: FetchOptionsType = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const res = await fetch(URL, options);
      if (!res.ok) {
        throw new Error(`Could not fetch ${URL}, received ${res.status}`);
      }
      const json = await res.json();
      return json;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error(`Unknown error type ${error}`);
    }
  };

  getDataRows = async (icao: string) => {
    const res = await this.getData<ApiResponseJsonType>(icao);

    const data = res.data[0];

    const metar = data.raw_text;
    const airportName = data.station?.name;
    const location = data.station?.location;
    const reportTime = data.observed;
    const temp = data.temperature;
    const dewPoint = data.dewpoint;
    const wind = data.wind;
    const barometer = data.barometer;

    return {
      metar,
      airportName: createUnmodifiedDataRow("Airport ✈:", airportName),
      location: createUnmodifiedDataRow("Location 🌍:", location),
      reportTime: createReportTimeModifiedRow("Report Time ⌚:", reportTime),
      temp: createTempModifiedRow("Air Temperature 🌡:", temp),
      dewPoint: createTempModifiedRow("Dew Point 💧:", dewPoint),
      windData: createWindModifiedRow("Wind:", wind),
      barometerData: createBarometerModifiedRow("QNH:", barometer),
    };
  };
}
