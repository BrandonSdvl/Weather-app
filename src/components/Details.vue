<template>
  <div class="details">
    <div class="change-unit">
      <button
        class="change-unit__item change-unit__c"
        :class="{
          'change-unit__item--selected': app.unitSelected == '°C',
        }"
        @click="
          if (app.unitSelected != '°C') {
            fToC();
            app.unitSelected = '°C';
          }
        "
      >
        °C
      </button>
      <button
        class="change-unit__item change-unit__f"
        :class="{
          'change-unit__item--selected': app.unitSelected == '°F',
        }"
        @click="
          if (app.unitSelected != '°F') {
            cToF();
            app.unitSelected = '°F';
          }
        "
      >
        °F
      </button>
    </div>
    <section class="days-container">
      <CardDay v-for="(item, key) in weatherDays" :key="key" :day="item" />
    </section>
    <Highlights />
    <div class="links">
      <a href="http://github.com/brandonsdvl" class="links__item"
        >BrandonSdvl</a
      >
      @
      <a href="http://devchallenges.io" class="links__item">DevChallenges.io</a>
    </div>
  </div>
</template>

<script>
import CardDay from "./CardDay.vue";
import Highlights from "./Highlights.vue";
import Hightlights from "./Highlights.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Details",
  components: {
    CardDay,
    Highlights,
  },
  computed: {
    ...mapState(["weatherDays", "app"]),
  },
  methods: {
    ...mapMutations(["cToF", "fToC"]),
  },
};
</script>
