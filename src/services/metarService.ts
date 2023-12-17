import {
  createBarometerModifiedRow,
  createReportTimeModifiedRow,
  createTempModifiedRow,
  createUnmodifiedDataRow,
  createWindModifiedRow,
} from "../utils/modifiedDataRows";
import {
  ApiResponseJsonType,
  ExtractMetarDataType,
} from "./metarService.types";

export default class MetarService {
  static getData = async (icao: string): Promise<ApiResponseJsonType> => {
    const URL = `/.netlify/functions/api-data/api-data?icao=${icao}`;

    try {
      const res = await fetch(URL);
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

  static getDataRows = async (icao: string): Promise<ExtractMetarDataType> => {
    const res = await this.getData(icao);
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
