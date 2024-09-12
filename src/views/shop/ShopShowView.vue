<script setup>
import {useCityStore} from '@/stores/city.js'
import {useAuthStore} from "@/stores/auth.js";
import {fetchQuests} from "@/assets/city-service.js";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";

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
        window.location.href = data.next;
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => handlingPayment.value = false);
}

const city = computed(() => cityStore.cities.find((c) => c.id === route.params.id));
const price = computed(() => city.value ? (Math.round(city.value.price * 100) / 100).toFixed(2) : "???")

setup();
</script>

<template>
  <div class="m-4 md:m-6 lg:m-8" v-if="city">
    <h2 class="text-2xl font-bold">{{ city.name }}</h2>
    <div class="text-gray-400">
      Na aankoop van deze quest kan je hem meteen spelen
    </div>

    <div class="grid gap-4 mt-4">
      <img v-if="city.image"
           :src="`https://data.arendz.nl/assets/${city.image}`"
           alt="Image of this city"
           class="w-full h-60 object-cover object-center rounded">
      <div class="bg-gray-700 rounded p-4 text-gray-200">{{ city.description }}</div>

      <GeneralCard>
        <div class="flex flex-col">
          <div class="text-sm mb-2 opacity-80">
            Door deze quest te kopen ga je akkoord met de voorwaarden. Hij wordt meteen toegevoegd aan je speelbare
            challenges na de betaling.
          </div>
          <button
              type="button"
              class="block text-white py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100"
              @click="buy()"
              :class="{'opacity-50': handlingPayment}"
              :disabled="handlingPayment"
          >
            Kopen (&euro;{{ price }})
          </button>
        </div>
      </GeneralCard>
    </div>
  </div>

  <div v-else>
    Stad wordt geladen
  </div>
</template>
