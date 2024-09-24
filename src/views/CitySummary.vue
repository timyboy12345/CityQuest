<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 md:m-6 lg:m-8" v-if="cityStore.city">
    <div class="md:col-span-2 lg:col-span-3">
      <h1 class="text-2xl font-bold">{{ cityStore.city.name }}</h1>
      <h2 class="opacity-80">Dit is de samenvatting van {{ cityStore.city.name }}</h2>
      <RouterLink class="mt-4 block underline hover:no-underline" to="./">Terug</RouterLink>
    </div>

    <div class="bg-white rounded text-gray-800" v-for="step in cityStore.city.steps">
      <div class="p-4" v-if="step.collection === 'step_text'">
        <h2 class="font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Text</span>
        </h2>
        <div class="prose-sm" v-html="markdown.render(step.item.content)"></div>
      </div>
      <div class="p-4" v-if="step.collection === 'step_question'">
        <h2 class="font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Vraag</span>
        </h2>
        <div class="prose-sm" v-html="markdown.render(step.item.content)"></div>

        <div class="text-sm mt-4">Mogelijke antwoorden: {{ step.item.answers.map((a) => a.text).join(", ") }}</div>
        <div class="text-sm">
          Antwoord: {{ step.item.answers.filter((a) => a.right).map((a) => a.text).join(", ") }}
        </div>
      </div>
      <div class="relative" v-else-if="step.collection === 'step_poly'">
        <h2 class="p-4 font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Kaart</span>
        </h2>

        <div class="rounded-b w-full h-96 overflow-hidden relative">
          <l-map
              ref="map"
              :center="findPolyCenter(poly(step))"
              :options="{zoomControl: false, attributionControl: false}"
              :useGlobalLeaflet="false"
              :zoom="16"
              class="absolute -z-0"
              @click="$emit('mapClick', $event.latlng)"
          >
            <l-tile-layer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                layer-type="base"
                name="StoryWalks Map"
            ></l-tile-layer>
            <l-polygon
                :lat-lngs="poly(step)"
            ></l-polygon>
          </l-map>
        </div>
      </div>
    </div>

    <div class="mt-8 md:col-span-2 lg:col-span-3 flex flex-col">
      <h2 class="font-bold text-xl">Overzichtskaart</h2>
      <p class="opacity-80 mb-2">Hier zie je alle gebieden die bij deze quest horen</p>

      <div class="rounded overflow-hidden w-full h-96 overflow-hidden relative">
        <l-map
            ref="map"
            :center="globalMapCenter()"
            :options="{zoomControl: false, attributionControl: false}"
            :useGlobalLeaflet="false"
            :zoom="14"
            class="absolute -z-0"
            @click="$emit('mapClick', $event.latlng)"
        >
          <l-tile-layer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              layer-type="base"
              name="StoryWalks Map"
          ></l-tile-layer>
          <l-polygon
              v-for="step in cityStore.city.steps.filter((s) => s.collection === 'step_poly')"
              :lat-lngs="poly(step)"
          ></l-polygon>
          <l-marker
              v-for="(step, i) in cityStore.city.steps.filter((s) => s.collection === 'step_poly')"
              :lat-lng="findPolyCenter(poly(step))"
              :options="{icon: divIcon({html: i + 1, className: 'border-none bg-none'})}"
          ></l-marker>
        </l-map>
      </div>
    </div>
  </div>

  <div v-else class="text-center mt-8">
    Stad wordt geladen...
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useCityStore} from "@/stores/city.js";
import {useRoute} from "vue-router";
import {findPolyCenter, pointInPoly} from "@/scripts/geoHelpers.js";
import {fetchQuest} from "@/assets/city-service.js";
import MarkdownIt from "markdown-it";
import {LMap, LMarker, LPolygon, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {divIcon} from "leaflet/src/layer/index.js";

let markdown = new MarkdownIt();
let center = ref(null)

function poly(step) {
  return step.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
}

const cityStore = useCityStore();
const route = useRoute();

function setup() {
  fetchQuest(route.params.id)
      .then((d) => cityStore.setCity(d.data))
      .catch((e) => console.error(e));
}


function handleMapClick(lat, lng) {
  const locs = cityStore.step.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
  const inPoly = pointInPoly([lat, lng], locs);
}

function globalMapCenter() {
  const steps = cityStore.city.steps.filter((s) => s.collection === 'step_poly');
  const polys = steps.map((s) => findPolyCenter(poly(s)));
  return findPolyCenter(polys);
}

setup();
</script>
<style>
</style>
