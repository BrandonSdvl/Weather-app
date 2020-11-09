<template>
    <div class="basic">
        <div class="basic__button-container">
            <button class="basic__search-place">Search for places</button>
            <button class="basic__get-location"><i class="fas fa-compass logo"></i></button>
        </div>
        <div class="basic__image-container">
            <img src="../assets/Shower.png" alt="" srcset="" class="basic__image">
        </div>
        <h1 class="basic__degrees">15<span class="basic__unit">°C</span></h1>
        <h2 class="basic__weather-status">Shower</h2>
        <div class="basic__date">
            Today<span class="separator">•</span><span class="">Fri, jun</span>
        </div>
        <div class="basic__location-content">
            <i class="fas fa-map-marker-alt location-logo"></i>
            <span class="basic__location-city">CDMX</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Basic',
}
</script>