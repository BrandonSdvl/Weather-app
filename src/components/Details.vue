<script setup>
import CardDay from "./CardDay.vue";
import Highlights from "./Highlights.vue";
import { useWeatherStore } from "@/store/weatherStore.js";
import { useAppStore } from "@/store/appStore.js";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
</script>

<template>
  <div class="details">
    <div class="change-unit">
      <button
        class="change-unit__item change-unit__c button"
        title="Celsius"
        :class="{
          'change-unit__item--selected': appStore.unitSelected == '°C',
        }"
        @click="
          if (appStore.unitSelected != '°C') {
            weatherStore.fToC();
            appStore.unitSelected = '°C';
          }
        "
      >
        °C
      </button>
      <button
        class="change-unit__item change-unit__f button"
        title="Fahrenheit"
        :class="{
          'change-unit__item--selected': appStore.unitSelected == '°F',
        }"
        @click="
          if (appStore.unitSelected != '°F') {
            weatherStore.cToF();
            appStore.unitSelected = '°F';
          }
        "
      >
        °F
      </button>
    </div>
    <section class="days-container">
      <CardDay v-for="(item, key) in weatherStore.weatherDays" :key="key" :day="item" />
    </section>
    <Highlights />
    <div class="links">
      <a
        href="http://github.com/brandonsdvl"
        class="links__item"
        target="_blank"
        >BrandonSdvl</a
      >
      @
      <a href="http://devchallenges.io" class="links__item" target="_blank"
        >DevChallenges.io</a
      >
    </div>
  </div>
</template>
