import Vue from 'vue'
import Vuex from 'vuex'

import library from './modules/library'
import player from './modules/player'
import filesystem from './modules/filesystem'
import component from './modules/component'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    library,
    player,
    filesystem,
    component
  }
})
