<template>
  <div v-if="!questPending && quest" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 md:m-6 lg:m-8">
    <div class="md:col-span-2 lg:col-span-3">
      <RouterLink class="text-xs mb-2 block underline hover:no-underline opacity-80" to="./">
        Terug naar de quest
      </RouterLink>

      <h1 class="text-2xl font-bold">{{ quest.name }}</h1>
      <h2 class="opacity-80">Dit is de samenvatting van {{ quest.name }}</h2>
    </div>

    <div v-for="step in quest.steps" :key="step.id" class="bg-white rounded text-gray-800">
      <div v-if="step.collection === 'step_text'" class="p-4">
        <h2 class="font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Text</span>
        </h2>
        <div class="prose-sm" v-html="markdown.render(step.item.content)"/>
      </div>
      <div v-if="step.collection === 'step_question'" class="p-4">
        <h2 class="font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Vraag</span>
        </h2>
        <div class="prose-sm" v-html="markdown.render(step.item.content)"/>

        <div class="text-sm mt-4">Mogelijke antwoorden: {{ step.item.answers.map((a) => a.text).join(", ") }}</div>
        <div class="text-sm">
          Antwoord: {{ step.item.answers.filter((a) => a.right).map((a) => a.text).join(", ") }}
        </div>
      </div>
      <div v-if="step.collection === 'step_open_question'" class="p-4">
        <h2 class="font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Vraag</span>
        </h2>
        <div class="prose-sm" v-html="markdown.render(step.item.content)"/>

        <div class="text-sm mt-4">Juiste antwoorden: {{ step.item.answers.join(', ') }}</div>
      </div>
      <div v-else-if="step.collection === 'step_poly'" class="relative h-full overflow-hidden rounded-b">
        <h2 class="p-4 font-bold flex items-center">
          {{ step.item.title }}
          <span class="rounded ml-2 bg-indigo-500 py-0.5 px-1 text-xs text-white font-medium">Kaart</span>
        </h2>

        <div class="rounded-b w-full h-full min-h-96 overflow-hidden relative">
          <l-map
              ref="map"
              :center="findPolyCenter(poly(step))"
              :options="{zoomControl: false, attributionControl: false}"
              :use-global-leaflet="false"
              :zoom="16"
              class="absolute -z-0"
              @click="$emit('mapClick', $event.latlng)"
          >
            <l-tile-layer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                layer-type="base"
                name="StoryWalks Map"
            />
            <l-polygon
                :lat-lngs="poly(step)"
            />
          </l-map>
        </div>
      </div>
    </div>

    <div v-if="quest.steps.length > 0" class="mt-8 md:col-span-2 lg:col-span-3 flex flex-col">
      <h2 class="font-bold text-xl">Overzichtskaart</h2>
      <p class="opacity-80 mb-2">Hier zie je alle gebieden die bij deze quest horen</p>

      <div class="rounded overflow-hidden w-full h-96 relative">
        <l-map
            ref="map"
            :center="globalMapCenter()"
            :options="{zoomControl: false, attributionControl: false}"
            :use-global-leaflet="false"
            :zoom="14"
            class="absolute -z-0"
            @click="$emit('mapClick', $event.latlng)"
        >
          <LTileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              layer-type="base"
              name="StoryWalks Map"
          />
          <LPolygon
              v-for="step in quest.steps.filter((s) => s.collection === 'step_poly')"
              :key="step.id"
              :lat-lngs="poly(step)"
          />
          <LMarker
              v-for="(step, i) in quest.steps.filter((s) => s.collection === 'step_poly')"
              :key="i"
              :lat-lng="findPolyCenter(poly(step))"
          >
            <LIcon :icon-anchor="[4, 10]" class-name="bg-transparent text-indigo-100">{{ i + 1 }}</LIcon>
          </LMarker>
        </l-map>
      </div>
    </div>

    <div v-else class="rounded border border-orange-600 bg-opacity-10 bg-orange-800 p-4 md:col-span-2 lg:col-span-3">
      Deze quest heeft geen stappen
    </div>
  </div>

  <div v-else class="text-center mt-8">
    Stad wordt geladen...
  </div>
</template>

<script setup>
import {findPolyCenter} from "@/helpers/geoHelpers.js";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

function poly(step) {
  return step.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
}

const route = useRoute();
const {getItemById} = useDirectusItems();

const {
  data: quest,
  pending: questPending,
  error: questError,
  refresh: questRefresh,
} = await useAsyncData(`quest_${route.params.slug}`, () =>
    getItemById({
      id: route.params.slug,
      collection: 'quest',
      params: {
        fields: ['*', 'steps.*', 'steps.item.*', 'steps.item.answers.*'],
      },
    })
);

function globalMapCenter() {
  const steps = quest.value.steps.filter((s) => s.collection === 'step_poly');
  const polys = steps.map((s) => findPolyCenter(poly(s)));

  if (polys.length === 0) return [0, 0];
  if (polys.length === 1) return polys[0];

  return findPolyCenter(polys);
}
</script>
<style>
</style>
