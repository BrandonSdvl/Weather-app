<script setup>
import { onMounted, ref } from "vue";
import { useWeatherStore } from "@/store/weatherStore.js";
import { getImageUrl } from "../utils/imageUtils";

const weatherStore = useWeatherStore();
const basic = ref(0);
const apiKey = import.meta.env.VITE_API_KEY;

onMounted(() => {
  const city = 349727;
  fetchApi(city);
});

const hideLoad = () => {
  document.querySelector(".load").classList.add("load--hide");
  document.body.style.overflow = "auto";
};

const showLoad = () => {
  document.querySelector(".load").classList.remove("load--hide");
};

// http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=fvRU2yCk4jSZZNNYL07Y3BPKR2kXAH4I&q=new
//   weatherStore.currentDay.cityName = res.body.title;

const fetchApi = (city) => {
  const apiArgCurrent = `currentconditions/v1/${city}?apikey=${apiKey}`;
  const urlCurrent = `${weatherStore.app.cors}/${weatherStore.app.api}/${apiArgCurrent}`;

  const apiArgForecasts = `forecasts/v1/daily/5day/${city}?apikey=${apiKey}`;
  const urlForecasts = `${weatherStore.app.cors}/${weatherStore.app.api}/${apiArgForecasts}`;
  
  fetch(
    urlCurrent
  )
    .then((res) => {
      res = res.body

      weatherStore.currentDay.currentTemp = res[0].Temperature.Imperial.Value
      weatherStore.currentDay.weatherState = res[0].WeatherText
      weatherStore.currentDay.currentDate = getDate(res[0].LocalObservationDateTime.split('T')[0])
      weatherStore.currentDay.imageStatus = getImageUrl(`icons/${res[0].WeatherIcon}.png`)
      weatherStore.dayDetails.windStatus = res[0].Wind.Speed.Imperial.Value
      weatherStore.dayDetails.windDirection = res[0].Wind.Direction.English
      weatherStore.dayDetails.windDirectionDegrees = Math.round(res[0].Wind.Direction.Degrees)
      weatherStore.dayDetails.humidity = res[0].IndoorRelativeHumidity
      weatherStore.dayDetails.visibility = res[0].Visibility.Imperial.Value.toFixed(1);
      weatherStore.dayDetails.airPressure = res[0].Pressure.Metric.Value
      hideLoad();
    })
    .catch((err) => console.log(err));

  fetch(
    urlForecasts
  )
    .then((res) => {
      res = res.body

      weatherStore.currentDay.maxTemp = res.DailyForecasts[0].Temperature.Maximum.Value;
      weatherStore.currentDay.minTemp = res.DailyForecasts[0].Temperature.Minimum.Value;

        weatherStore.weatherDays = [];
        for (let i = 0; i <= 4; i++) {
          let day = {
            minTemp: res.DailyForecasts[i].Temperature.Minimum.Value,
            maxTemp: res.DailyForecasts[i].Temperature.Maximum.Value,
            weatherState: res.DailyForecasts[i].Day.IconPhrase,
            day:
              i == 0
                ? "Today"
                : getDate(res.DailyForecasts[i].Date.split('T')[0]),
            imageStatus: "",
          };

          day.imageStatus = getImageUrl(`icons/${res.DailyForecasts[i].Day.Icon}.png`)
          weatherStore.weatherDays.push(day);
        }

        if (weatherStore.app.unitSelected == "°C") {
          weatherStore.fToC();
        }
    })
    .catch((err) => console.log(err));
};

const getDate = (dateApi) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateapi = dateApi.split("-");
  let date = new Date(`${dateapi[1]} ${dateapi[2]}, ${dateapi[0]} 12:00:00`);
  let weekday = date.getDay();
  let month = date.getMonth();

  return `${days[weekday]}, ${dateapi[2]} ${months[month]}`;
};
</script>

<template>
  <div id="app" class="app">
    <div class="load">
      <span class="load__text">Loading...</span>
    </div>
    <!-- <Search /> -->
    <!-- <Basic ref="basic" /> -->
    <!-- <Details /> -->
  </div>
</template>

<style lang="scss" src="./scss/styles.scss"></style>
