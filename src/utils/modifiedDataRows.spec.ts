import { describe, expect, it, vitest } from "vitest";
import {
  createArrowDirection,
  createBarometerModifiedRow,
  createDataRow,
  createReportTimeModifiedRow,
  createTempModifiedRow,
  createUnmodifiedDataRow,
  createWindModifiedRow,
  getLocalHours,
} from "./modifiedDataRows";
import { DataRowType } from "./modifiedDataRows.types";

const isNoData = {
  title: "test",
  data: "no data ☹☹☹",
};

type MustBeType = typeof isNoData;
type ModifiedType = (title: string) => DataRowType;

const expectWithOneArg = (fn: ModifiedType, mustBe: MustBeType = isNoData) => {
  expect(fn("test")).toEqual(mustBe);
};

//createDataRow
describe("Проверка createDataRow", () => {
  it("Если не передан второй аргумент, возвращаем 'no data ☹☹☹'", () => {
    expectWithOneArg(createDataRow);
  });
});

//Проверка createUnmodifiedDataRow
describe("Проверка createUnmodifiedDataRow", () => {
  it("Если не передан второй аргумент, возвращаем 'no data ☹☹☹'", () => {
    expectWithOneArg(createUnmodifiedDataRow);
  });

  it("Принимая данные, возвращаем их без изменений", () => {
    expect(createUnmodifiedDataRow("test title", "test data")).toEqual({
      title: "test title",
      data: "test data",
    });
  });
});

//createReportTimeModifiedRow
describe("Проверка createReportTimeModifiedRow", () => {
  const correctFormatData = "2023-11-19T13:45:00";
  const incorrectFormatDate = "2023/11/19T13:45:00";
  const incorrectFormatTime = "2023-11-19T1345";

  const incorrectFormatRender = {
    title: "test",
    data: "Unknown data format ☹",
  };

  const extractTime = correctFormatData.slice(-8, -3); //13:45
  const localTime = getLocalHours(extractTime);

  it("Если не передан второй аргумент, возвращаем 'no data ☹☹☹'", () => {
    expectWithOneArg(createReportTimeModifiedRow);
  });

  it("Проверяем локальные часы для возврата (читайте комментарии внутри!)", () => {
    //мой часовой пояс UTC+5, поэтому от 13:45 ожидаю 18:45
    //если тест упал — подставьте вместо 18 разницу вашего часового пояса от 13 часов (например, если UTC+2, то 15, если UTC-2, то 11)

    expect(localTime).toBe("18:45"); //UTC+5
  });

  it("Принимая на вход часы < 10, возвращаем значение, начинающееся с нуля", () => {
    expect(getLocalHours("01:30")).toBe("06:30"); //UTC+5
  });

  it("Принимая данные в ожидаемом формате, возвращаем их в оформленной строке", () => {
    expect(createReportTimeModifiedRow("test", correctFormatData)).toEqual({
      title: "test",
      data: `19.11.2023, 13:45 UTC (${localTime} Your Local)`,
    });
  });

  it("Принимая данные с измененным форматом даты, возвращаем 'Unknown data format ☹'", () => {
    expect(createReportTimeModifiedRow("test", incorrectFormatDate)).toEqual(
      incorrectFormatRender
    );
  });

  it("Принимая данные с измененным форматом времени, возвращаем 'Unknown data format ☹'", () => {
    expect(createReportTimeModifiedRow("test", incorrectFormatTime)).toEqual(
      incorrectFormatRender
    );
  });

  it("Принимая данные с измененным форматом, выводим данные в консоль", () => {
    console.log = vitest.fn();
    createReportTimeModifiedRow("test", incorrectFormatTime);

    expect(console.log).toHaveBeenCalledWith(incorrectFormatTime);
  });
});

//createTempModifiedRow
describe("Проверка createTempModifiedRow", () => {
  const tZero = { celsius: 0 };
  const tPlus = { celsius: 5 };
  const tMinus = { celsius: -5 };

  it("Если не передан второй аргумент, возвращаем 'no data ☹☹☹'", () => {
    expectWithOneArg(createTempModifiedRow);
  });

  it("Если второй аргумент 0, возвращаем строку '0'", () => {
    expect(createTempModifiedRow("test", tZero)).toEqual({
      title: "test",
      data: "0",
    });
  });

  it("Принимая положительное число, добавляем в начале +", () => {
    expect(createTempModifiedRow("test", tPlus)).toEqual({
      title: "test",
      data: "+5",
    });
  });

  it("Принимая отрицательное число, возвращаем это число в виде строки", () => {
    expect(createTempModifiedRow("test", tMinus)).toEqual({
      title: "test",
      data: "-5",
    });
  });
});

