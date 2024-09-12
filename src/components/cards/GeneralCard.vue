<script setup>
defineProps(['to', 'img', 'imgAlt'])
</script>

<template>
  <component
      :is="to ? 'RouterLink' : 'div'"
      :to="to"
      class="flex flex-col rounded overflow-hidden bg-gray-700 shadow-gray-900 shadow"
      :class="{'cursor-pointer hover:shadow-gray-800 transition duration-100': to}"
  >
    <img v-if="img"
         :alt="imgAlt"
         :src="img"
         class="w-full h-60 object-cover content-center">
    <div class="p-4">
      <div class="font-bold">
        <slot name="title"/>
      </div>
      <div class="text-sm gap-4">
        <slot name="default"/>
      </div>
    </div>
  </component>
</template>

<style scoped>

</style>
