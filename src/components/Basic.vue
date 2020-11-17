<template>
  <div class="basic">
    <div class="basic__button-container">
      <button class="basic__search-place">Search for places</button>
      <button class="basic__get-location">
        <i class="fas fa-compass logo"></i>
      </button>
    </div>
    <div class="basic__image-container">
      <img
        :src="currentDay.imageStatus"
        alt="weatherState"
        srcset=""
        class="basic__image"
      />
    </div>
    <h1 class="basic__degrees">
      <span v-text="currentDay.currentTemp"></span>
      <span class="basic__unit">°C</span>
    </h1>
    <h2 class="basic__weather-status" v-text="currentDay.weatherState"></h2>
    <div class="basic__date">
      Today<span class="separator">•</span
      ><span class="" v-text="currentDay.currentDate"></span>
    </div>
    <div class="basic__location-content">
      <i class="fas fa-map-marker-alt location-logo"></i>
      <span class="basic__location-city" v-text="currentDay.cityName"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Basic",
  props: {
    currentDay: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>
