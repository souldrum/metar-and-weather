import {
  createBarometerModifiedRow,
  createReportTimeModifiedRow,
  createTempModifiedRow,
  createUnmodifiedDataRow,
  createWindModifiedRow,
} from "../helpers/modifiedDataRows";
import {
  ApiResponseJsonType,
  ExtractMetarDataType,
  FetchOptionsType,
  MetarRequests,
} from "./metarService.types";

export default class MetarService implements MetarRequests {
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

  getDataRows = async (icao: string): Promise<ExtractMetarDataType> => {
    const res = await this.getData<ApiResponseJsonType>(icao);
    if (!res.results)
      throw new Error(`Invalid ICAO! Airport code ${icao} not found`);

    const [report] = res.data;

    const metar = report.raw_text;
    const airportName = report.station?.name;
    const location = report.station?.location;
    const reportTime = report.observed;
    const temp = report.temperature;
    const dewPoint = report.dewpoint;
    const wind = report.wind;
    const barometer = report.barometer;

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
