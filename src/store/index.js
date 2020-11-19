import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
