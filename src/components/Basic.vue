<script setup>
import { useWeatherStore } from "@/store/weatherStore.js";
import { useAppStore } from "@/store/appStore.js";
import { inject } from "vue";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
const fetchApi = inject("fetchApi");

const show = () => {
  document.querySelector(".search").classList.add("search--show");
};

const getLocation = () => {
  const geoLocation = navigator.geolocation;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const error = (error) => console.log(error);

  geoLocation.getCurrentPosition(fetchLocation, error, options);
};

const fetchLocation = (position) => {
  appStore.loading = true;

  const apiArg = `locations/v1/cities/geoposition/search?apikey=${appStore.apiKey}&q=${position.coords.latitude}%2C${position.coords.longitude}`;
  const url = `${appStore.cors}/${appStore.api}/${apiArg}`;
  axios
    .get(url)
    .then((res) => {
      res = res.data;

      appStore.key = res.Key;
      weatherStore.currentDay.cityName = res.LocalizedName;
      fetchApi(appStore.key);
      appStore.loading = false;
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <div class="basic aside">
    <div class="basic__button-container">
      <button
        class="basic__search-place button"
        v-on:click="show()"
        aria-label="Search"
      >
        Search for places
      </button>
      <button
        class="basic__get-location button"
        v-on:click="getLocation()"
        aria-label="GetLocation"
        title="Location"
      ></button>
    </div>
    <div class="basic__image-container">
      <img
        :src="weatherStore.currentDay.imageStatus"
        alt="weatherState"
        class="basic__image"
      />
    </div>
    <h1 class="basic__degrees">
      <span v-text="weatherStore.currentDay.currentTemp"></span>
      <span class="basic__unit" v-text="appStore.unitSelected"></span>
    </h1>
    <h2
      class="basic__weather-status"
      v-text="weatherStore.currentDay.weatherState"
    ></h2>
    <div class="basic__date">
      Today<span class="separator">•</span
      ><span v-text="weatherStore.currentDay.currentDate"></span>
    </div>
    <div class="basic__location-content">
      <i class="fas fa-map-marker-alt location-logo"></i>
      <span
        class="basic__location-city"
        v-text="weatherStore.currentDay.cityName"
      ></span>
    </div>
  </div>
</template>
