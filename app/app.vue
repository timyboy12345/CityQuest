<template>
  <div>
    <NuxtRouteAnnouncer/>

    <div class="absolute overflow-y-scroll w-screen h-screen bg-zinc-900 text-zinc-200">
      <div class="sm:max-w-xl md:max-w-2xl lg:max-w-3xl sm:mx-auto xl:max-w-4xl">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - StoryWalks` : 'StoryWalks'
  },
})
</script>
