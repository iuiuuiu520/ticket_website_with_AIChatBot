import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userInfo: {},
    ticketInfo: {}
  },
  getters: {
  },
  mutations: {
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state, value) {
      state.userInfo = {}
    },
    changeTicketInfo(state, value){
      state.ticketInfo = {
        ...state.ticketInfo,
        ...value
      }
    },
    clearTicketInfo(state, value) {
      state.ticketInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:['userInfo','ticketInfo']
  })]
})
