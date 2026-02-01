<template>
  <ClientOnly>
    <div v-if="!supportsGeoLocation" class="rounded bg-red-500 bg-opacity-10 border border-red-500 p-4 m-4">
      Dit device ondersteund geen geolocatie
    </div>

    <div v-else-if="!questPending && !introPending">
      <div v-if="passedIntro && hasGeoLocation !== 1" class="relative h-screen p-4 md:p-6 lg:p-8">
        <div v-if="hasGeoLocation === 0" class="flex flex-col items-center justify-center h-full">
          <div class="flex flex-col items-center bg-zinc-800 shadow rounded p-4 max-w-96 text-zinc-100">
            <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-16 text-indigo-500 mb-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              <path
                  stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
            </svg>

            <div class="font-bold text-2xl">Locatietoestemming</div>
            <div class="opacity-80 text-center">Om dit spel te spelen hebben we je locatiegegevens nodig.</div>
            <button
                v-if="!pendingLocation"
                class="text-zinc-100 mt-8 py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 transition-colors duration-100"
                @click="askGeoPermission">
              Geef toestemming
            </button>
          </div>
        </div>

        <div v-else-if="hasGeoLocation === 2">
          <div class="font-bold text-2xl">Locatietoestemming</div>
          <div class="opacity-80">Er ging iets fout met je geolocatie, probeer opnieuw toestemming te geven.</div>

          <button
              v-if="!pendingLocation"
              class="mt-8 py-1 px-2 rounded bg-indigo-500 hover:bg-indigo-600 transition-colors duration-100"
              @click="askGeoPermission">
            Geef toestemming
          </button>
        </div>

        <RouterLink
            class="absolute bottom-8 mt-8 text-sm underline opacity-80 hover:opacity-90 rounded duration-100 transition"
            to="/">
          Terug naar de homepagina
        </RouterLink>
      </div>

      <div v-else-if="quest" class="w-full h-full">
        <div v-if="step">
          <MapComponent
              v-if="step.collection === 'step_poly'"
              :quest="quest"
              :step="step"
              :center="center"
              :zoom="zoom"
              :own-location="ownLocation"
              @map-click="handleMapClick($event.lat, $event.lng)"
              @next-step="currentStep++"
          />
          <TextComponent
              v-else-if="step.collection === 'step_text'"
              :quest="quest"
              :step="step"
              @next-step="currentStep++"
          />
          <QuestionComponent
              v-else-if="step.collection === 'step_question'"
              :quest="quest"
              :step="step"
              @next-step="currentStep++"
          />
          <OpenQuestionComponent
              v-else-if="step.collection === 'step_open_question'"
              :quest="quest"
              :step="step"
              @next-step="currentStep++"
          />
          <div v-else>ONBEKENDE STAPTYPE</div>
        </div>

        <FinishComponent :trip="trip" :quest="quest" v-else-if="currentStep === quest.steps.length"/>

        <div v-else class="rounded border border-orange-600 bg-opacity-10 bg-orange-800 p-4 m-4">
          Geen step gevonden, deze quest heeft {{ quest.steps.length }} stappen, jij zit op
          {{ currentStep }}.
        </div>

        <button
            type="button"
            class="rounded-full cursor-pointer p-2 fixed left-4 bottom-4 md:left-6 md:bottom-6 lg:left-8 lg:bottom-8 bg-indigo-500 hover:bg-indigo-600 transition duration-100"
            @click="showHelp = true">
          <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor"
              class="size-6">
            <path
                stroke-linecap="round" stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
          </svg>
        </button>
      </div>

      <Transition>
        <div v-if="showHelp" class="z-40 left-0 top-0 w-screen h-screen fixed flex flex-col">
          <div
              class="-z-10 absolute l-0 t-0 bg-black opacity-50 h-full w-full"
              @click="() => {showHelp = false; showHints = false}"/>
          <div class="m-4 flex flex-col gap-y-4">
            <div class="overflow-hidden flex flex-col divide-y divide-gray-200 z-50 bg-white rounded text-gray-800">
              <button class="py-2 px-4 cursor-pointer hover:bg-gray-200 transition duration-100">Contact opnemen
              </button>
              <RouterLink
                  :to="`/city/${quest.id}/summary`"
                  class="py-2 px-4 cursor-pointer hover:bg-gray-200 transition duration-100 text-center">Route Bekijken
              </RouterLink>
              <button
                  v-if="step && step.hints"
                  class="py-2 px-4 cursor-pointer hover:bg-gray-200 transition duration-100"
                  @click="showHints = !showHints">Hints
                {{ showHints ? "Verbergen" : "Tonen" }}
              </button>
              <button class="py-2 px-4 cursor-pointer hover:bg-gray-200 transition duration-100"
                      @click="devMode = !devMode">Devmodes
                {{ devMode ? "Uitzetten" : "Aanzetten" }}
              </button>
              <RouterLink :to="`/`" class="py-2 px-4 hover:bg-gray-200 transition duration-100 text-center">Home
              </RouterLink>
            </div>

            <div
                v-if="step && step.hints && showHints"
                class="bg-white rounded text-gray-800">
              <div v-for="(hint, i) in step.hints" :key="i" class="p-4">
                <div class="">Hint {{ i + 1 }}</div>
                <div class="opacity-10 hover:opacity-100 transition duration-100">{{ hint.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <button
          v-if="devMode && (hasGeoLocation === 1 || currentStep < 0) && currentStep !== intro.length * -1"
          class="hover:underline fixed left-4 top-4 text-xs opacity-50"
          type="button"
          @click="currentStep--">
        Stap Terug
      </button>

      <button
          v-if="devMode && (hasGeoLocation === 1 || currentStep < 0)"
          class="hover:underline fixed right-4 top-4 text-xs opacity-50"
          type="button"
          @click="currentStep++">
        Volgende Stap
      </button>
    </div>

    <div v-else class="mt-8 text-center">
      Quest wordt geladen...
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {pointInCircle, pointInPoly} from "@/helpers/geoHelpers.js";
import MapComponent from "@/components/quest-components/MapComponent.vue";
import TextComponent from "@/components/quest-components/TextComponent.vue";
import QuestionComponent from "@/components/quest-components/QuestionComponent.vue";
import FinishComponent from "@/components/quest-components/FinishComponent.vue";
import OpenQuestionComponent from "~/components/quest-components/OpenQuestionComponent.vue";

const user = useDirectusUser();
const route = useRoute();

const {getItemById, getSingletonItem, getItems} = useDirectusItems();

// TODO: Change this
const currentStep = ref(0);
const passedIntro = computed(() => currentStep.value >= 0)

const step = computed(() => {
  if (currentStep.value === undefined) {
    return null;
  }

  if (currentStep.value >= 0) {
    if (currentStep.value >= quest.value.steps.length) {
      return null;
    }

    return quest.value.steps[currentStep.value];
  }

  return intro.value[intro.value.length + currentStep.value];
})

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

const {
  data: intro,
  pending: introPending,
  error: introError,
  refresh: introRefresh,
} = await useAsyncData("intro", () =>
    getSingletonItem({
      collection: 'intro',
      params: {
        fields: ['*', 'steps.*', 'steps.item.*', 'steps.item.answers.*'],
      },
    })
        .then((intro) => {
          currentStep.value = intro.steps.length * -1;
          return intro.steps;
        })
);

// TODO: Also fetch trips that are with status "playing"
const {
  data: trip,
  pending: tripPending,
  error: tripError,
  refresh: tripRefresh,
} = await useAsyncData(`trip_${route.params.slug}`, () =>
    getItems({
      collection: 'trip',
      params: {
        filter: {'quest': route.params.slug, 'status': 'available'},
        limit: 1,
      },
    })
        .then((trips) => trips[0])
);

useHead({
  title: quest ? quest.value.name : null,
  meta: []
})

const supportsGeoLocation = ref(false);
onMounted(() => {
  supportsGeoLocation.value = "geolocation" in navigator;
});

// 0 = Not clear, 1 = Success, 2 = No permission
const hasGeoLocation = ref(0);
const devMode = ref(process.env.NODE_ENV === "development");
const showHints = ref(false);
const showHelp = ref(false);

const zoom = ref(16)
const center = ref(null)
const ownLocation = ref([0, 0])
const pendingLocation = ref(false)
const watcher = ref();

onBeforeRouteLeave(() => {
  console.warn("LEFT CITY PAGE");

  if (watcher.value) {
    navigator.geolocation.clearWatch(watcher.value);
    watcher.value = null;
    console.warn("CLEARED GPS WATCH");
  }
})

function askGeoPermission() {
  pendingLocation.value = true;

  if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    watcher.value = navigator.geolocation.watchPosition(
        // Success callback function
        updateLocation,
        // Error callback function
        function (error) {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
          pendingLocation.value = false;
          hasGeoLocation.value = 2;
        }
    );
  }
}

function updateLocation(position: GeolocationPosition) {
  // Get the user's latitude and longitude coordinates
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  if (!center.value) {
    center.value = [lat, lng];
  }

  ownLocation.value = [lat, lng];
  pendingLocation.value = false;
  hasGeoLocation.value = 1;

  if (step.value && step.value.collection === 'step_poly') {
    if (step.value.item.polygon.type === 'circle') {
      // TODO: Improve circle location checker
      const inCircle = pointInCircle(lat, lng, step.value.target.lat, step.value.target.lng, step.value.radius)
      console.log(inCircle);
    } else if (step.value.item.polygon.type === 'Polygon') {
      const locs = step.value.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
      const inPoly = pointInPoly([lat, lng], locs);
      console.log(inPoly);
      if (inPoly) {
        // cityStore.nextStep();
      }
    }
  }

  // Update the map with the user's new location
  console.log(`Latitude: ${lat}, longitude: ${lng}`);
}

function handleMapClick(lat, lng) {
  const locs = step.value.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
  const inPoly = pointInPoly([lat, lng], locs);
  console.log(inPoly);
}

</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
