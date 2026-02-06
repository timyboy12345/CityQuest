<template>
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
</template>
<script setup lang="ts">
import LoadingCard from "~/components/LoadingCard.vue";

const {getItems} = useDirectusItems();
const {
  data: trips,
  pending,
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
