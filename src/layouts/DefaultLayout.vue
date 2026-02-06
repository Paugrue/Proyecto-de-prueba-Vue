<!-- src/layouts/DefaultLayout.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = useTheme()

// Drawer
const drawer = ref(false)

// 🌙 Recuperar tema guardado en localStorage al cargar
onMounted(() => {
  const saved = localStorage.getItem("theme")
  if (saved === "dark" || saved === "light") {
    theme.global.name.value = saved
  }
})

// Estado del tema
const isDark = computed(() => theme.global.current.value.dark)

// Cambiar tema y guardarlo
function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  localStorage.setItem("theme", theme.global.name.value)
}

// Texto dinámico del botón
const themeBtnText = computed(() =>
  isDark.value ? 'Modo claro' : 'Modo oscuro'
)

// Icono dinámico
const themeBtnIcon = computed(() =>
  isDark.value ? 'mdi-weather-sunny' : 'mdi-weather-night'
)
</script>

<template>
  <v-app>

    <!-- MENÚ LATERAL SENCILLO -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav>
        <v-list-item
          title="Inicio"
          prepend-icon="mdi-home-outline"
          @click="router.push({ name: 'home' }); drawer = false"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- BARRA SUPERIOR -->
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title @click="router.push({ name: 'home' })" class="cursor-pointer">
        Tarjetas de usuarios
      </v-toolbar-title>

      <v-spacer />

      <!-- Botón Tema -->
      <v-btn variant="elevated" color="secondary" @click="toggleTheme">
        <v-icon start :icon="themeBtnIcon" />
        {{ themeBtnText }}
      </v-btn>
    </v-app-bar>

    <!-- CONTENIDO -->
    <v-main class="bg-background">
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer app class="bg-surface py-4">
      <v-container class="d-flex align-center justify-space-between">
        <span>&copy; {{ new Date().getFullYear() }} · Paula Grueso Pascual</span>
        <span class="text-medium-emphasis">Proyecto de prueba Vue + Vuetify</span>
      </v-container>
    </v-footer>

  </v-app>
</template>