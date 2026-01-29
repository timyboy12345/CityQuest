<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.init();
  
  // If user is not logged in, redirect to login page
  if (!authStore.isLoggedIn) {
    router.push({name: 'login', query: {next: '/profile'}});
  }
});
</script>

<template>
  <main class="m-4 sm:w-full sm:max-w-2xl sm:mx-auto mt-8">
    <h1 class="text-2xl font-bold">Jouw Profiel</h1>
    <p class="opacity-60 mb-6">Hier vind je al jouw persoonlijke informatie</p>

    <div v-if="authStore.isLoggedIn && authStore.user" class="flex flex-col gap-4">
      <!-- Profile Picture and Basic Info -->
      <div class="bg-gray-700 rounded text-gray-200 p-6">
        <div class="flex flex-col items-center sm:flex-row">
          <div class="mb-4 sm:mb-0 sm:mr-6">
            <img v-if="authStore.user.avatar" 
                 alt="Jouw profielfoto" 
                 class="rounded-full h-32 w-32 object-cover"
                 :src="`https://data.arendz.nl/assets/${authStore.user.avatar}`"/>
            <div v-else class="rounded-full h-32 w-32 bg-gray-600 flex items-center justify-center text-4xl">
              {{ authStore.user.first_name?.charAt(0) }}{{ authStore.user.last_name?.charAt(0) }}
            </div>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h2 class="text-2xl font-semibold">{{ authStore.user.first_name }} {{ authStore.user.last_name }}</h2>
            <p class="text-gray-400 mt-1">{{ authStore.user.email }}</p>
          </div>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="bg-gray-700 rounded text-gray-200 p-6">
        <h3 class="text-xl font-semibold mb-4">Persoonlijke Informatie</h3>
        <div class="grid gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-600 pb-3">
            <span class="font-medium sm:w-40">Voornaam:</span>
            <span class="text-gray-300">{{ authStore.user.first_name || 'Niet ingesteld' }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-600 pb-3">
            <span class="font-medium sm:w-40">Achternaam:</span>
            <span class="text-gray-300">{{ authStore.user.last_name || 'Niet ingesteld' }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-600 pb-3">
            <span class="font-medium sm:w-40">Email:</span>
            <span class="text-gray-300">{{ authStore.user.email || 'Niet ingesteld' }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center">
            <span class="font-medium sm:w-40">Gebruikers ID:</span>
            <span class="text-gray-300 font-mono text-sm">{{ authStore.user.id }}</span>
          </div>
        </div>
      </div>

      <!-- Trip Statistics -->
      <div v-if="authStore.trips" class="bg-gray-700 rounded text-gray-200 p-6">
        <h3 class="text-xl font-semibold mb-4">Jouw Avonturen</h3>
        <div class="grid gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-600 pb-3">
            <span class="font-medium sm:w-40">Totaal aantal trips:</span>
            <span class="text-gray-300">{{ authStore.trips.length }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-600 pb-3">
            <span class="font-medium sm:w-40">Actieve trips:</span>
            <span class="text-gray-300">{{ authStore.trips.filter(t => t.status === 'playing').length }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center">
            <span class="font-medium sm:w-40">Voltooide trips:</span>
            <span class="text-gray-300">{{ authStore.trips.filter(t => t.status === 'finished').length }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid md:grid-cols-2 gap-4 mt-4">
        <RouterLink to="/"
                    class="text-center outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded">
          Terug naar Home
        </RouterLink>
        <button
            class="outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
            type="button" @click="authStore.logout().then(() => router.push('/'))">
          Uitloggen
        </button>
      </div>
    </div>

    <div v-else class="bg-gray-700 rounded text-gray-200 p-6">
      <p>Laden van profielinformatie...</p>
    </div>
  </main>
</template>

<style scoped>
</style>
