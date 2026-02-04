<script setup>
import MarkdownIt from "markdown-it";

defineProps(['quest', 'step'])
const emit = defineEmits(['nextStep'])

const markdown = new MarkdownIt();
const wrongAnswers = ref([]);
const rightExplanation = ref();
const wrongExplanation = ref();

function handleAnswerClick(answer) {
  if (answer.right ?? false) {
    console.log("Question answered correctly");

    if (answer.explanation) {
      rightExplanation.value = answer.explanation;
    } else {
      emit('nextStep');
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
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="font-bold text-2xl">Vraag</h1>
    <h2 class="opacity-80 mb-8">{{ step.item.title }}</h2>
    <article
        class="prose max-w-none lg:prose-xl prose-invert"
        v-html="markdown.render(step.item.content)"/>

    <div class="mt-8 flex flex-col gap-y-4">
      <button
          v-for="answer in step.item.answers"
          :key="answer"
          class="rounded bg-indigo-500 cursor-pointer hover:bg-indigo-600 transition duration-100 py-2 px-4"
          type="button"
          :class="{'opacity-50 bg-red-800 hover:bg-red-900': wrongAnswers.includes(answer.text)}"
          :disabled="wrongAnswers.includes(answer.text)"
          @click="handleAnswerClick(answer)"
      >
        {{ answer.text }}
      </button>
    </div>

    <div
        :class="{hidden: !rightExplanation && !wrongExplanation}"
        class="fixed flex flex-col items-stretch justify-evenly w-full h-full left-0 top-0">
      <div class="-z-10 bg-black opacity-70 w-full h-full absolute"/>
      <div class="z-10 text-zinc-100 p-4 bg-zinc-800 rounded m-4 md:m-6 lg:m-8">
        <div v-if="rightExplanation">
          {{ rightExplanation }}

          <button
              class="cursor-pointer block mt-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 text-white py-2 px-4"
              type="button" @click="$emit('nextStep')">
            Ga door
          </button>
        </div>

        <div v-else>
          {{ wrongExplanation }}

          <button
              class="block mt-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 text-white py-2 px-4"
              type="button" @click="wrongExplanation = null">
            Nog een poging
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
