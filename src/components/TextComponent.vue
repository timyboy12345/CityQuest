<script setup>
import MarkdownIt from "markdown-it";
import {useCityStore} from "@/stores/city.js";

const cityStore = useCityStore();
const markdown = new MarkdownIt();
</script>

<template>
  <div class="p-6 lg:p-8">
    <h1 class="mb-4 font-bold text-2xl">{{ cityStore.step.item.title }}</h1>
    <article class="prose max-w-none lg:prose-xl prose-invert" v-html="markdown.render(cityStore.step.item.content)"></article>
    <article class="opacity-70 prose max-w-none lg:prose-xl prose-invert mt-8">Druk op de knop "Volgende Stap" om door te gaan.</article>

    <button @click="cityStore.nextStep()" type="button" class="fixed right-8 bottom-8 py-2 px-4 rounded bg-indigo-800 transition duration-100 hover:bg-indigo-900">
      Volgende stap
    </button>
  </div>
</template>

<style scoped>

</style>
