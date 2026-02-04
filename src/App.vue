<script setup>
import { ref, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([])
const temaOscuro = ref(false)

function cambiarTema() {
  temaOscuro.value = !temaOscuro.value
}

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  users.value = await res.json()
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>

        <v-card class="pa-4 mb-4" color="blue-lighten-5">
          <v-card-title class="text-h5">
            Tarjetas de usuarios
          </v-card-title>

          <v-card-text>
            <v-btn color="primary" @click="cambiarTema">
              Cambiar tema
            </v-btn>
          </v-card-text>
        </v-card>

        <div v-if="users.length === 0">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <div v-else>
          <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
            :temaOscuro="temaOscuro"
          />
        </div>

      </v-container>
    </v-main>
  </v-app>
</template>
