<script setup>
import "leaflet/dist/leaflet.css"
import {LCircleMarker, LMap, LPolygon, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {useCityStore} from "@/stores/city.js";
import {computed} from "vue";

const props = defineProps({
  zoom: Number,
  center: Array,
  ownLocation: Array,
})

defineEmits(['mapClick'])

const cityStore = useCityStore();
const poly = computed(() => cityStore.step.item.polygon.coordinates[0].map((l) => [l[1], l[0]]));
</script>

<template>
  <l-map
      ref="map"
      :center="center"
      :options="{zoomControl: false, attributionControl: false}"
      :useGlobalLeaflet="false"
      :zoom="zoom"
      class="absolute -z-0"
      @click="$emit('mapClick', $event.latlng)"
  >
    <!--        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"-->
    <l-tile-layer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png'"
        layer-type="base"
        name="CityQuest Map"
    ></l-tile-layer>

    <l-circle-marker :lat-lng="ownLocation"></l-circle-marker>
    <l-circle-marker
        v-if="cityStore.step.item.polygon.type === 'Circle'"
        :lat-lng="targetLocation"
        :radius="targetRadius"
        color="#fff"></l-circle-marker>
    <l-polygon
        v-else-if="cityStore.step.item.polygon.type === 'Polygon'"
        :lat-lngs="poly"
    ></l-polygon>
  </l-map>
</template>

<style scoped>

</style>
