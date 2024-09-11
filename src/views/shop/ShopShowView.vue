<script setup>
import {useCityStore} from '@/stores/city.js'
import {useAuthStore} from "@/stores/auth.js";
import {fetchQuests} from "@/assets/city-service.js";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";

const cityStore = useCityStore()
const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
authStore.init()

const handlingPayment = ref(false);

if (!authStore.isLoggedIn) {
  router.push('/');
}

function setup() {
  const q = fetchQuests()
      .then((d) => cityStore.setCities(d.data))
      .catch((e) => {
        console.error(e);
      });
}

function buy() {
  handlingPayment.value = true;
  authStore.buyTrip(route.params.id, city.value.price)
      .then((data) => {
        console.log(data);
        window.location.href = data._links.checkout.href;
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => handlingPayment.value = false);
}

const city = computed(() => cityStore.cities.find((c) => c.id === route.params.id));

setup();
</script>

<template>
  <div class="m-4 md:m-6 lg:m-8" v-if="city">
    <h2 class="text-2xl font-bold">{{ city.name }}</h2>
    <div class="text-gray-400">
      Na aankoop van deze quest kan je hem meteen spelen
    </div>

    <div class="grid gap-4 mt-4">
      <img :src="`https://data.arendz.nl/assets/${city.image}`"
           alt="Image of this city"
           class="w-full h-60 object-cover object-center rounded">
      <div class="bg-white rounded p-4 text-gray-800">{{ city.description }}</div>

      <div class="bg-white rounded p-4 text-gray-800 flex flex-col">
        <div class="text-sm mb-2 opacity-80">
          Door deze quest te kopen ga je akkoord met de voorwaarden. Hij wordt meteen toegevoegd aan je speelbare
          challenges na de betaling.
        </div>
        <button
            type="button"
            class="block text-white py-2 px-4 rounded bg-indigo-800 hover:bg-indigo-900 transition duration-100"
            @click="buy()"
            :class="{'opacity-50': handlingPayment}"
            :disabled="handlingPayment"
        >
          Kopen
        </button>
      </div>
    </div>
  </div>

  <div v-else>
    Stad wordt geladen
  </div>
</template>
