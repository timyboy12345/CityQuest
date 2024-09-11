<script setup>
import {useCityStore} from '@/stores/city'
import {fetchQuests} from "@/assets/city-service.js";
import {useAuthStore} from "@/stores/auth.js";
import {auth} from "@directus/sdk";
import QuestCard from "@/components/cards/QuestCard.vue";

const cityStore = useCityStore()
const authStore = useAuthStore()
authStore.init()
</script>

<template>
  <main class="m-6 lg:m-8">
    <h2 class="text-2xl font-bold">Welkom bij CityQuest</h2>
    <div class="text-gray-400">Dit is waar het allemaal begint, start hier jouw speurtocht, of koop een nieuwe
      speurtocht.
    </div>

    <div class="flex flex-col gap-4 mt-8" v-if="authStore.isLoggedIn && authStore.user">
      <div class="bg-white rounded text-gray-800 p-4">
        <div class="flex flex-row items-center">
          <img alt="Jouw profielfoto" class="mr-4 rounded-full h-16 w-16 object-cover"
               :src="`https://data.arendz.nl/assets/${authStore.user.avatar}`"/>
          <div class="flex flex-col">
            <div class="-mb-1">{{ authStore.user.first_name }} {{ authStore.user.last_name}}</div>
            <div class="opacity-70">{{ authStore.user.email }}</div>
          </div>
        </div>
      </div>

      <QuestCard :city="trip.quest" v-for="trip in authStore.trips" />

      <button class="outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
              type="button" @click="authStore.logout()">
        Uitloggen
      </button>
    </div>

    <div v-else class="flex flex-col">
      Je bent nog niet ingelogd

      <RouterLink to="/login" class="hover:no-underline underline">Log hier in</RouterLink>
      <RouterLink to="/register" class="hover:no-underline underline">Maak hier een account aan</RouterLink>
    </div>

    <div v-if="cityStore.cities" class="mt-8 grid lg:grid-cols-2 gap-4">
      <QuestCard :key="city.id" v-for="city in cityStore.cities" :city="city"/>
    </div>
  </main>
</template>
