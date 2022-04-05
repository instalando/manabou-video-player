export default {
  namespaced: true,
  state: {
    path: ['//']
  },
  getters: {
    getPathString (state) {
      return state.path.reduce((acc, curr, index) => {
        return acc += curr + (index === state.path.length - 1
          ? ''
          : '/'
        )
      })
    }
  },
  mutations: {
    setPath (state, payload) {
      state.path = payload
    },
    incrementDir (state, payload) {
      state.path.push(payload)
    },
    backDir (state) {
      state.path.pop()
    }
  },
  actions: {
    setPath ({ commit }, payload) {
      commit('setPath', payload)
    },
    incrementDir ({ commit }, payload) {
      commit('incrementDir', payload)
    },
    backDir ({ commit }) {
      commit('backDir')
    }
  }
}
