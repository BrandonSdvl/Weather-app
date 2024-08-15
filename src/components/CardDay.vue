<script setup>
import { useAppStore } from "@/store/appStore.js";

const appStore = useAppStore();

defineProps({
  day: {
    type: Object,
    default: {},
    required: true,
  },
})
</script>

<template>
  <article class="card-day">
    <span class="card-day__date">{{ day.day }}</span>
    <img :src="day.imageStatus" alt="day" class="card-day__image" />
    <div class="card-day__state">
      <span class="card-day__max">{{ day.maxTemp + appStore.unitSelected }}</span>
      <span class="card-day__min">{{ day.minTemp + appStore.unitSelected }}</span>
    </div>
  </article>
</template>
