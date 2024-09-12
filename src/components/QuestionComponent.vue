<script setup>
import {useCityStore} from "@/stores/city.js";
import MarkdownIt from "markdown-it";
import {ref} from "vue";

const props = defineProps({})
const markdown = new MarkdownIt();
const cityStore = useCityStore();
const wrongAnswers = ref([]);
const rightExplanation = ref();
const wrongExplanation = ref();

function handleAnswerClick(answer) {
  if (answer.right ?? false) {
    console.log("Question answered correctly");

    if (answer.explanation) {
      rightExplanation.value = answer.explanation;
    } else {
      cityStore.nextStep();
    }
  } else {
    if (answer.explanation) {
      wrongExplanation.value = answer.explanation;
    }

    wrongAnswers.value.push(answer.text);
  }
}
</script>

<template>
  <div class="p-6 lg:p-8">
    <h1 class="font-bold text-2xl">Vraag</h1>
    <h2 class="opacity-80 mb-8">{{ cityStore.step.item.title }}</h2>
    <article class="prose max-w-none lg:prose-xl prose-invert"
             v-html="markdown.render(cityStore.step.item.content)"></article>

    <div class="mt-8 flex flex-col gap-y-4">
      <button
          @click="handleAnswerClick(answer)"
          v-for="answer in cityStore.step.item.answers"
          class="rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 py-2 px-4"
          type="button"
          :class="{'opacity-50 bg-red-800 hover:bg-red-900': wrongAnswers.includes(answer.text)}"
          :disabled="wrongAnswers.includes(answer.text)"
      >
        {{ answer.text }}
      </button>
    </div>

    <div :class="{hidden: !rightExplanation && !wrongExplanation}" class="fixed flex flex-col items-stretch justify-evenly w-full h-full left-0 top-0">
      <div class="-z-10 bg-black opacity-60 w-full h-full absolute"></div>
      <div class="z-10 text-gray-200 p-4 bg-gray-700 rounded m-8">
        <div v-if="rightExplanation">
          {{ rightExplanation }}

          <button class="block mt-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 text-white py-2 px-4" @click="cityStore.nextStep()" type="button">
            Ga door
          </button>
        </div>

        <div v-else>
          {{ wrongExplanation }}

          <button class="block mt-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 text-white py-2 px-4" @click="wrongExplanation = null" type="button">
            Nog een poging
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
