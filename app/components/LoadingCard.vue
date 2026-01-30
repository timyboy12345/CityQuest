<script setup>
defineProps(['withHeader', 'withCard'])
</script>

<template>
  <div class="animate-pulse">
    <div v-if="withHeader" class="h-4 bg-zinc-800 rounded-full w-48 mb-4"></div>
    <div v-if="withCard" role="status"
         class="flex items-center justify-center h-56 bg-zinc-800 rounded-lg">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>

</style>
