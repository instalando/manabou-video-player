export default {
  namespaced: true,
  state: {
    component: ''
  },
  getters: {
    //
  },
  mutations: {
    setComponent (state, payload) {
      state.component = payload
    }
  },
  actions: {
    setComponent ({ commit }, payload) {
      commit('setComponent', payload)
    }
  }
}
