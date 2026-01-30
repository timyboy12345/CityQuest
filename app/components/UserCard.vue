<script setup>
const user = useDirectusUser();
</script>

<template>
  <div class="bg-zinc-800 rounded text-gray-200 overflow-hidden">
    <div class="flex flex-row items-center">
      <img v-if="user.avatar" alt="Jouw profielfoto" class="mr-4 h-full w-16 object-cover"
           :src="`https://data.arendz.nl/assets/${user.avatar}?width=100`"/>
      <div class="mr-4 rounded-full h-full w-16 bg-gray-600" v-else></div>
      <div class="flex flex-col py-2">
        <div class="-mb-1">{{ user.first_name }} {{ user.last_name }}</div>
        <div class="opacity-70">{{ user.email }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
