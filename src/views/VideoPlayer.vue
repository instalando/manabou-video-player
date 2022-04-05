<template id="app">
  <v-app id="container">
    <video-player />
    <Subtitle />
  </v-app>
</template>

<script>
import VideoPlayer from '../components/Player/Player.vue'
import Subtitle from '../components/Player/Subtitle'

export default {
  name: 'App',
  components: { VideoPlayer, Subtitle }
}
</script>

<style scoped>
.app::-webkit-scrollbar {
  display: none;
}
</style>
