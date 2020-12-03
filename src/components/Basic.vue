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
        :src="currentDay.imageStatus"
        alt="weatherState"
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
      ><span v-text="currentDay.currentDate"></span>
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
      this.$parent.showLoad();
      if (this.app.woeidLocation != 0) {
        this.$parent.fetch(this.app.woeidLocation);
        return;
      } else {
        const apiArg = `search/?lattlong=${position.coords.latitude},${position.coords.longitude}`;
        const url = `${this.app.cors}/${this.app.api}/${apiArg}`;
        this.$http
          .get(url)
          .then((res) => {
            this.app.woeidLocation = res.body[0].woeid;
            this.$parent.fetch(this.app.woeidLocation);
            this.$parent.hideLoad();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
