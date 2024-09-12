<script setup>
import {useCityStore} from '@/stores/city.js'
import {useAuthStore} from "@/stores/auth.js";
import {fetchQuests} from "@/assets/city-service.js";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import LoadingCard from "@/components/cards/LoadingCard.vue";
import MarkdownIt from "markdown-it";

const cityStore = useCityStore()
const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const markdown = new MarkdownIt();
authStore.init()

const handlingPayment = ref(false);

function setup() {
  fetchQuests()
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

const city = computed(() => cityStore.cities ? cityStore.cities.find((c) => c.id === route.params.id) : null);
const price = computed(() => city.value ? (Math.round(city.value.price * 100) / 100).toFixed(2) : "???")

setup();
</script>

<template>
  <div class="m-4 md:m-6 lg:m-8" v-if="city">
    <h2 class="text-2xl font-bold">{{ city.name }}</h2>
    <RouterLink class="text-sm underline hover:no-underline opacity-80" to="/shop">Terug naar het overzicht</RouterLink>

    <div class="grid gap-4 mt-4">
      <img v-if="city.image"
           :src="`https://data.arendz.nl/assets/${city.image}`"
           alt="Image of this city"
           class="w-full h-60 object-cover object-center rounded">
      <div class="bg-gray-700 rounded p-4 text-gray-200 prose prose-invert prose-sm"
           v-html="markdown.render(city.content)"/>

      <GeneralCard v-if="authStore.isLoggedIn">
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
            {{ city.price === 0 ? 'Gratis Claimen' : `Kopen voor &euro;${price}` }}
          </button>

          <div class="mt-2">
            Na aankoop van deze quest kan je hem meteen spelen
          </div>
        </div>
      </GeneralCard>

      <GeneralCard v-else>
        Je bent niet ingelogd, dus je kan geen trips kopen.

        <RouterLink :to="`/login?next=/shop/${route.params.id}`" class="underline hover:no-underline">Log hier in
        </RouterLink>
      </GeneralCard>
    </div>
  </div>

  <div v-else class="m-4 md:m-6 lg:m-8">
    <LoadingCard :with-card="true" :with-header="true"/>
  </div>
</template>
