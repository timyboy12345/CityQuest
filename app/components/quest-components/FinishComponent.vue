<script setup>
const {updateItem} = useDirectusItems();
const saving = ref(false);
const route = useRoute();
const router = useRouter();

const {trip} = defineProps(['quest', 'trip'])

const totalTime = computed(() => {
  const diffMs = Date.now() - new Date(trip.date_started).getTime()

  const totalMinutes = Math.round(Math.abs(diffMs) / (1000 * 60))

  const years = Math.floor(totalMinutes / (60 * 24 * 365))
  const months = Math.floor((totalMinutes % (60 * 24 * 365)) / (60 * 24 * 30))
  const days = Math.floor((totalMinutes % (60 * 24 * 30)) / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  const parts = []
  if (years) parts.push(`${years} jaar`)
  else if (months) parts.push(`${months} maand${months > 1 ? 'en' : ''}`)
  else if (days) parts.push(`${days} dag${days > 1 ? 'en' : ''}`)
  else if (hours) parts.push(`${hours} ${hours > 1 ? 'uren' : 'uur'}`)
  if (minutes) parts.push(`${minutes} ${minutes > 1 ? 'minuten' : 'minuut'}`)

  if (!parts.length) return 'zojuist'

  return parts.join(' en ')
})

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

    <p class="mb-4">Je bent aan het einde van deze quest aangekomen. Druk op de knop hieronder om je tocht af te ronden.
      Je krijgt
      dan binnen enkele minuten een mail in je inbox die je wat statistieken geeft van jullie tocht.</p>

    <p v-if="trip.date_started">
      Je hebt er {{ totalTime }} over gedaan.
    </p>

    <button
        type="button"
        class="cursor-pointer block w-full text-center mt-8 py-2 px-4 rounded bg-indigo-500 transition duration-100 hover:bg-indigo-600"
        @click="finishQuest()">
      Rond af
    </button>
  </div>
</template>

