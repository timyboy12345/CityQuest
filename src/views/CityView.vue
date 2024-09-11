<template>
  <div v-if="!supportsGeoLocation">
    Dit device ondersteund geen geolocatie
  </div>

  <div class="relative h-screen p-6 lg:p-8" v-if="hasGeoLocation !== 1">
    <div class="flex flex-col items-center justify-center h-full"  v-if="hasGeoLocation === 0">
    <div class="flex flex-col items-center bg-white shadow rounded p-4 max-w-96 text-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 text-indigo-800 mb-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>

      <div class="font-bold text-2xl">Locatietoestemming</div>
      <div class="opacity-80 text-center">Om dit spel te spelen hebben we je locatiegegevens nodig.</div>
      <button v-if="!pendingLocation"
              class="text-gray-200 mt-8 py-1 px-2 rounded bg-indigo-700 hover:bg-indigo-800 transition-colors duration-100"
              @click="askGeoPermission">
        Geef toestemming
      </button>
    </div>
    </div>

    <div v-else-if="hasGeoLocation === 2">
      <div class="font-bold text-2xl">Locatietoestemming</div>
      <div class="opacity-80">Er ging iets fout met je geolocatie, probeer opnieuw toestemming te geven.</div>

      <button v-if="!pendingLocation"
              class="mt-8 py-1 px-2 rounded bg-indigo-700 hover:bg-indigo-800 transition-colors duration-100"
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

  <div v-else-if="cityStore.city" class="w-full h-full">
    <MapComponent
        @map-click="handleMapClick($event.lat, $event.lng)"
        v-if="cityStore.step && cityStore.step.collection === 'step_poly'"
        :center="center"
        :zoom="zoom"
        :own-location="ownLocation"
    ></MapComponent>
    <TextComponent v-else-if="cityStore.step && cityStore.step.collection === 'step_text'"></TextComponent>
    <QuestionComponent v-else-if="cityStore.step && cityStore.step.collection === 'step_question'"></QuestionComponent>
    <div v-else>ONBEKENDE STAP</div>

    <!--    <div class="absolute top-0 left-0 z-10 w-full">-->
    <!--      <div class="text-gray-900 bg-white rounded p-4 m-4">-->
    <!--        Test-->
    <!--      </div>-->
    <!--    </div>-->

    <button
        @click="showHelp = true"
        type="button"
        class="rounded-full p-2 fixed left-8 bottom-8 bg-indigo-800 hover:bg-indigo-900 transition duration-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
      </svg>
    </button>

    <Transition>
      <div v-if="showHelp" class="z-40 left-0 top-0 w-screen h-screen fixed flex flex-col">
        <div @click="() => {showHelp = false; showHints = false}" class="-z-10 absolute l-0 t-0 bg-black opacity-50 h-full w-full"></div>
        <div class="m-4 flex flex-col gap-y-4">
          <div class="overflow-hidden flex flex-col divide-y divide-gray-200 z-50 bg-white rounded text-gray-800">
            <button class="py-2 px-4 hover:bg-gray-200 transition duration-100">Contact opnemen</button>
            <RouterLink :to="`/city/${cityStore.city.id}/summary`" class="py-2 px-4 hover:bg-gray-200 transition duration-100 text-center">Route Bekijken</RouterLink>
            <button class="py-2 px-4 hover:bg-gray-200 transition duration-100" v-if="cityStore.step && cityStore.step.hints" @click="showHints = !showHints">Hints {{ showHints ? "Verbergen" : "Tonen" }}</button>
            <button class="py-2 px-4 hover:bg-gray-200 transition duration-100" @click="devMode = !devMode">Devmodes {{ devMode ? "Uitzetten" : "Aanzetten" }}</button>
            <RouterLink :to="`/`" class="py-2 px-4 hover:bg-gray-200 transition duration-100 text-center">Home</RouterLink>
          </div>

          <div class="bg-white rounded text-gray-800" v-if="cityStore.step && cityStore.step.hints && showHints">
            <div class="p-4" v-for="(hint, i) in cityStore.step.hints">
              <div class="">Hint {{ i + 1 }}</div>
              <div class="opacity-10 hover:opacity-100 transition duration-100">{{ hint.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <button v-if="devMode && cityStore.stepNumber !== 0" class="hover:underline absolute left-4 bottom-4 text-xs opacity-50"
            type="button"
            @click="cityStore.previousStep()">
      Stap Terug
    </button>

    <button v-if="devMode" class="hover:underline absolute right-4 bottom-4 text-xs opacity-50"
            type="button"
            @click="cityStore.nextStep()">
      Volgende Stap
    </button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useCityStore} from "@/stores/city.js";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import MapComponent from "@/components/MapComponent.vue";
import TextComponent from "@/components/TextComponent.vue";
import {pointInCircle, pointInPoly} from "@/scripts/geoHelpers.js";
import QuestionComponent from "@/components/QuestionComponent.vue";
import {fetchQuest, fetchQuests} from "@/assets/city-service.js";

const supportsGeoLocation = ref("geolocation" in navigator);
// 0 = Not clear, 1 = Success, 2 = No permission
const hasGeoLocation = ref(0);
const devMode = ref(process.env.NODE_ENV === "development");
const showHints = ref(false);
const showHelp = ref(false);

let zoom = ref(16)
let center = ref(null)
let ownLocation = ref([0, 0])
let pendingLocation = ref(false)
let watcher = ref();

const cityStore = useCityStore();
const route = useRoute();

onBeforeRouteLeave(() => {
  console.warn("LEFT CITY PAGE");
  if (watcher.value) {
    navigator.geolocation.clearWatch(watcher.value);
    watcher.value = null;
    console.warn("CLEARED GPS WATCH");
  }
})

function setup() {
  const q = fetchQuests()
      .then((d) => cityStore.setCities(d.data))
      .catch((e) => {
        console.error(e);
      });

  const c = fetchQuest(route.params.id)
      .then((d) => cityStore.setCity(d.data))
      .catch((e) => console.error(e));
}

function askGeoPermission() {
  pendingLocation.value = true;

  // Check if geolocation is supported by the browser
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

function updateLocation(position) {
  // Get the user's latitude and longitude coordinates
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  if (!center.value) {
    center.value = [lat, lng];
  }

  ownLocation.value = [lat, lng];
  pendingLocation.value = false;
  hasGeoLocation.value = 1;

  if (cityStore.step && cityStore.step.collection === 'step_poly') {
    if (cityStore.step.item.polygon.type === 'circle') {
      // TODO: Improve circle location checker
      const inCircle = pointInCircle(lat, lng, cityStore.step.target.lat, cityStore.step.target.lng, cityStore.step.radius)
      console.log(inCircle);
    } else if (cityStore.step.item.polygon.type === 'Polygon') {
      const locs = cityStore.step.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
      const inPoly = pointInPoly([lat, lng], locs);
      console.log(inPoly);
      if (inPoly) {
        cityStore.nextStep();
      }
    }
  }

  // Update the map with the user's new location
  console.log(`Latitude: ${lat}, longitude: ${lng}`);
}

function handleMapClick(lat, lng) {
  const locs = cityStore.step.item.polygon.coordinates[0].map((l) => [l[1], l[0]])
  const inPoly = pointInPoly([lat, lng], locs);
  console.log(inPoly);
}

setup();
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
