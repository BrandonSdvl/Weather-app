<template>
  <article class="card-day">
    <span class="card-day__date" v-text="day.day"></span>
    <img :src="day.imageStatus" alt="" class="card-day__image" />
    <div class="card-day__state">
      <span
        class="card-day__max"
        v-text="day.maxTemp + app.unitSelected"
      ></span>
      <span
        class="card-day__min"
        v-text="day.minTemp + app.unitSelected"
      ></span>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CardDay",
  props: {
    day: {
      type: Object,
      default: {},
      required: true,
    },
  },
  computed: {
    ...mapState(["app"]),
  },
};
</script>
