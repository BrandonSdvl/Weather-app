<script setup>
import axios from "axios";
import { useAppStore } from "@/store/appStore.js";
import { useWeatherStore } from "@/store/weatherStore.js";
import { ref, inject } from "vue";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
const inputText = ref("");
const cities = ref([]);

const fetchApi = inject("fetchApi");

const fetchSearch = (query) => {
  if (query.length == 0) {
    cities.value = [];
    return 0;
  }

  appStore.loading = true;
  const apiArg = `locations/v1/cities/autocomplete?apikey=${appStore.apiKey}&q=${query}`;
  const url = `${appStore.cors}/${appStore.api}/${apiArg}`;
  axios
    .get(url)
    .then((res) => {
      res = res.data;

      cities.value = [];
      if (res.length >= 1) {
        for (let i = 0; i < (res.length <= 9 ? res.length : 9); i++) {
          let city = {
            title: res[i].LocalizedName,
            key: res[i].Key,
          };
          cities.value.push(city);
        }
      }

      appStore.loading = false;
    })
    .catch((err) => console.log(err));
};
const hide = () => {
  document.querySelector(".search").classList.remove("search--show");
};

const handleClick = (city) => {
  appStore.loading = true;
  weatherStore.currentDay.cityName = city.title;
  fetchApi(city.key);
  hide();
};
</script>

<template>
  <div class="search aside">
    <i class="fas fa-times search__close button" v-on:click="hide()"></i>
    <form class="search__form">
      <input
        type="text"
        v-model="inputText"
        class="search__input"
        placeholder="search location"
      />
      <input
        type="submit"
        value="Search"
        class="search__button button"
        v-on:click.prevent="fetchSearch(inputText)"
      />
    </form>
    <div class="search__results">
      <div
        v-for="(city, index) in cities"
        :key="index"
        class="search__item"
        v-on:click="handleClick(city)"
      >
        <span v-text="city.title" class="search__item-title"></span>
        <i class="fas fa-chevron-right search__arrow"></i>
      </div>
    </div>
  </div>
</template>
