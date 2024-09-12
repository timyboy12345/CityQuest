<script setup>
import {useCityStore} from '@/stores/city.js'
import {useAuthStore} from "@/stores/auth.js";
import QuestCard from "@/components/cards/QuestCard.vue";
import {fetchQuests} from "@/assets/city-service.js";
import {useRouter} from "vue-router";
import LoadingCard from "@/components/cards/LoadingCard.vue";

const cityStore = useCityStore()
const authStore = useAuthStore()
const router = useRouter();
authStore.init()

function setup() {
  fetchQuests()
      .then((d) => cityStore.setCities(d.data))
      .catch((e) => {
        console.error(e);
      });
}


setup();
</script>

<template>
  <main class="m-4 md:m-6 lg:m-8">
    <h2 class="text-2xl font-bold">Nieuwe Quests kopen</h2>
    <div class="text-gray-400">
      Koop hier jouw volgende quest, zodat het avontuur door kan gaan!
    </div>
    <RouterLink class="text-sm underline hover:no-underline opacity-80" to="/">Terug naar het overzicht</RouterLink>

    <div class="flex flex-col gap-4 mt-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="cityStore.cities">
        <QuestCard :show-price="true" to="shop" :city="city" v-for="city in cityStore.cities"/>
      </div>

      <div v-else>
        <LoadingCard :with-card="true" :with-header="true"/>
      </div>
    </div>
  </main>
</template>
