<script setup>
const {updateItem} = useDirectusItems();
const saving = ref(false);
const route = useRoute();
const router = useRouter();

const {trip} = defineProps(['quest', 'trip'])

function finishQuest() {
  updateItem({
    collection: 'trip',
    id: trip.id,
    item: {
      status: 'finished'
    }
  })
      .then(() => router.push('/'))
      .catch((e) => console.error(e));
}
</script>

<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="mb-4 font-bold text-2xl">Gefinisht: {{ quest.name }}</h1>

    <p>Je bent aan het einde van deze quest aangekomen. Druk op de knop hieronder om je tocht af te ronden. Je krijgt
      dan binnen enkele minuten een mail in je inbox die je wat statistieken geeft van jullie tocht.</p>

    <button
        type="button"
        class="block w-full text-center mt-8 py-2 px-4 rounded bg-indigo-500 transition duration-100 hover:bg-indigo-600"
        @click="finishQuest()">
      Rond af
    </button>
  </div>
</template>

