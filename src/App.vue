<template>
  <div id="app">
    <Basic/>
    <Details/>
  </div>
</template>

<script>
import Basic from './components/Basic.vue'
import Details from './components/Details.vue'

export default {
  name: 'App',
  components: {
    Basic
  }
}
</script>

<style lang="scss" src="./scss/styles.scss"></style>