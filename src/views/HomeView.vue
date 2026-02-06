<!-- src/views/HomeView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import UserCard from '../components/UserCard.vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error("Error al obtener usuarios")
    users.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Cabecera -->
  <v-card class="pa-4 mb-4" color="blue-lighten-5">
    <v-card-title class="text-h5">Listado de usuarios</v-card-title>
  </v-card>

  <!-- Loading -->
  <v-card v-if="loading" class="pa-8 text-center" elevation="4">
    <v-progress-circular indeterminate color="primary" size="48" />
    <div class="mt-3">Cargando usuarios...</div>
  </v-card>

  <!-- Error -->
  <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">
    {{ error }}
  </v-alert>

  <!-- Lista -->
  <v-row v-else align="stretch">
    <v-col
      v-for="user in users"
      :key="user.id"
      cols="12"
      sm="6"
      md="4"
      class="d-flex"
    >
      <UserCard :user="user" class="w-100" />
    </v-col>
  </v-row>
</template>