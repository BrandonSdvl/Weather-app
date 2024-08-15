<script setup>
import axios from "axios";
import Basic from "@/components/Basic.vue";
import Details from "@/components/Details.vue";
import Search from "@/components/Search.vue";
import { onMounted, ref, provide } from "vue";
import { useWeatherStore } from "@/store/weatherStore.js";
import { getImageUrl } from "../utils/imageUtils";
import { useAppStore } from "./store/appStore.js";
import { buildApiUrl } from "@/utils/apiUtils.js";

const weatherStore = useWeatherStore();
const appStore = useAppStore();
const basic = ref(0);

onMounted(() => {
  const city = 349727;
  weatherStore.currentDay.cityName = "New York";
  fetchApi(city);
});

const fetchApi = async (city) => {  
  appStore.loading = true;

  try {
    const [currentWeather, forecast] = await Promise.all([
      fetchWeatherData(city),
      fetchForecastData(city),
    ]);

    if (currentWeather.code === "ERR_BAD_RESPONSE" || forecast.code === "ERR_BAD_RESPONSE") {
      appStore.exceeded = true;
      return;
    }

    updateCurrentWeather(currentWeather[0]);
    updateForecast(forecast);

    if (appStore.unitSelected === "°C") {
      weatherStore.fToC();
    }
  } catch (error) {
    console.log(error);
  } finally {
    appStore.loading = false;
  }
};

const fetchWeatherData = async (city) => {
  const urlCurrent = buildApiUrl(`currentconditions/v1/${city}?details=true`);
  const { data } = await axios.get(urlCurrent);
  return data;
};

const fetchForecastData = async (city) => {
  const urlForecasts = buildApiUrl(`forecasts/v1/daily/5day/${city}`);
  const { data } = await axios.get(urlForecasts);
  return data;
};

const updateCurrentWeather = (data) => {
  if (!data) return;
  weatherStore.currentDay.currentTemp = data.Temperature.Imperial.Value;
  weatherStore.currentDay.weatherState = data.WeatherText;
  weatherStore.currentDay.currentDate = getDate(
    data.LocalObservationDateTime.split("T")[0]
  );
  weatherStore.currentDay.imageStatus = getImageUrl(
    `icons/${data.WeatherIcon}.png`
  );
  weatherStore.dayDetails = {
    windStatus: data.Wind.Speed.Imperial.Value,
    windDirection: data.Wind.Direction.English,
    windDirectionDegrees: Math.round(data.Wind.Direction.Degrees),
    humidity: data.IndoorRelativeHumidity,
    visibility: data.Visibility.Imperial.Value.toFixed(1),
    airPressure: data.Pressure.Metric.Value,
  };
};

const updateForecast = (data) => {
  weatherStore.currentDay.maxTemp = data.DailyForecasts[0].Temperature.Maximum.Value;
  weatherStore.currentDay.minTemp = data.DailyForecasts[0].Temperature.Minimum.Value;

  weatherStore.weatherDays = [];
  weatherStore.weatherDays = data.DailyForecasts.map((day, index) => ({
    minTemp: day.Temperature.Minimum.Value,
    maxTemp: day.Temperature.Maximum.Value,
    weatherState: day.Day.IconPhrase,
    day: index === 0 ? "Today" : getDate(day.Date.split("T")[0]),
    imageStatus: getImageUrl(`icons/${day.Day.Icon}.png`),
  }));
};

const getDate = (dateApi) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct","Nov", "Dec",
  ];

  const [year, month, day] = dateApi.split("-");
  const date = new Date(`${month} ${day}, ${year} 12:00:00`);
  return `${days[date.getDay()]}, ${day} ${months[date.getMonth()]}`;
};

provide("fetchApi", fetchApi);
</script>

<template>
  <div id="app" class="app">
    <div class="exceeded" v-if="appStore.exceeded">
      <h2>The daily API request limit has been exceeded :((</h2>
    </div>
    <template v-else>
      <div class="load" :class="{ 'load--hide': !appStore.loading }">
        <span class="load__text">Loading...</span>
      </div>
      <Search />
      <Basic ref="basic" />
      <Details />
    </template>
  </div>
</template>

<style lang="scss" src="./scss/styles.scss"></style>
