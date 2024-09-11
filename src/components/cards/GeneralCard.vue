<script setup>
defineProps(['to', 'img', 'imgAlt'])
</script>

<template>
  <component
      :is="to ? 'RouterLink' : 'div'"
      :to="to"
      class="flex flex-col rounded overflow-hidden bg-gray-900 shadow-gray-900 shadow"
      :class="{'cursor-pointer hover:shadow-gray-800 transition duration-100': to}"
  >
    <img v-if="imgAlt" alt="Image depicting this city" class="w-full h-60 object-cover content-center"
         :src="img">
    <div class="p-4">
      <div class="font-bold"><slot name="title"/></div>
      <div class="text-sm opacity-70 gap-4 flex flex-col"><slot name="content"/></div>
    </div>
  </component>
</template>

<style scoped>

</style>
