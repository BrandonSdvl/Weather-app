<template>
  <section class="highlights-container">
    <h2>Today's Hightlight</h2>
    <article class="highlight-card highlight-card__wind-status">
      <span class="highlight-card__title">Wind Status</span>
      <span class="highlight-card__description">
        {{ dayDetails.windStatus }}mph</span
      >
      <div class="highlight-card__direction-container">
        <span class="highlight-card__direction">{{
          dayDetails.windDirection
        }}</span>
      </div>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Humidity </span>
      <span class="highlight-card__description"
        >{{ dayDetails.humidity }}%</span
      >
      <div class="humidity">
        <span>0</span>
        <span>50</span>
        <span>100</span>
        <div class="humidity__bar"></div>
      </div>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Visibility </span>
      <span class="highlight-card__description">
        {{ dayDetails.visibility }} miles
      </span>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Air Pressure </span>
      <span class="highlight-card__description">
        {{ dayDetails.airPressure }}mb
      </span>
    </article>
  </section>
</template>
<script>
export default {
  name: "Highlights",
  props: {
    dayDetails: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>
