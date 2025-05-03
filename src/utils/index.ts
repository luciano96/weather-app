import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export type TTemperatureUnits = "kelvin" | "celsius" | "fahrenheit";

export const convertTemperature = (
  temp: number,
  formatOptions: {
    from: TTemperatureUnits;
    to: TTemperatureUnits;
  }
) => {
  const mapper = {
    kelvin: {
      kelvin: (k: number) => k,
      celsius: (k: number) => k - 273.15,
      fahrenheit: (k: number) => ((k - 273.15) * 9) / 5 + 32,
    },
    celsius: {
      kelvin: (c: number) => c + 273.15,
      celsius: (c: number) => c,
      fahrenheit: (c: number) => (c * 9) / 5 + 32,
    },
    fahrenheit: {
      kelvin: (f: number) => ((f - 32) * 5) / 9 + 273.15,
      celsius: (f: number) => ((f - 32) * 5) / 9,
      fahrenheit: (f: number) => f,
    },
  };

  return mapper[formatOptions.from][formatOptions.to](temp).toFixed(0);
};

export const getUnitFormat = (unit: TTemperatureUnits) => {
  const mapper = {
    kelvin: "K",
    celsius: "°C",
    fahrenheit: "°F",
  };

  return mapper[unit];
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
