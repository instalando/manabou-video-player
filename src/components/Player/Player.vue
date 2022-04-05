<template>
  <div id="container">
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
    <v-btn
      fab
      small
      elevation="1"
      style="position: absolute; top: 0px left: 0px; z-index: 100000"
      class="ml-3 mt-3"
      @click.stop="close()"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <video
      id="video"
      ref="video"
      controls
      controlsList="nodownload noremoteplayback"
      preload="metadata"
      class="video"
      @timeupdate="currentTime_ = $event.target.currentTime"
    >
      <source :src="`http://localhost:3000/video?folder=${path.folder}&filename=${path.file}`">
    </video>
  </div>
</template>

<script>
import VideoControlsMixin from './mixins/VideoControlsMixin'

export default {
  mixins: [VideoControlsMixin]
}
</script>

<style scoped lang="css" src="./css/player.css" />
