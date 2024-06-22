import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userInfo: {},
    isCollapsed:false,
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
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:['isCollapsed','userInfo']
  })]
})
