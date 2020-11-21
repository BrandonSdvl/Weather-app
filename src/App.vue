<template>
  <div id="app">
    <Search />
    <Basic />
    <Details />
  </div>
</template>

<script>
import Basic from "./components/Basic.vue";
import Details from "./components/Details.vue";
import Search from "./components/Search.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Basic,
    Details,
    Search,
  },
  computed: {
    ...mapState(["currentDay", "weatherDays", "dayDetails", "app"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["cToF"]),
    getImgUrl(pic) {
      return require(`./assets/${pic.replace(/ /g, "")}.png`);
    },
    fetch(city) {
      const api = `https://www.metaweather.com/api/location/${city}`;
      const cors = "https://cors-anywhere.herokuapp.com";
      const url = `${cors}/${api}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.currentDay.cityName = res.body.title;
          this.currentDay.maxTemp = res.body.consolidated_weather[0].max_temp;
          this.currentDay.minTemp = res.body.consolidated_weather[0].min_temp;
          this.currentDay.currentTemp = Math.round(
            res.body.consolidated_weather[0].the_temp
          );
          this.currentDay.weatherState =
            res.body.consolidated_weather[0].weather_state_name;
          this.currentDay.currentDate = this.getDate(
            res.body.consolidated_weather[0].applicable_date
          );
          this.currentDay.imageStatus = this.getImgUrl(
            this.currentDay.weatherState
          );

          this.$store.state.weatherDays = [];
          for (let i = 1; i <= 5; i++) {
            let day = {
              minTemp: Math.round(res.body.consolidated_weather[i].min_temp),
              maxTemp: Math.round(res.body.consolidated_weather[i].max_temp),
              weatherState: res.body.consolidated_weather[i].weather_state_name,
              day:
                i == 1
                  ? "Tomorrow"
                  : this.getDate(
                      res.body.consolidated_weather[i].applicable_date
                    ),
              imageStatus: "",
            };

            (day.imageStatus = this.getImgUrl(day.weatherState)),
              this.weatherDays.push(day);
          }

          this.dayDetails.windStatus = Math.round(
            res.body.consolidated_weather[0].wind_speed
          );
          this.dayDetails.windDirection =
            res.body.consolidated_weather[0].wind_direction_compass;
          this.dayDetails.humidity = res.body.consolidated_weather[0].humidity;
          this.dayDetails.visibility = res.body.consolidated_weather[0].visibility.toFixed(
            1
          );
          this.dayDetails.airPressure =
            res.body.consolidated_weather[0].air_pressure;
          this.dayDetails.windDirectionDegrees = Math.round(
            res.body.consolidated_weather[0].wind_direction
          );

          if (this.app.unitSelected == "°F") {
            this.cToF();
          }
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
    const city = 116545;
    this.fetch(city);
  },
};
</script>

<style lang="scss" src="./scss/styles.scss"></style>
