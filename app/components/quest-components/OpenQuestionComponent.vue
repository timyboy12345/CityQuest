<script setup>
import MarkdownIt from "markdown-it";

const {step} = defineProps(['quest', 'step'])
const emit = defineEmits(['nextStep'])

const answer = ref('');
const showRightExplanation = ref(false);
const markdown = new MarkdownIt();
const wrongAnswers = ref([]);
const processing = ref(false);

function handleAnswer() {
  if (processing.value) return

  processing.value = true;
  setTimeout(() => checkAnswer(answer.value), 500)
}

function checkAnswer(answer) {
  processing.value = false;

  let ans = answer;

  if (!step.item.case_sensitive) ans = ans.toLowerCase();
  if (step.item.only_alpha_numeric) ans = ans.replace(/[^a-z0-9]/gi, '');

  const answers = step.item.answers.map((a) => {
    if (!step.item.case_sensitive) a = a.toLowerCase();
    if (step.item.only_alpha_numeric) a = a.replace(/[^a-z0-9]/gi, '');
    return a;
  });

  if (answers.includes(ans)) {
    if (step.item.right_explanation) {
      showRightExplanation.value = true;
    } else {
      emit('nextStep');
    }
  } else {
    wrongAnswers.value.push(answer.value);
    alert('Dit antwoord is niet goed, probeer het nog eens')
  }
}
</script>

<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="font-bold text-2xl">Vraag</h1>
    <h2 class="opacity-80 mb-8">{{ step.item.title }}</h2>
    <article
        class="prose max-w-none lg:prose-xl prose-invert"
        v-html="markdown.render(step.item.content)"
    />

    <form class="mb-16 mt-4 grid gap-4" @submit.prevent="handleAnswer">
      <div class="flex flex-col">
        <label for="answer" class="text-sm text-gray-400">Jouw antwoord</label>
        <input id="answer" v-model="answer" name="answer" type="text" class="rounded text-gray-800">
      </div>

      <button type="submit" :class="{'opacity-50': processing}" class="flex flex-row justify-center items-center bg-indigo-500 hover:bg-indigo-600 rounded transition-all duration-100 cursor-pointer py-2 px-4">
        <span v-show="processing" role="status" class="ml-2 mr-2">
          <svg aria-hidden="true" class="w-6 h-6 text-indigo-300 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </span>

        Antwoord opsturen
      </button>
    </form>

    <div
        :class="{hidden: !showRightExplanation}"
        class="fixed flex flex-col items-stretch justify-evenly w-full h-full left-0 top-0">
      <div class="-z-10 bg-black opacity-70 w-full h-full absolute"/>
      <div class="z-10 text-zinc-100 p-4 bg-zinc-800 rounded m-4 md:m-6 lg:m-8">
        <div v-if="step.item.right_explanation">
          {{ step.item.right_explanation }}

          <button
              class="cursor-pointer block mt-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100 text-white py-2 px-4"
              type="button" @click="$emit('nextStep')">
            Ga door
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
