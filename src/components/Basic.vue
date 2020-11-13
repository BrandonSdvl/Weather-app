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
        :src="getImgUrl(this.weatherState)"
        alt="weatherState"
        srcset=""
        class="basic__image"
      />
    </div>
    <h1 class="basic__degrees">
      <span v-text="currentTemp"></span>
      <span class="basic__unit">°C</span>
    </h1>
    <h2 class="basic__weather-status" v-text="weatherState"></h2>
    <div class="basic__date">
      Today<span class="separator">•</span
      ><span class="" v-text="currentDate"></span>
    </div>
    <div class="basic__location-content">
      <i class="fas fa-map-marker-alt location-logo"></i>
      <span class="basic__location-city" v-text="cityName"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Basic",
  data() {
    return {
      cityName: "",
      maxTemp: 0,
      minTemp: 0,
      currentTemp: 0,
      weatherState: "Clear",
      imageStatus: "",
      currentDate: "",
    };
  },
  methods: {
    getImgUrl(pic) {
      return require(`../assets/${pic}.png`);
    },
    fetch() {
      const city = 116545;
      const api = `https://www.metaweather.com/api/location/${city}`;
      const cors = "https://cors-anywhere.herokuapp.com";
      const url = `${cors}/${api}`;

      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.cityName = res.body.title;
          this.maxTemp = res.body.consolidated_weather[0].max_temp;
          this.minTemp = res.body.consolidated_weather[0].min_temp;
          this.currentTemp = Math.round(
            res.body.consolidated_weather[0].the_temp
          );
          this.weatherState =
            res.body.consolidated_weather[0].weather_state_name;
          this.imageStatus = `../assets/${this.weatherState}.png`;
          this.currentDate = this.getDate(
            res.body.consolidated_weather[0].applicable_date
          );
        })

        .catch((err) => console.log(err));
    },
    getDate(dateApi) {
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
      let date = new Date(
        `${dateapi[1]} ${dateapi[2]}, ${dateapi[0]} 12:00:00`
      );
      let weekday = date.getDay();
      let month = date.getMonth();

      return `${days[weekday]}, ${dateapi[2]} ${months[month]}`;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
