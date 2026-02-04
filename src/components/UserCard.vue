<script setup>
defineProps({
  user: Object,
  temaOscuro: Boolean
})
</script>

<template>
  <v-card
    class="pa-4 mb-4"
    :color="temaOscuro ? 'deep-purple-lighten-4' : 'green-lighten-4'"
  >
    <h3>{{ user.name }}</h3>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Ciudad:</strong> {{ user.address.city }}</p>
  </v-card>
</template>
