<script setup lang="ts">
const {step} = defineProps<{
  zoom: number,
  center: [],
  ownLocation: [],
  quest: unknown,
  step: unknown,
  targetLocation: [],
  targetRadius: number,
}>()
defineEmits(['mapClick'])

const poly = computed(() => step.item.polygon.coordinates[0].map((l) => [l[1], l[0]]));
</script>

<template>
  <LMap
      ref="map"
      :center="center"
      :options="{zoomControl: false, attributionControl: false}"
      :use-global-leaflet="false"
      :zoom="zoom"
      class="left-0 top-0 absolute -z-0"
      @click="$emit('mapClick', $event.latlng)"
  >
    <LTileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="StoryWalks Map"
    />

    <l-circle-marker v-if="ownLocation" :lat-lng="ownLocation"/>
    <l-circle-marker
        v-if="step.item.polygon.type === 'Circle'"
        :lat-lng="targetLocation"
        :radius="targetRadius"
        color="#fff"/>
    <l-polygon
        v-else-if="step.item.polygon.type === 'Polygon'"
        :lat-lngs="poly"
    />
  </LMap>
</template>

<style scoped>

</style>
