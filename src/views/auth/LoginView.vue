<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useRoute, useRouter} from "vue-router";

const authStore = useAuthStore();
authStore.init();
const router = useRouter();
const route = useRoute();

function submitLogin() {
  if (submitting.value) {
    return;
  }

  submitting.value = true;
  authStore.login(email.value, password.value)
      .then(() => {
        error.value = null;
        authStore.init()
        console.log(route);
        router.push(route.query.next ?? '/');
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
</script>

<template>
  <div class="m-4 sm:w-96 sm:mx-auto mt-8">
    <h1 class="text-2xl font-bold">Inloggen</h1>
    <p class="opacity-60">Log hier in om toegang te krijgen tot al jouw avonturen en nieuwe avonturen aan te gaan.</p>

    <form v-if="!authStore.isLoggedIn" @submit.prevent="submitLogin" class="mt-8">
      <div class="grid gap-4">
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input v-model="email" id="email" name="email" type="email" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="password">Wachtwoord</label>
          <input v-model="password" id="password" name="password" type="password" class="rounded text-gray-800">
        </div>
      </div>

      <div class="flex gap-x-4 justify-end items-start mt-4">
        <div v-if="error" class="text-red-500 text-sm rounded outline outline-1 py-2 px-4">
          {{ error }}
        </div>
        <button type="submit"
                :disabled="submitting"
                :class="{'opacity-50': submitting}"
                class="float-right px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Inloggen
        </button>
      </div>
    </form>
    <div v-else class="mt-8 flex flex-col">
      Je bent al ingelogd
    </div>

    <RouterLink to="/" class="underline hover:no-underline mt-4 block">Terug naar de homepagina</RouterLink>
  </div>
</template>

<style scoped>

</style>
