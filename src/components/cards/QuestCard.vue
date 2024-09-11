<script setup>
defineProps(['city', 'to'])
</script>

<template>
  <RouterLink
      :to="to !== 'shop' ? `/city/${city.id}` : `/shop/${city.id}`"
      class="cursor-pointer hover:shadow-gray-800 transition duration-100 flex flex-col rounded overflow-hidden bg-gray-900 shadow-gray-900 shadow"
  >
    <img alt="Image depicting this city" class="w-full h-60 object-cover content-center"
         :src="`https://data.arendz.nl/assets/${city.image}`">
    <div class="p-4">
      <div class="font-bold">{{ city.name }}</div>
      <div class="text-sm opacity-70">{{ city.description }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
