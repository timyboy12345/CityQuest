<script setup>
import {computed} from "vue";

const {quest} = defineProps(['quest', 'to', 'showPrice'])
const price = computed(() => quest ? (Math.round(quest.price * 100) / 100).toFixed(2) : "???")
</script>

<template>
  <RouterLink
      :to="to !== 'shop' ? `/city/${quest.id}` : `/shop/${quest.id}`"
      class="relative cursor-pointer  transition duration-100 flex flex-col rounded overflow-hidden bg-zinc-800 shadow"
  >
    <img
        v-if="quest.image"
        :src="`https://data.arendz.nl/assets/${quest.image}?width=600`"
        alt="Image depicting this city"
        class="w-full h-60 object-cover content-center">
    <div v-else class="w-full h-60 bg-gray-600"/>
    <div class="p-4">
      <div class="font-bold flex flex-row items-center">{{ quest.name }}
        <span v-if="showPrice" class="ml-2 font-normal rounded bg-indigo-500 py-0.5 px-1 text-xs">
          {{ quest.price > 0 ? `&euro; ${price}` : 'Gratis' }}
        </span>
      </div>
      <div class="text-sm opacity-70">{{ quest.description }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
