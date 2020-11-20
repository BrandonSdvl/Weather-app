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
    app: {
      unitSelected: '°C',
    },
  },
  mutations: {
    cToF(state) {
      state.currentDay.currentTemp = (state.currentDay.currentTemp * 1.8) + 32
      state.currentDay.maxTemp = (state.currentDay.maxTemp * 1.8) + 32
      state.currentDay.minTemp = (state.currentDay.minTemp * 1.8) + 32

      state.weatherDays.forEach(item => {
        item.minTemp = Math.round((item.minTemp * 1.8) + 32)
        item.maxTemp = Math.round((item.maxTemp * 1.8) + 32)
      })
    },
    fToC(state) {
      state.currentDay.currentTemp = (state.currentDay.currentTemp - 32) * (5 / 9)
      state.currentDay.maxTemp = (state.currentDay.maxTemp - 32) * (5 / 9)
      state.currentDay.minTemp = (state.currentDay.minTemp - 32) * (5 / 9)

      state.weatherDays.forEach(item => {
        item.minTemp = Math.round((item.minTemp - 32) * (5 / 9))
        item.maxTemp = Math.round((item.maxTemp - 32) * (5 / 9))
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
