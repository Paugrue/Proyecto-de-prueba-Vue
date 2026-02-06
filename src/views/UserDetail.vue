<!-- src/views/UserDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}`)
    if (!res.ok) throw new Error('No se pudo cargar el usuario')
    user.value = await res.json()
  } catch (e) {
    error.value = (e instanceof Error) ? e.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-card class="pa-4 mb-4" color="blue-lighten-5">
    <v-card-title class="text-h5">Detalle de usuario</v-card-title>
  </v-card>

  <v-card v-if="loading" class="pa-8 text-center" elevation="4">
    <v-progress-circular indeterminate color="primary" size="48" />
    <div class="mt-3">Cargando usuario...</div>
  </v-card>

  <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">
    {{ error }}
  </v-alert>

  <v-card v-else class="pa-6" elevation="6" rounded="xl">
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h6 mb-3">{{ user.name }}</h3>
        <p><strong>Usuario:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Teléfono:</strong> {{ user.phone }}</p>
        <p><strong>Web:</strong> {{ user.website }}</p>
      </v-col>
      <v-col cols="12" md="6">
        <p><strong>Compañía:</strong> {{ user.company?.name }}</p>
        <p><strong>Dirección:</strong>
          {{ user.address?.street }}, {{ user.address?.suite }},
          {{ user.address?.city }} ({{ user.address?.zipcode }})
        </p>
      </v-col>
    </v-row>

    <div class="mt-6 d-flex gap-3">
      <v-btn color="primary" variant="tonal" prepend-icon="mdi-arrow-left" @click="router.back()">
        Volver
      </v-btn>
      <!-- Enlace directo al endpoint que pediste en el mensaje -->
      <v-btn
        :href="`https://jsonplaceholder.typicode.com/users/${user.id}`"
        target="_blank"
        rel="noopener"
        variant="text"
        append-icon="mdi-open-in-new"
      >
        Ver JSON (API)
      </v-btn>
    </div>
  </v-card>
</template>