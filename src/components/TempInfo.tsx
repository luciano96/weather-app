import { convertTemperature, getUnitFormat, TTemperatureUnits } from "~/utils";
import { WeatherInfo } from "~/utils/weather";

type TempInfoProps = {
  unit: TTemperatureUnits;
  temperature: number;
  feelsLike: number;
  min: number;
  max: number;
  weather: WeatherInfo["weather"];
};

export const TempInfo = ({
  unit,
  temperature,
  feelsLike,
  min,
  max,
  weather,
}: TempInfoProps) => {
  const temp = convertTemperature(temperature, { from: "kelvin", to: unit });
  const unitFormatted = getUnitFormat(unit);
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="size-20" alt={weather.description} src={weather.imgUrl} />
      <div>
        <p className="flex justify-center text-8xl mb-4">
          {temp}
          {unitFormatted}
        </p>
        <div className="flex gap-4 justify-center text-2xl">
          <p>
            min ~{convertTemperature(min, { from: "kelvin", to: unit })}
            {unitFormatted}
          </p>
          <p>
            max ~{convertTemperature(max, { from: "kelvin", to: unit })}
            {unitFormatted}
          </p>
        </div>
        <div className="flex-col">
          <p className="flex justify-center">{weather.description}</p>
          <p className="flex justify-center">
            Feels like{" "}
            {convertTemperature(feelsLike, { from: "kelvin", to: unit })}
            {unitFormatted}
          </p>
        </div>
      </div>
    </div>
  );
};
