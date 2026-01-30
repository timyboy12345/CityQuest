<script setup>
const {login} = useDirectusAuth();
const user = useDirectusUser();

const router = useRouter();
const route = useRoute();

function submitLogin() {
  if (submitting.value) {
    return;
  }

  submitting.value = true;
  login({email: email.value, password: password.value})
      .then(() => {
        error.value = null;
        console.log(route);
        router.push(route.query.next ?? '/');
      })
      .catch((e) => {
        console.error(e);
        error.value = e.data.errors[0].message;
      })
      .then(() => submitting.value = false);
}

const error = ref()
const submitting = ref(false)
const email = ref('')
const password = ref('')
</script>

<template>
  <div class="m-4 sm:w-96 sm:mx-auto">
    <RouterLink class="text-xs mb-2 block underline hover:no-underline opacity-80" to="/">
      Terug naar de homepagina
    </RouterLink>

    <h1 class="text-2xl font-bold">Inloggen</h1>
    <p class="opacity-60">Log hier in om toegang te krijgen tot al jouw avonturen en nieuwe avonturen aan te gaan.</p>

    <form v-if="!user" class="mt-8" @submit.prevent="submitLogin">
      <div class="grid gap-4">
        <!-- Deze veroorzaken hydration mismatches -->
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input id="email" v-model="email" name="email" type="email" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="password">Wachtwoord</label>
          <input id="password" v-model="password" name="password" type="password" class="rounded text-gray-800">
        </div>
      </div>

      <div
          v-if="error"
          class="text-zinc-100 border border-red-500 bg-opacity-10 bg-red-500 mt-4 text-sm rounded py-2 px-4">
        {{ error }}
      </div>

      <div class="flex gap-x-4 justify-end items-start mt-4">
        <button
            type="submit"
            :disabled="submitting"
            :class="{'opacity-50': submitting}"
            class="float-right px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Inloggen
        </button>
      </div>
    </form>

    <div v-else class="mt-8 w-full bg-indigo-500 bg-opacity-10 rounded border border-indigo-500 p-4 flex flex-col">
      Je bent al ingelogd
    </div>
  </div>
</template>

