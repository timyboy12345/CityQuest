<script setup>
import "leaflet/dist/leaflet.css"
import {LCircleMarker, LMap, LPolygon, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {useCityStore} from "@/stores/city.js";

const props = defineProps({
  zoom: Number,
  center: Array,
  targetLocation: Object,
  targetRadius: Number,
  ownLocation: Array,
})

defineEmits(['mapClick'])

const cityStore = useCityStore();
</script>

<template>
  <l-map
      ref="map"
      :center="center" :options="{zoomControl: false, attributionControl: false}"
      :useGlobalLeaflet="false"
      :zoom="zoom"
      class="absolute -z-0"
      @click="$emit('mapClick', $event.latlng)"
  >
    <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="CityQuest Map"
    ></l-tile-layer>

    <l-circle-marker :lat-lng="ownLocation"></l-circle-marker>
    <l-circle-marker
        v-if="targetLocation && targetLocation.type === 'circle'"
        :lat-lng="targetLocation"
        :radius="targetRadius"
        color="#fff"></l-circle-marker>
    <l-polygon
        v-else-if="targetLocation && targetLocation.type === 'poly'"
        :lat-lngs="targetLocation.points.map((l) => [l.lat, l.lng])"
    ></l-polygon>
  </l-map>
</template>

<style scoped>

</style>
