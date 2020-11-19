<template>
  <section class="highlights-container">
    <h2>Today's Hightlight</h2>
    <article class="highlight-card highlight-card__wind-status">
      <span class="highlight-card__title">Wind Status</span>
      <div class="highlight-card__description-container">
        <span class="highlight-card__description">{{
          dayDetails.windStatus
        }}</span>
        <span class="highlight-card__unit">mph</span>
      </div>
      <div class="highlight-card__direction-container">
        <i
          class="fas fa-location-arrow highlight-card__icon"
          v-bind:style="{
            transform: `rotate(${
              this.dayDetails.windDirectionDegrees - 45
            }deg)`,
          }"
        ></i>
        <span class="highlight-card__direction">{{
          dayDetails.windDirection
        }}</span>
      </div>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Humidity </span>
      <div class="highlight-card__description-container">
        <span class="highlight-card__description">{{
          dayDetails.humidity
        }}</span>
        <span class="highlight-card__unit">%</span>
      </div>
      <div class="humidity">
        <div class="humidity__numbers">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div class="humidity__bar"></div>
        <div
          class="humidity__percentage-bar"
          v-bind:style="{ width: dayDetails.humidity + '%' }"
        ></div>
        <span class="humidity__unit">%</span>
      </div>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Visibility </span>
      <div class="highlight-card__description-container">
        <span class="highlight-card__description">
          {{ dayDetails.visibility }}
        </span>
        <span class="highlight-card__unit">miles</span>
      </div>
    </article>
    <article class="highlight-card">
      <span class="highlight-card__title"> Air Pressure </span>
      <div class="highlight-card__description-container">
        <span class="highlight-card__description">
          {{ dayDetails.airPressure }}
        </span>
        <span class="highlight-card__unit">mb</span>
      </div>
    </article>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Highlights",
  computed: {
    ...mapState(["dayDetails"]),
  },
};
</script>
