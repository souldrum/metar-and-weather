import {
  BarometerType,
  TemperatureType,
  WindType,
} from "../services/metarService.types";
import { ArrowDirectionType, DataRowType } from "./modifiedDataRows.types";

export const createUnmodifiedDataRow = (
  title: string,
  data?: string
): DataRowType => (!data ? createDataRow(title) : createDataRow(title, data));

export const createReportTimeModifiedRow = (
  title: string,
  data?: string
): DataRowType => {
  if (!data) return createDataRow(title);

  const extractDate = data.match(/\d{4}-\d\d-\d\d/);
  const extractTime = data.match(/\d\d:\d\d/);
  if (!extractDate || !extractTime) {
    console.log(data);
    return createDataRow(title, "Unknown data format ☹");
  }

  const date = extractDate[0].split("-").reverse().join(".");
  const time = extractTime[0];
  const localTimeReport = getLocalHours(time);
  const stringInfoTime = `${date}, ${time} UTC (${localTimeReport} Your Local)`;

  return createDataRow(title, stringInfoTime);
};

export const createTempModifiedRow = (
  title: string,
  temp?: TemperatureType
): DataRowType => {
  if (!temp) return createDataRow(title);

  const { celsius: t } = temp;
  if (t > 0) return createDataRow(title, `+${t}`);

  return createDataRow(title, `${t}`);
};

export const createWindModifiedRow = (
  title: string,
  wind?: WindType
): DataRowType => {
  if (!wind) return createDataRow(title, "Calm");

  const { degrees, speed_mps: mps, speed_kts: kt } = wind;
  if (!degrees) return createDataRow(title, `Variable, ${mps} mps (${kt} kt)`);

  const arrow = createArrowDirection(degrees);
  const standardWindData = `${degrees} degrees ${arrow}, ${mps} mps (${kt} kt)`;

  return createDataRow(title, standardWindData);
};

export const createBarometerModifiedRow = (
  title: string,
  barometer?: BarometerType
): DataRowType => {
  if (!barometer) return createDataRow(title);

  const { hpa, hg } = barometer;

  let formatHg = hg.toString().padEnd(5, "0");
  if (hg.toString().length === 2) formatHg = `${hg}.00`;

  const stringBarometerData = `${hpa} hPa (${formatHg} inHg)`;

  return createDataRow(title, stringBarometerData);
};

export function createDataRow(
  title: string,
  data: string = "no data ☹☹☹"
): DataRowType {
  return {
    title,
    data,
  };
}

export function createArrowDirection(value: number): ArrowDirectionType {
  if (value >= 350 && value <= 360) return "⬇";
  if (value > 0 && value <= 10) return "⬇";
  if (value > 10 && value < 80) return "↙";
  if (value >= 80 && value <= 100) return "⬅";
  if (value > 100 && value < 170) return "↖";
  if (value >= 170 && value <= 190) return "⬆";
  if (value > 190 && value < 260) return "↗";
  if (value >= 260 && value <= 280) return "➡";
  if (value > 280 && value < 350) return "↘";

  return "";
}

export function getLocalHours(time: string): string {
  const hours = time.slice(0, 2);
  const minutes = time.slice(2);
  const localHours = (Number(hours) - new Date().getTimezoneOffset() / 60) % 24;
  const localHoursString = localHours.toString().padStart(2, "0");
  const localTimeReport = `${localHoursString}${minutes}`;

  return localTimeReport;
}
