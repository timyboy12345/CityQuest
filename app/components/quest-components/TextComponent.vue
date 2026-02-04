<script setup>
import MarkdownIt from "markdown-it";

defineProps(['quest', 'step']);
defineEmits(['nextStep'])

const markdown = new MarkdownIt();
</script>

<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="mb-4 font-bold text-2xl">{{ step.item.title }}</h1>
    <article
        class="prose max-w-none lg:prose-xl prose-invert"
        v-html="markdown.render(step.item.content)"
    />
    <article class="opacity-70 prose max-w-none lg:prose-xl prose-invert mt-8 mb-14">Druk op de knop "Volgende Stap" om
      door te gaan.
    </article>

    <button
        type="button"
        class="fixed cursor-pointer right-4 md:right-6 lg:right-8 bottom-4 md:bottom-6 lg:bottom-8 py-2 px-4 rounded bg-indigo-500 transition duration-100 hover:bg-indigo-600"
        @click="$emit('nextStep')">
      Volgende stap
    </button>
  </div>
</template>

<style scoped>

</style>
