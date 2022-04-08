import { mapActions } from 'vuex'

export default {
  data: () => ({
    dictWord: []
  }),
  methods: {
    ...mapActions('player', ['setPause']),
    fetchWord (word) {
      this.setPause(true)
      this.$api.get(`/search_word?word=${word}`).then(res => {
        this.dictWord = res.data
      })
    }
  }
}