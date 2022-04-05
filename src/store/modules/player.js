export default {
  namespaced: true,
  state: {
    currentTime: null,
    pause: false,
    path: {
      folder: '',
      file: ''
    }
  },
  mutations: {
    setPath (state, payload) {
      state.path = payload
    },
    setCurrentTime (state, payload) {
      state.currentTime = payload
    },
    setPause (state) {
      state.pause = true

      setTimeout(() => {
        state.pause = false
      }, 1000)
    }
  },
  actions: {
    setPath ({ commit }, payload) {
      commit('setPath', payload)
    },
    setCurrentTime ({ commit }, payload) {
      commit('setCurrentTime', payload)
    },
    updateTime ({ commit }, payload) {
      commit('updateTime', payload)
    },
    setPause ({ commit }) {
      commit('setPause')
    }
  }
}
