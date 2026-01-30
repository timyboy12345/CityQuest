<script setup lang="ts">
const {step} = defineProps(['zoom', 'center', 'ownLocation', 'quest', 'step', 'targetLocation', 'targetRadius'])
defineEmits(['mapClick'])

const poly = computed(() => step.item.polygon.coordinates[0].map((l) => [l[1], l[0]]));
</script>

<template>
  <LMap
      ref="map"
      :center="center"
      :options="{zoomControl: false, attributionControl: false}"
      :useGlobalLeaflet="false"
      :zoom="zoom"
      class="absolute -z-0"
      @click="$emit('mapClick', $event.latlng)"
  >
    <LTileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="StoryWalks Map"
    ></LTileLayer>

    <l-circle-marker v-if="ownLocation" :lat-lng="ownLocation"></l-circle-marker>
    <l-circle-marker
        v-if="step.item.polygon.type === 'Circle'"
        :lat-lng="targetLocation"
        :radius="targetRadius"
        color="#fff"></l-circle-marker>
    <l-polygon
        v-else-if="step.item.polygon.type === 'Polygon'"
        :lat-lngs="poly"
    ></l-polygon>
  </LMap>
</template>

<style scoped>

</style>
