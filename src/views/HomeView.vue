<script setup>
import { useCityStore } from '@/stores/city'
import {fetchQuests} from "@/assets/city-service.js";

const cityStore = useCityStore()
const q = fetchQuests()
    .then((d) => cityStore.setCities(d.data))
    .catch((e) => {
      console.error(e);
    });
</script>

<template>
  <main class="m-6 lg:m-8">
    <h2 class="text-2xl font-bold">Selecteer jouw stad</h2>
    <div class="text-gray-400">Dit is waar het allemaal begint, kies hier de stad waar je jouw speurtocht wil spelen.</div>

    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <RouterLink :to="`/city/${city.id}`" class="cursor-pointer hover:shadow-gray-800 transition duration-100 flex flex-col rounded overflow-hidden bg-gray-900 shadow-gray-900 shadow" :key="city.id" v-for="city in cityStore.cities">
        <img alt="Image depicting this city" class="w-full h-60 object-cover content-center" :src="`https://data.arendz.nl/assets/${city.image}`">
        <div class="p-4">
          <div class="font-bold">{{ city.name }}</div>
          <div class="text-sm opacity-70">{{ city.description }}</div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
