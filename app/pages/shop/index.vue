<script setup>
const router = useRouter();
const {getItems} = useDirectusItems();

const {
  data: buyableQuests,
  pending,
  error,
  refresh,
} = await useAsyncData("buyable_quests", () =>
    getItems({
      collection: 'quest',
      params: {},
    })
);
</script>

<template>
  <main class="m-4 md:m-6 lg:m-8">
    <RouterLink class="text-xs mb-2 block underline hover:no-underline opacity-80" to="/">
      Terug naar de homepagina
    </RouterLink>

    <h2 class="text-2xl font-bold">Nieuwe Quests kopen</h2>
    <div class="text-zinc-400">
      Koop hier jouw volgende quest, zodat het avontuur door kan gaan!
    </div>

    <div class="flex flex-col gap-4 mt-4">
      <div v-if="!pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuestCard v-for="quest in buyableQuests" :key="quest.id" :show-price="true" to="shop" :quest="quest"/>
      </div>

      <LoadingCard v-else :with-card="true" :with-header="true"/>
    </div>
  </main>
</template>
