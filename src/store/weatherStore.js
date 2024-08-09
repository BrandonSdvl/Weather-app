import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    currentDay: {
      cityName: "",
      maxTemp: 0,
      minTemp: 0,
      currentTemp: 0,
      weatherState: "",
      imageStatus: "",
      currentDate: "",
    },
    weatherDays: [],
    dayDetails: {
      windStatus: "",
      windDirection: "",
      windDirectionDegrees: 0,
      humidity: 0,
      visibility: "",
      airPressure: 0,
    },
    app: {
      unitSelected: "°C",
      woeidLocation: 0,
      cors: "https://cors-urzk.onrender.com",
      api: "http://dataservice.accuweather.com",
    },
  }),
  actions: {
    cToF() {
      this.currentDay.currentTemp = Math.round(
        this.currentDay.currentTemp * 1.8 + 32
      );
      this.currentDay.maxTemp = Math.round(this.currentDay.maxTemp * 1.8 + 32);
      this.currentDay.minTemp = Math.round(this.currentDay.minTemp * 1.8 + 32);

      this.weatherDays.forEach((item) => {
        item.minTemp = Math.round(item.minTemp * 1.8 + 32);
        item.maxTemp = Math.round(item.maxTemp * 1.8 + 32);
      });
    },
    fToC() {
      this.currentDay.currentTemp = Math.round(
        (this.currentDay.currentTemp - 32) * (5 / 9)
      );
      this.currentDay.maxTemp = Math.round(
        (this.currentDay.maxTemp - 32) * (5 / 9)
      );
      this.currentDay.minTemp = Math.round(
        (this.currentDay.minTemp - 32) * (5 / 9)
      );

      this.weatherDays.forEach((item) => {
        item.minTemp = Math.round((item.minTemp - 32) * (5 / 9));
        item.maxTemp = Math.round((item.maxTemp - 32) * (5 / 9));
      });
    },
  },
});
