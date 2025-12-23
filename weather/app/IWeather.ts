export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };

  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };

    humidity: number;
    wind_kph: number;
  };
}
