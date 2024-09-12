<script setup>
defineProps(['withHeader', 'withCard'])
</script>

<template>
  <div class="animate-pulse">
    <div v-if="withHeader" class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div v-if="withCard" role="status"
         class="flex items-center justify-center h-56 bg-gray-300 rounded-lg dark:bg-gray-700">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>

</style>
