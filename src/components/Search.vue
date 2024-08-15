<script setup>
import axios from "axios";
import { useAppStore } from "@/store/appStore.js";
import { useWeatherStore } from "@/store/weatherStore.js";
import { ref, inject } from "vue";
import { buildApiUrl } from "@/utils/apiUtils.js";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
const inputText = ref("");
const cities = ref([]);
const hasSearched = ref(false);

const fetchApi = inject("fetchApi");

const fetchSearch = async (query) => {
  if (!query.length) {
    cities.value = [];
    hasSearched.value = false;
    return 0;
  }

  try {
    appStore.loading = true;
    const url = buildApiUrl(`locations/v1/cities/autocomplete?q=${query}`);
    const { data } = await axios.get(url);
    hasSearched.value = true;

    if (data.length >= 1) {
      cities.value = data.slice(0, 9).map((city) => ({
        title: city.LocalizedName,
        key: city.Key,
      }));
    } else {
      cities.value = []
    }
  } catch (error) {
    console.log(error);
  } finally {
    appStore.loading = false;
  }
};

const hide = () => {
  document.querySelector(".search").classList.remove("search--show");
};

const handleClick = (city) => {
  weatherStore.currentDay.cityName = city.title;
  fetchApi(city.key);
  hide();
};
</script>

<template>
  <div class="search aside">
    <i class="fas fa-times search__close button" @click="hide"></i>
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
        @click.prevent="fetchSearch(inputText)"
      />
    </form>
    <div class="search__results">
      <div v-if="hasSearched && cities.length === 0" class="search__no-results">
        No results found
      </div>
      <template v-else-if="cities.length > 0">
        <div
          v-for="(city, index) in cities"
          :key="index"
          class="search__item"
          v-on:click="handleClick(city)"
          >
          <span v-text="city.title" class="search__item-title"></span>
          <i class="fas fa-chevron-right search__arrow"></i>
        </div>
    </template>
    </div>
  </div>
</template>
