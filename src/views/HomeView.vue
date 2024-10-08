<script setup>
import {useCityStore} from '@/stores/city'
import {useAuthStore} from "@/stores/auth.js";
import QuestCard from "@/components/cards/QuestCard.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import UserCard from "@/components/cards/UserCard.vue";
import {computed} from "vue";
import LoadingCard from "@/components/cards/LoadingCard.vue";

const cityStore = useCityStore()
const authStore = useAuthStore()
authStore.init()

const doneLoading = computed(() => authStore.trips && authStore.trips.length > 0);
const startebleTrips = computed(() => authStore.trips.filter((t) => ['available', 'playing'].includes(t.status)))
</script>

<template>
  <main class="m-4 md:m-6 lg:m-8">
    <h2 class="text-2xl font-bold">Welkom bij StoryWalks</h2>
    <div class="text-gray-400">Dit is waar het allemaal begint, start hier jouw speurtocht, of koop een nieuwe
      speurtocht.
    </div>

    <div class="flex flex-col gap-4 mt-8" v-if="authStore.isLoggedIn && authStore.user">
      <UserCard/>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="doneLoading">
        <QuestCard :city="trip.quest" v-for="trip in startebleTrips"/>
      </div>

      <div v-else-if="!authStore.trips">
        <LoadingCard :with-card="true"/>
      </div>

      <div v-else>
        Er konden geen trips gevonden worden, koop je eerste trip hieronder
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <RouterLink
            class="text-center outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
            type="button" to="/shop">
          Shop
        </RouterLink>

        <button
            class="outline outline-1 py-2 px-4 hover:bg-white hover:bg-opacity-20 transition duration-100 rounded"
            type="button" @click="authStore.logout()">
          Uitloggen
        </button>
      </div>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-4 mt-4 lg:mt-8">
      <GeneralCard>
        <template v-slot:title>Dit is StoryWalks</template>
        <template v-slot:default>
          <article class="prose prose-sm prose-invert">
            <p>StoryWalks is een nieuwe manier van steden ontdekken. Loop niet zomaar door een stad, maar los een
              mysterie
              op. Dit doe je door raadsels op te lossen, te puzzelen en waypoints te vinden. Aan het eind van de route
              kom
              je altijd op een gezellige plek in de binnenstad uit, waar je nog even kan naborrelen (mocht je dat
              willen).</p>
            <p class="italic">Het is ons opgevallen dat je nog niet bent ingelogd. Alleen met een account kan je de
              quests lopen, zo
              kunnen we je score bijhouden en kunnen we beter bijhouden waar mensen snel doorheen gaan en waar het wat
              langer duurt.</p>
          </article>
        </template>
      </GeneralCard>
      <GeneralCard>
        <template v-slot:title>Wat heb ik nodig?</template>
        <template v-slot:default>
          <article class="prose prose-sm prose-invert">
            <p>Je hebt niet veel nodig, alleen een StoryWalks-account en een telefoon met GPS en internetverbinding zijn
              voldoende om te beginnen. Je kan in je eentje spelen, maar gezelliger is natuurlijk om wat vrienden of
              familieleden uit te nodigen. Zo kan je de raadsels samen te lijf.</p>
            <p>Je kan StoryWalks spelen op elk moment, er zit geen tijdslimiet op en er zijn geen verplichtingen. Zit je
              ergens vast? Je kan altijd hints krijgen via het systeem, zo kan je de route dus altijd afmaken.</p>
          </article>
        </template>
      </GeneralCard>

      <div class="grid md:col-span-2 md:grid-cols-3 gap-4">
        <RouterLink to="/login"
                    class="outline outline-1 rounded py-2 px-4 hover:bg-white hover:bg-opacity-10 transition duration-100 text-center">
          Log hier in
        </RouterLink>
        <RouterLink to="/register"
                    class="outline outline-1 rounded py-2 px-4 hover:bg-white hover:bg-opacity-10 transition duration-100 text-center">
          Maak hier een account aan
        </RouterLink>
        <RouterLink to="/shop"
                    class="outline outline-1 rounded py-2 px-4 hover:bg-white hover:bg-opacity-10 transition duration-100 text-center">
          Shop
        </RouterLink>
      </div>
    </div>
  </main>
</template>
