<script setup>
import { useWeatherStore } from "@/store/weatherStore.js";
import { useAppStore } from "@/store/appStore.js";
import { inject } from "vue";
import { buildApiUrl } from "@/utils/apiUtils.js";
import axios from "axios";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
const fetchApi = inject("fetchApi");

const show = () => {
  document.querySelector(".search").classList.add("search--show");
};

const getLocation = () => {
  const geoLocation = navigator.geolocation;

  geoLocation.getCurrentPosition(
    (position) => fetchLocation(position.coords),
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
};

const fetchLocation = async ({ latitude, longitude }) => {
  try {
    appStore.loading = true;
    const url = buildApiUrl(`locations/v1/cities/geoposition/search?q=${latitude}%2C${longitude}`);
    const { data } = await axios.get(url);

    appStore.key = data.Key;
    weatherStore.currentDay.cityName = data.LocalizedName;
    fetchApi(appStore.key);
  } catch (err) {
    console.log(err);
  } finally {
    appStore.loading = false;
  }
};
</script>

<template>
  <div class="basic aside">
    <div class="basic__button-container">
      <button
        class="basic__search-place button"
        @click="show"
        aria-label="Search"
      >
        Search for places
      </button>
      <button
        class="basic__get-location button"
        @click="getLocation"
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
      <span>{{ weatherStore.currentDay.currentTemp }}</span>
      <span class="basic__unit">{{ appStore.unitSelected }}</span>
    </h1>
    <h2 class="basic__weather-status">
      {{ weatherStore.currentDay.weatherState }}
    </h2>
    <div class="basic__date">
      Today<span class="separator">•</span>
      <span>{{ weatherStore.currentDay.currentDate }}</span>
    </div>
    <div class="basic__location-content">
      <i class="fas fa-map-marker-alt location-logo"></i>
      <span class="basic__location-city">
        {{ weatherStore.currentDay.cityName }}
      </span>
    </div>
  </div>
</template>
