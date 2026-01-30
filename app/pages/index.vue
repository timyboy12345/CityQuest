<template>
  <main class="m-4 md:m-6 lg:m-8">
    <h2 class="text-2xl font-bold mt-8">Welkom bij StoryWalks</h2>
    <div class="text-zinc-400">
      Dit is waar het allemaal begint, start hier jouw speurtocht, of koop een nieuwe speurtocht.
    </div>

    <div v-if="user" class="flex flex-col gap-4 mt-8">
      <div v-if="!pending && (trips ?? []).length > 0" class="">
        <h2 class="text-xl font-bold">Begin jouw avontuur!</h2>
        <p class="text-sm text-zinc-400">Deze quests staan in jouw account.</p>
      </div>

      <div v-else class="opacity-60">
        Je hebt nog geen quests in je account, koop je eerste quest in de shop hieronder.
      </div>

      <div v-if="!pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuestCard v-for="trip in trips" :key="trip.id" :quest="trip.quest"/>
      </div>

      <LoadingCard v-else-if="pending" :with-card="true"/>

      <div v-else>
        Er konden geen trips gevonden worden, koop je eerste trip hieronder
      </div>

      <UserCard/>

      <div class="grid md:grid-cols-2 gap-4">
        <RouterLink
            class="text-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded"
            type="button" to="/shop">
          Shop
        </RouterLink>

        <button
            class="text-center cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded"
            type="button" @click="logout">
          Uitloggen
        </button>
      </div>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-4 mt-4 lg:mt-8">
      <GeneralCard>
        <template #title>Dit is StoryWalks</template>
        <template #default>
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
        <template #title>Wat heb ik nodig?</template>
        <template #default>
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
        <RouterLink
            to="/auth/login"
            class="text-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Log hier in
        </RouterLink>
        <RouterLink
            to="/auth/register"
            class="text-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Maak hier een account aan
        </RouterLink>
        <RouterLink
            to="/shop"
            class="text-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Shop
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LoadingCard from "~/components/LoadingCard.vue";
import UserCard from "~/components/UserCard.vue";
import GeneralCard from "~/components/GeneralCard.vue";

const {logout} = useDirectusAuth();
const user = useDirectusUser();

const {getItems} = useDirectusItems();
const {
  data: trips,
  pending,
  error,
  refresh,
} = await useAsyncData("available_trips", () =>
    getItems({
      collection: 'trip',
      params: {
        filter: {'status': 'available'},
        fields: ['*', 'quest.*']
      },
    })
);
</script>
