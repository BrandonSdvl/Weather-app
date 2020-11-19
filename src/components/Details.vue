<template>
  <div class="details">
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
import { mapState } from "vuex";

export default {
  name: "Details",
  components: {
    CardDay,
    Highlights,
  },
  computed: {
    ...mapState(["weatherDays"]),
  },
};
</script>
