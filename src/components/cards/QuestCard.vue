<script setup>
import {computed, toRefs} from "vue";

const props = defineProps(['city', 'to', 'showPrice'])
const { city } = toRefs(props)
const price = computed(() => city.value ? (Math.round(city.value.price * 100) / 100).toFixed(2) : "???")
</script>

<template>
  <RouterLink
      :to="to !== 'shop' ? `/city/${city.id}` : `/shop/${city.id}`"
      class="relative cursor-pointer hover:shadow-gray-800 transition duration-100 flex flex-col rounded overflow-hidden bg-gray-700 shadow-gray-900 shadow"
  >
    <img v-if="city.image"
         :src="`https://data.arendz.nl/assets/${city.image}`"
         alt="Image depicting this city"
         class="w-full h-60 object-cover content-center">
    <div v-else class="w-full h-60 bg-gray-600"></div>
    <div class="p-4">
      <div class="font-bold flex flex-row items-center">{{ city.name }}
        <span v-if="showPrice" class="ml-2 font-normal rounded bg-indigo-500 py-0.5 px-1 text-xs">
          {{ city.price > 0 ? `&euro; ${price}` : 'Gratis' }}
        </span>
      </div>
      <div class="text-sm opacity-70">{{ city.description }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
