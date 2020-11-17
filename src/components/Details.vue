<template>
  <div class="details">
    <section class="days-container">
      <CardDay v-for="(item, key) in weatherDays" :key="key" :day="item" />
    </section>
    <Highlights :dayDetails="dayDetails" />
    <a href="http://github.com/brandonsdvl">BrandonSdvl</a> @
    <a href="http://devchallenges.io">DevChallenges.io</a>
  </div>
</template>

<script>
import CardDay from "./CardDay.vue";
import Highlights from "./Highlights.vue";
import Hightlights from "./Highlights.vue";
export default {
  name: "Details",
  components: {
    CardDay,
    Highlights,
  },
  props: {
    weatherDays: {
      type: Array,
      default: [],
      required: true,
    },
    dayDetails: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>
