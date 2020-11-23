<template>
  <div class="basic">
    <div class="basic__button-container">
      <button class="basic__search-place" v-on:click="show()">
        Search for places
      </button>
      <button class="basic__get-location" v-on:click="getLocation()"></button>
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
      <span class="basic__unit" v-text="app.unitSelected"></span>
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
import { mapState } from "vuex";

export default {
  name: "Basic",
  computed: {
    ...mapState(["currentDay", "app"]),
  },
  methods: {
    show() {
      document.querySelector(".search").classList.add("search--show");
    },
    getLocation() {
      const geoLocation = navigator.geolocation;
      geoLocation.getCurrentPosition(this.fetchLocation, error, options);

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const error = (error) => console.log(error);
    },
    fetchLocation(position) {
      $parent.showLoad();
      if (this.app.woeidLocation != 0) {
        this.$parent.fetch(this.app.woeidLocation);
        return;
      } else {
        const cors = "https://cors-anywhere.herokuapp.com";
        const api = `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`;
        const url = `${cors}/${api}`;
        this.$http
          .get(url)
          .then((res) => {
            this.app.woeidLocation = res.body[0].woeid;
            this.$parent.fetch(this.app.woeidLocation);
            $parent.hideLoad();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
