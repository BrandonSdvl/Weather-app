<template>
  <article class="card-day">
    <span class="card-day__date" v-text="day.day"></span>
    <img :src="day.imageStatus" alt="" class="card-day__image" />
    <div class="card-day__state">
      <span class="card-day__max" v-text="day.maxTemp + '°C'"></span>
      <span class="card-day__min" v-text="day.minTemp + '°C'"></span>
    </div>
  </article>
</template>

<script>
export default {
  name: "CardDay",
  props: {
    day: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>
