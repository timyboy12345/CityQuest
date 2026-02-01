<template>
  <div class="m-4 md:m-6 lg:m-8">
    <h1 class="font-bold text-4xl">404</h1>
    <p class="text-gray-400">Deze pagina is niet gevonden.</p>

    <p class="mt-4">
      Jij lijkt wel héél erg hard op zoek, je hebt iets gezocht dat niet bestaat!
    </p>
    <NuxtLink class="mt-4 underline hover:no-underline inline-block" to="/">
      Go Back to Home
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>
