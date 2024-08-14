import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    unitSelected: "°C",
    key: 0,
    cors: "https://cors-urzk.onrender.com",
    api: "http://dataservice.accuweather.com",
    apiKey: "fvRU2yCk4jSZZNNYL07Y3BPKR2kXAH4I",
    loading: false,
    exceeded: false,
  }),
});
