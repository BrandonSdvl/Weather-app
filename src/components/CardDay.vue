<template>
  <article class="card-day">
    <span class="card-day__date"></span>
    <img alt="" class="card-day__image" />
    <div class="card-day__state">
      <span class="card-day__max"></span>
      <span class="card-day__min"></span>
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
