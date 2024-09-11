<script setup>
import {useCityStore} from '@/stores/city.js'
import {useAuthStore} from "@/stores/auth.js";
import QuestCard from "@/components/cards/QuestCard.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import UserCard from "@/components/cards/UserCard.vue";
import {fetchQuest, fetchQuests} from "@/assets/city-service.js";
import {useRouter} from "vue-router";

const cityStore = useCityStore()
const authStore = useAuthStore()
const router = useRouter();
authStore.init()

if (!authStore.isLoggedIn) {
  router.push('/');
}

function setup() {
  const q = fetchQuests()
      .then((d) => cityStore.setCities(d.data))
      .catch((e) => {
        console.error(e);
      });
}

setup();
</script>

<template>
  <main class="m-4 md:m-6 lg:m-8">
    <h2 class="text-2xl font-bold">Nieuwe Quests toevoegen</h2>
    <div class="text-gray-400">
      Koop hier jouw volgende quest, zodat het avontuur door kan gaan!
    </div>

    <div class="flex flex-col gap-4 mt-8" v-if="authStore.isLoggedIn && authStore.user">
      <UserCard/>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="cityStore.cities">
        <QuestCard to="shop" :city="city" v-for="city in cityStore.cities"/>
      </div>

      <div v-else-if="!cityStore.trips">
        Mogelijke trips worden geladen...
      </div>

      <RouterLink
          class="text-center outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
          type="button" to="/">
        Home
      </RouterLink>
    </div>
  </main>
</template>
