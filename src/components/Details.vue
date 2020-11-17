<template>
  <section class="days-container">
    <CardDay v-for="(item, key) in weatherDays" :key="key" :day="item" />
  </section>
</template>

<script>
import CardDay from "./CardDay.vue";
export default {
  name: "Details",
  components: {
    CardDay,
  },
  props: {
    weatherDays: {
      type: Array,
      default: [],
      required: true,
    },
  },
};
</script>
