<script setup>
import {useRoute, useRouter} from "vue-router";
import MarkdownIt from "markdown-it";

const {getItemById} = useDirectusItems();
const user = useDirectusUser();
const route = useRoute();
const router = useRouter();
const markdown = new MarkdownIt();

const handlingPayment = ref(false);

const {
  data: quest,
  pending,
  error,
  refresh,
} = await useAsyncData(`shop_quest_${route.params.slug}`, () =>
    getItemById({
      id: route.params.slug,
      collection: 'quest',
      params: {},
    })
);

async function buy() {
  handlingPayment.value = true;

  const response = await fetch("https://data.arendz.nl/flows/trigger/bda4a15a-e7d5-4745-b5e3-eb11884fd380", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "amount": Number.isInteger(quest.value.price) ? `${quest.value.price}.00` : quest.value.price,
      "city": quest.value.id,
      "redirect": "https://app.storywalks.nl/shop/return",
      "user": user.value.id,
    }),
  })
      .then((r) => r.json())
      .then(value => {
        console.log(value)
        handlingPayment.value = false;

        if (value.next) {
          window.location.href = value.next;
        }
      })
      .catch((e) => {
        console.error(e)
        handlingPayment.value = false;
      });
}

const price = computed(() => quest.value ? (Math.round(quest.value.price * 100) / 100).toFixed(2) : "???")

useHead({
  title: quest.value ? `${quest.value.name} - Nieuwe Quests Kopen` : "Nieuwe Quests Kopen",
})
</script>

<template>
  <div class="flex flex-col">
    <div class="m-4 sm:mx-auto sm:w-96">
      <RouterLink class="text-xs mb-2 block underline hover:no-underline opacity-80" to="/shop">
        Terug naar het overzicht
      </RouterLink>

      <div v-if="quest">
        <h2 class="text-2xl font-bold">{{ quest.name }}</h2>

        <div class="grid gap-4 mt-4">
          <img
              v-if="quest.image"
              :src="`https://data.arendz.nl/assets/${quest.image}`"
              alt="Image of this city"
              class="w-full h-60 object-cover object-center rounded">
          <div
              v-if="quest.content" class="bg-zinc-800 rounded p-4 text-gray-200 prose prose-invert prose-sm"
              v-html="markdown.render(quest.content.substring(0, 300) + `... [lees meer](https://storywalks.nl/steden/${quest.id})`)"/>

          <div class="py-2 px-4 rounded bg-zinc-800">
            Bekijk meer informatie, zoals de startlocatie, het aantal tussenstops en meer op
            storywalks.nl

            <a
                class="block bg-indigo-500 py-2 px-4 mt-4 mb-2 transition duration-100 hover:bg-indigo-600 text-zinc-100 rounded text-center"
                :href="`https://storywalks.nl/steden/${quest.id}`">
              Bekijk meer
            </a>
          </div>

          <GeneralCard v-if="user">
            <div class="flex flex-col">
              <div class="text-sm mb-2 opacity-80">
                Door deze quest te kopen ga je akkoord met de voorwaarden. Hij wordt meteen toegevoegd aan je speelbare
                challenges na de betaling.
              </div>
              <button
                  type="button"
                  class="block text-white py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 transition duration-100"
                  :class="{'opacity-50': handlingPayment}"
                  :disabled="handlingPayment"
                  @click="buy()"
              >
                {{ quest.price === 0 ? 'Gratis Claimen' : `Kopen voor &euro;${price}` }}
              </button>

              <div class="mt-2">
                Na aankoop van deze quest kan je hem meteen spelen
              </div>
            </div>
          </GeneralCard>

          <GeneralCard v-else>
            Je bent niet ingelogd, dus je kan geen trips kopen.

            <RouterLink :to="`/auth/login?next=/shop/${route.params.id}`" class="underline hover:no-underline">
              Log hier in
            </RouterLink>
          </GeneralCard>
        </div>
      </div>

      <div v-else class="mt-4">
        <LoadingCard :with-card="true" :with-header="true"/>
      </div>
    </div>
  </div>
</template>
