<template>
  <v-container>
    <v-card>
      <v-card-title
        class="d-flex justify-center"
      >
        Minha Biblioteca
      </v-card-title>

      <v-card-title class="d-flex justify-end">
        <!-- <v-btn @click.stop="openSettings()">
          <v-icon> mdi-settings </v-icon>
        </v-btn> -->
      </v-card-title>
      <v-divider />
      <v-card-text>
        <filesystem />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import filesystem from '../components/FileSystem/FileSystem.vue'

export default {
  components: { filesystem }
}
</script>
