import { DataRowType } from "../helpers/modifiedDataRows.types";

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export interface ApiResponseJsonType {
  results: number;
  data: WeatherData[];
}

export type WeatherData = {
  icao: string;
  barometer: BarometerType;
  ceiling: CeilingType;
  clouds: CloudType[];
  dewpoint: TemperatureType;
  elevation: CeilingType;
  flight_category: string;
  humidity: HumidityType;
  observed: string;
  station: StationType;
  temperature: TemperatureType;
  raw_text: string;
  visibility: VisibilityType;
  wind: WindType;
};

export type WindType = {
  degrees: number;
  speed_kph?: number;
  speed_kts: number;
  speed_mph?: number;
  speed_mps: number;
};

export type VisibilityType = {
  miles?: string;
  miles_float?: number;
  meters?: string;
  meters_float?: number;
};

export type StationType = {
  geometry?: GeometryType;
  location: string;
  name: string;
  type?: string;
};

export type GeometryType = {
  coordinates?: number[];
  type?: string;
};

export type HumidityType = {
  percent?: number;
};

export type TemperatureType = {
  celsius: number;
  fahrenheit?: number;
};

export type CloudType = {
  base_feet_agl?: number;
  base_meters_agl?: number;
  code?: string;
  text?: string;
  feet?: number;
  meters?: number;
};

export type CeilingType = {
  feet?: number;
  meters?: number;
};

export type BarometerType = {
  hg: number;
  hpa: number;
};

export type FetchOptionsType = {
  method: "GET" | "POST";
  headers: Headers;
  redirect: RequestRedirect | undefined;
};

export type ExtractMetarDataType = {
  metar: string;
  airportName: DataRowType;
  location: DataRowType;
  reportTime: DataRowType;
  temp: DataRowType;
  dewPoint: DataRowType;
  windData: DataRowType;
  barometerData: DataRowType;
};
