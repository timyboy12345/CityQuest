<template>
  <div>
    <div v-if="user">
      {{ user.first_name }}
    </div>

    <div v-else>
      Je bent niet ingelogd
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useDirectusUser();
const route = useRoute();

const {getItemById} = useDirectusItems();

const {
  data: quest,
  pending: questPending,
  error: questError,
  refresh: questRefresh,
} = await useAsyncData(`quest_${route.params.slug}`, () =>
    getItemById({
      id: route.params.slug,
      collection: 'quest',
      params: {
        fields: ['*', 'steps.*', 'steps.item.*'],
      },
    })
);

</script>
