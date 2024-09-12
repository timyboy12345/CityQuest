<script setup>
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();
</script>

<template>
  <div class="bg-gray-700 rounded text-gray-200 p-4">
    <div class="flex flex-row items-center">
      <img alt="Jouw profielfoto" class="mr-4 rounded-full h-16 w-16 object-cover"
           :src="`https://data.arendz.nl/assets/${authStore.user.avatar}`"/>
      <div class="flex flex-col">
        <div class="-mb-1">{{ authStore.user.first_name }} {{ authStore.user.last_name }}</div>
        <div class="opacity-70">{{ authStore.user.email }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
