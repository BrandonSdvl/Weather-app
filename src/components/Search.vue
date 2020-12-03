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
        v-on:click="
          $parent.showLoad();
          $parent.fetch(city.woeid);
          hide();
        "
      >
        <span v-text="city.title" class="search__item-title"></span>
        <i class="fas fa-chevron-right search__arrow"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchResult: {},
      inputText: "",
      cities: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  methods: {
    fetchSearch(query) {
      if (query.length == 0) {
        this.cities = [];
        return 0;
      }
      this.$parent.showLoad();
      const apiArg = `location/search/?query=${query}`;
      const url = `${this.app.cors}/${this.app.api}/${apiArg}`;
      this.$http
        .get(url)
        .then((res) => {
          this.cities = [];
          if (res.body.length >= 1) {
            for (
              let i = 0;
              i < (res.body.length <= 9 ? res.body.length : 9);
              i++
            ) {
              let city = {
                title: res.body[i].title,
                woeid: res.body[i].woeid,
              };
              this.cities.push(city);
            }
          }
          this.$parent.hideLoad();
        })
        .catch((err) => console.log(err));
    },
    hide() {
      document.querySelector(".search").classList.remove("search--show");
    },
  },
  watch: {
    inputText: function () {
      this.fetchSearch(this.inputText);
    },
  },
};
</script>