//createArrowDirection
describe("Проверка createArrowDirection", () => {
  const N = [350, 360, 10];
  const NE = [20, 30, 40, 50, 60, 70];
  const E = [80, 90, 100];
  const SE = [110, 120, 130, 140, 150, 160];
  const S = [170, 180, 190];
  const SW = [200, 210, 220, 230, 240, 250];
  const W = [260, 270, 280];
  const NW = [290, 300, 310, 320, 330, 340];

  N.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '⬇'`, () => {
      expect(createArrowDirection(d)).toBe("⬇");
    });
  });

  NE.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '↙'`, () => {
      expect(createArrowDirection(d)).toBe("↙");
    });
  });

  E.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '⬅'`, () => {
      expect(createArrowDirection(d)).toBe("⬅");
    });
  });

  SE.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '↖'`, () => {
      expect(createArrowDirection(d)).toBe("↖");
    });
  });

  S.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '⬆'`, () => {
      expect(createArrowDirection(d)).toBe("⬆");
    });
  });

  SW.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '↗'`, () => {
      expect(createArrowDirection(d)).toBe("↗");
    });
  });

  W.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '➡'`, () => {
      expect(createArrowDirection(d)).toBe("➡");
    });
  });

  NW.forEach((d) => {
    it(`Принимая значение градусов ${d}, возвращаем '↘'`, () => {
      expect(createArrowDirection(d)).toBe("↘");
    });
  });

  [-5, 0, 370].forEach((d) => {
    it(`Принимая значение вне диапазона > 0 и =< 360, например ${d} градусов, возвращаем ""`, () => {
      expect(createArrowDirection(d)).toBe("");
    });
  });
});

//createWindModifiedRow
describe("Проверка createWindModifiedRow", () => {
  const variableWind = {
    degrees: 0,
    speed_mps: 1,
    speed_kts: 2,
  };

  const standardWind = {
    degrees: 210,
    speed_mps: 2,
    speed_kts: 4,
  };

  it("Если данные отсутствуют, возвращаем Calm", () => {
    //в коде metar при отсутствии данных увидим 00000KT — расшифровывается, как "штиль"
    const isCalm = {
      title: "test",
      data: "Calm",
    };
    expectWithOneArg(createWindModifiedRow, isCalm);
  });

  it("Если направление = 0, но есть скорость, возвращаем Variable вместо направления", () => {
    //0 во входящих данных обозначает переменное направление. Строго на север — 360

    expect(createWindModifiedRow("test", variableWind)).toEqual({
      title: "test",
      data: "Variable, 1 mps (2 kt)",
    });
  });

  it("Если направление не равно нулю и есть скорость, возвращаем полные данные", () => {
    expect(createWindModifiedRow("test", standardWind)).toEqual({
      title: "test",
      data: "210 degrees ↗, 2 mps (4 kt)",
    });
  });
});

//createBarometerModifiedRow
describe("Проверка createBarometerModifiedRow", () => {
  const standardBarometer = {
    hpa: 1013,
    hg: 29.92,
  };
  const noZeroEnd = {
    hpa: 1012,
    hg: 29.9,
  };
  const noTwoZerosEnd = {
    hpa: 1016,
    hg: 30,
  };

  it("Если не передан второй аргумент, возвращаем 'no data ☹☹☹'", () => {
    expectWithOneArg(createBarometerModifiedRow);
  });

  it("Принимая данные в стандартном формате, возвращаем их в строке", () => {
    expect(createBarometerModifiedRow("test", standardBarometer)).toEqual({
      title: "test",
      data: "1013 hPa (29.92 inHg)",
    });
  });

  it("Если в hg после точки одно число, добавляем в конец 0", () => {
    expect(createBarometerModifiedRow("test", noZeroEnd)).toEqual({
      title: "test",
      data: "1012 hPa (29.90 inHg)",
    });
  });
  it("Если в hg целое число, добавляем .00", () => {
    expect(createBarometerModifiedRow("test", noTwoZerosEnd)).toEqual({
      title: "test",
      data: "1016 hPa (30.00 inHg)",
    });
  });
});
