<template>
  <v-app
    id="app"
    style="background-color: #f0f2f5"
  >
    <v-main>
      <component :is="component" />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Library from './views/Library'
import VideoPlayer from './views/VideoPlayer'

export default {
  components: { Library, VideoPlayer },
  computed: {
    ...mapState('component', ['component'])
  },
  mounted () {
    this.setComponent('Library')
  },
  methods: {
    ...mapActions('component', ['setComponent'])
  }
}
</script>
