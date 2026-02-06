<!-- src/components/UserCard.vue -->
<script setup>
const { user } = defineProps({
  user: { type: Object, required: true }
})

function initials(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <v-card
    class="pa-4 d-flex flex-column h-100"
    elevation="6"
    rounded="xl"
    color="surface"
  >
    <!-- Cabecera: avatar + nombre -->
    <div class="d-flex align-start mb-2">
      <v-avatar color="primary" size="48" class="me-4">
        <span class="text-on-primary font-weight-medium">
          {{ initials(user.name) }}
        </span>
      </v-avatar>

      <div class="flex-grow-1">
        <h3
          class="text-h6 mb-1"
          style="white-space: normal; overflow: visible; text-overflow: clip; word-break: break-word;"
        >
          {{ user.name }}
        </h3>
        <div class="text-medium-emphasis" style="white-space: normal; word-break: break-word;">
          {{ user.username }}
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div>
      <div class="d-flex align-center" style="white-space: normal; word-break: break-word;">
        <v-icon icon="mdi-email-outline" class="me-2" />
        <span>{{ user.email }}</span>
      </div>

      <div class="d-flex align-center mt-1" style="white-space: normal; word-break: break-word;">
        <v-icon icon="mdi-map-marker-outline" class="me-2" />
        <span>{{ user.address.city }}</span>
      </div>
    </div>

    <!-- Acciones al fondo de la tarjeta -->
    <div class="mt-auto d-flex justify-end pt-4">
      <v-btn
        :to="{ name: 'user', params: { id: user.id } }"
        color="primary"
        variant="tonal"
        append-icon="mdi-arrow-right"
      >
        Ver detalles
      </v-btn>
    </div>
  </v-card>
</template>