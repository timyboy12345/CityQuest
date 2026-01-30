<script setup>
const route = useRoute();

const {getItemById} = useDirectusItems();

// TODO: Add logged in middleware

const {
  data: trip,
  pending,
  error,
  refresh,
} = await useAsyncData(`trip_${route.query.id}`, () =>
    getItemById({
      id: route.query.id,
      collection: 'trip',
      params: {},
    })
);
</script>

<template>
  <div class="flex flex-col sm:items-center h-screen">
    <div v-if="trip && Object.keys(trip).length === 0"
         class="bg-gray-700 rounded p-4 text-gray-200 sm:w-96 m-4 md:m-6 lg:m-8">
      <h1 class="font-bold">Aankoop kon niet worden geladen</h1>
      <p class="opacity-80 mb-4">Er ging iets fout bij het laden van je aankoop, check of de URL weg goed is.</p>
      <p class="opacity-80">Mocht dat niet het probleem zijn, check dan of je aankoop wel op de
        <RouterLink to="/" class="underline hover:no-underline">homepagina</RouterLink>
        te zien is.
      </p>
    </div>

    <div class="sm:w-96 m-4 md:m-6 lg:m-8" v-else-if="trip">
      <h2 class="text-2xl font-bold">{{ trip.quest.name }}</h2>
      <div class="text-gray-400">
        <span v-if="trip.mollie_payment_id">
          {{ trip.mollie_payment_status === 'paid' ? 'Aankoop voltooid' : 'Aankoop nog niet voltooid' }}
        </span>
        <span v-else>
          Trip toegevoegd aan je account
        </span>
      </div>

      <div class="grid gap-4 mt-4">
        <img v-if="trip.quest.image"
             :src="`https://data.arendz.nl/assets/${trip.quest.image}`"
             alt="Image of this city"
             class="w-full h-60 object-cover object-center rounded">

        <div v-if="trip.mollie_payment_id">
          <div v-if="trip.mollie_payment_status === 'paid'" class="bg-white rounded p-4 text-gray-800">
            Je betaling is gelukt. Je kan nu naar de
            <RouterLink to="/" class="underline hover:no-underline">homepagina</RouterLink>
            om meteen te beginnen, of je kan wachten tot een later moment. De keuze is aan jou!
          </div>

          <div class="bg-white rounded p-4 text-gray-800" v-else>
            Je betaling is nog niet helemaal doorgekomen, check of het geld wel is afgeschreven. Zo ja, dan duurt het
            misschien enkele minuten tot de betalingsverwerker dit aan ons heeft doorgegeven.
          </div>
        </div>

        <div v-else>
          <GeneralCard>
            Deze trip was gratis, je kan hem meteen spelen. Ga naar de
            <RouterLink to="/" class="underline hover:no-underline">homepagina</RouterLink>
            om te beginnen met spelen, of begin later.
          </GeneralCard>
        </div>

        <RouterLink
            to="/"
            class="text-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 transition duration-100 rounded">
          Naar de homepagina
        </RouterLink>
      </div>
    </div>

    <div v-else class="bg-white rounded p-4 text-gray-800 sm:w-96 m-4 md:m-6 lg:m-8">
      Aankoop wordt geladen
    </div>
  </div>
</template>
