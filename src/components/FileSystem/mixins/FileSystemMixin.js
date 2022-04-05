import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('filesystem', ['path']),
    ...mapGetters('filesystem', ['getPathString'])
  },
  methods: {
    ...mapActions('filesystem', [
      'setPath',
      'incrementDir',
      'backDir'
    ]),
    ...mapActions('player', {
      setVideoPath: 'setPath'
    }),
    ...mapActions('component', ['setComponent']),
    readdir (path) {
      return this.$api.get(`/fetch_directory?path=${path}`)
        .then(res => this.files = res.data)
    },
    open (item) {
      const isVideoFile = item.search('.mp4') !== -1

      return isVideoFile
        ? this.openVideo(item)
        : this.incrementDir(item)
    },
    openVideo (item) {
      this.setVideoPath({
        folder: this.getPathString,
        file: item
      })
      this.setComponent('VideoPlayer')
    }
  }
}
