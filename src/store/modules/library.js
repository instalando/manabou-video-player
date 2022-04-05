export default {
  namespaced: true,
  state: {
    root_path: ''
  },
  mutations: {
    setPath (state, payload) {
      state.path = payload
    }
  },
  actions: {
    setPath ({ commit }, payload) {
      commit('setPath', payload)
    }
  }
}
