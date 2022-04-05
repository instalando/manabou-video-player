import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    currentTime_: 0,
    video: false,
    loading: false
  }),
  computed: {
    ...mapState('player', ['path', 'pause']),
    currentTime: {
      get: ({ currentTime_ }) => currentTime_,
      set (time) {
        this.$refs.video.currentTime = time
      }
    }
  },
  watch: {
    currentTime () {
      this.setCurrentTime(this.currentTime)
    },
    pause (val) {
      if (val) this.$refs.video.pause()
    }
  },
  methods: {
    ...mapActions('player', ['setCurrentTime'])
  }
}
