<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const trip = ref();
authStore.init()

if (!authStore.isLoggedIn) {
  router.push('/');
}

function setup() {
  authStore.getTrip(route.query.id)
      .then((d) => {
        trip.value = d
      })
      .catch((e) => {
        console.error(e);
        trip.value = {};
      });
}

setup();
</script>

<template>
  <div class="flex flex-col sm:items-center h-screen">
    <div v-if="trip && Object.keys(trip).length === 0" class="bg-white rounded p-4 text-gray-800 sm:w-96 m-4 md:m-6 lg:m-8">
      <h1 class="font-bold">Aankoop kon niet worden geladen</h1>
      <p class="opacity-80 mb-4">Er ging iets fout bij het laden van je aankoop, check of de URL weg goed is.</p>
      <p class="opacity-80">Mocht dat niet het probleem zijn, check dan of je aankoop wel op de
        <RouterLink to="/" class="underline hover:no-underline">homepagina</RouterLink>
        te zien is.
      </p>
    </div>

    <div class="sm:w-96 m-4 md:m-6 lg:m-8" v-else-if="trip">
      <h2 class="text-2xl font-bold">{{ trip.quest.name }}</h2>
      <div class="text-gray-400">
        {{ trip.mollie_payment_status === 'paid' ? 'Aankoop voltooid' : 'Aankoop nog niet voltooid' }}
      </div>

      <div class="grid gap-4 mt-4">
        <img :src="`https://data.arendz.nl/assets/${trip.quest.image}`"
             alt="Image of this city"
             class="w-full h-60 object-cover object-center rounded">

        <div v-if="trip.mollie_payment_status === 'paid'" class="bg-white rounded p-4 text-gray-800">
          Je betaling is gelukt. Je kan nu naar de
          <RouterLink to="/" class="underline hover:no-underline">homepagina</RouterLink> om meteen te beginnen, of je kan wachten tot een later moment. De keuze is aan jou!
        </div>

        <div class="bg-white rounded p-4 text-gray-800" v-else>
          Je betaling is nog niet helemaal doorgekomen, check of het geld wel is afgeschreven. Zo ja, dan duurt het misschien enkele minuten tot de betalingsverwerker dit aan ons heeft doorgegeven.
        </div>

        <RouterLink
            class="text-center outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
            type="button" to="/">
          Naar het beginscherm
        </RouterLink>
      </div>
    </div>

    <div v-else class="bg-white rounded p-4 text-gray-800 sm:w-96 m-4 md:m-6 lg:m-8">
      Aankoop wordt geladen
    </div>
  </div>
</template>
