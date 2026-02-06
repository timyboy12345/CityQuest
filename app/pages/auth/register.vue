<script setup>
const user = useDirectusUser();
const url = useDirectusUrl()
const router = useRouter();

const error = ref()
const submitting = ref(false)
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

async function submitRegister() {
  if (submitting.value) {
    return;
  }

  submitting.value = true;

  try {
    const response = await fetch(url + '/users/register',
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            first_name: firstName.value,
            last_name: lastName.value,
          }),
          method: 'POST'
        })


    if (!response.ok) {
      const result = await response.json();
      console.log(result);

      error.value = result.errors[0].message
      submitting.value = false;
      return
    }

    error.value = null;
    router.push('/auth/login?registered=true');
  } catch (error) {
    console.log(error)
    error.value = error.errors[0]
  }
}
</script>

<template>
  <div class="m-4 sm:w-96 sm:mx-auto">
    <RouterLink class="text-xs mb-2 block underline hover:no-underline opacity-80" to="/">
      Terug naar de homepagina
    </RouterLink>

    <h1 class="text-2xl font-bold">Registreren</h1>
    <p class="opacity-60">Maak hier je account aan en krijg toegang tot alle avonturen.</p>
    <form v-if="!user" class="mt-8" @submit.prevent="submitRegister">
      <div class="grid gap-4">
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input id="email" v-model="email" name="email" type="text" class="rounded text-gray-800">
          <div class="text-xs opacity-70">Met dit e-mail adres log je in en hierop ontvang je je aankopen.</div>
        </div>
        <div class="flex flex-col">
          <label for="password">Wachtwoord</label>
          <input id="password" v-model="password" name="password" type="password" class="rounded text-gray-800">
          <div class="text-xs opacity-70">Gebruik bij voorkeur een wachtwoord wat je nog nergens anders hebt gebruikt.
          </div>
        </div>
        <div class="flex flex-col">
          <label for="firstName">Voornaam</label>
          <input id="firstName" v-model="firstName" name="firstName" type="text" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="lastname">Achternaam</label>
          <input id="lastname" v-model="lastName" name="lastname" type="text" class="rounded text-gray-800">
          <div class="text-xs opacity-70">Voer hier ook eventuele tussenvoegsels zoals "van de" in.</div>
        </div>
      </div>

      <div
          v-if="error"
          class="text-zinc-100 border border-red-500 bg-opacity-10 bg-red-500 mt-4 text-sm rounded py-2 px-4">
        {{ error }}
      </div>

      <div class="flex gap-x-4 justify-end items-center mt-4">
        <button
            type="submit"
            :disabled="submitting"
            :class="{'opacity-50': submitting}"
            class="cursor-pointer float-right px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Account aanmaken
        </button>
      </div>
    </form>
    <div v-else class="mt-8 flex flex-col">
      Je bent al ingelogd

      <RouterLink to="/" class="underline mt-4">Terug naar de homepagina</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>
