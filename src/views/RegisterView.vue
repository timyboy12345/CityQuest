<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/index.js";

const authStore = useAuthStore();
authStore.init();

function submitRegister() {
  if (submitting.value) {
    return;
  }

  submitting.value = true;
  authStore.register(email.value, password.value, firstName.value, lastName.value)
      .then((r) => {
        error.value = null;
        console.log(r)
        // authStore.init()
        router.push('/login');
      })
      .catch((e) => {
        console.error(e);
        error.value = e.errors[0].message
      })
      .then(() => submitting.value = false);
}

const error = ref()
const submitting = ref(false)
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
</script>

<template>
  <div class="m-4 md:m-6 lg:m-8">
    <h1 class="text-2xl font-bold">Registreren</h1>
    <p class="opacity-60">Maak hier je account aan en krijg toegang tot alle avonturen.</p>
    <form v-if="!authStore.isLoggedIn" @submit.prevent="submitRegister" class="mt-8">
      <div class="grid md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input v-model="email" id="email" name="email" type="text" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="password">Wachtwoord</label>
          <input v-model="password" id="password" name="password" type="password" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="firstName">Voornaam</label>
          <input v-model="firstName" id="firstName" name="firstName" type="text" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="lastname">Achternaam</label>
          <input v-model="lastName" id="lastname" name="lastname" type="text" class="rounded text-gray-800">
        </div>
      </div>

      <div class="flex gap-x-4 justify-end items-center mt-4">
        <div v-if="error" class="text-red-500 rounded outline outline-1 py-2 px-4">
          {{ error }}
        </div>
        <button type="submit"
                :disabled="submitting"
                :class="{'opacity-50': submitting}"
                class="float-right px-4 py-2 bg-indigo-800 hover:bg-indigo-900 transition duration-100 rounded">
          Account aanmaken
        </button>
      </div>
    </form>
    <div v-else class="mt-8 flex flex-col">
      Je bent al ingelogd

      <RouterLink to="/" class="underline mt-4">Terug naar de homepagina</RouterLink>
    </div>

    <RouterLink to="/" class="underline hover:no-underline">Terug naar de homepagina</RouterLink>
  </div>
</template>

<style scoped>

</style>
