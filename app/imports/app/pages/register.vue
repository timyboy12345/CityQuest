<script setup>
const {register} = useDirectusAuth();
const user = useDirectusUser();

const error = ref()
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const submitting = ref(false);
const router = useRouter();

function submitRegister() {
  if (submitting.value) {
    return;
  }

  submitting.value = true;
  register({
    email: email.value, password: password.value, first_name: firstName.value, last_name: lastName.value
  })
      .then((r) => {
        error.value = null;
        console.log(r)
        router.push('/login');
        submitting.value = false;
      })
      .catch((e) => {
        error.value = e.data.errors[0].message
        submitting.value = false;
      });
}

</script>

<template>
  <div class="m-4 sm:w-96 sm:mx-auto mt-8">
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
          <div class="text-xs opacity-70">
            Met dit e-mail adres log je in en hierop ontvang je je aankopen.
          </div>
        </div>
        <div class="flex flex-col">
          <label for="password">Wachtwoord</label>
          <input id="password" v-model="password" name="password" type="password" class="rounded text-gray-800">
          <div class="text-xs opacity-70">
            Gebruik bij voorkeur een wachtwoord wat je nog nergens anders hebt gebruikt.
          </div>
        </div>
        <div class="flex flex-col">
          <label for="firstName">Voornaam</label>
          <input id="firstName" v-model="firstName" name="firstName" type="text" class="rounded text-gray-800">
        </div>
        <div class="flex flex-col">
          <label for="lastname">Achternaam</label>
          <input id="lastname" v-model="lastName" name="lastname" type="text" class="rounded text-gray-800">
          <div class="text-xs opacity-70">
            Voer hier ook eventuele tussenvoegsels zoals "van de" in.
          </div>
        </div>
      </div>

      <div
          v-if="error"
          class="text-zinc-100 border border-red-500 bg-opacity-10 bg-red-500 mt-4 text-sm rounded py-2 px-4">
        {{ error }}
      </div>

      <button
          type="submit"
          :disabled="submitting"
          :class="{'opacity-50': submitting}"
          class="float-right px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
        Account aanmaken
      </button>
    </form>

    <div v-else class="mt-8 flex flex-col">
      Je bent al ingelogd

      <RouterLink to="/" class="underline mt-4">Terug naar de homepagina</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>
