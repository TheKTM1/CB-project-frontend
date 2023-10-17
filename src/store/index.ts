import { createStore, Commit } from 'vuex'

interface State {
  authenticated: boolean;
  userRole: number;
}

export default createStore({
  state: {
    authenticated: false,
    userRole: 0,
  },
  getters: {
    getUserRole: (state) => state.userRole,
  },
  mutations: {
    SET_AUTH: (state: {authenticated: boolean}, auth: boolean) => state.authenticated = auth,
    SET_USER_ROLE: (state, role: number) => { state.userRole = role; },
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth),
    setUserRole: ({commit}: {commit: Commit}, role: number) => commit('SET_USER_ROLE', role),
    getUserRole: ({ state }: { state: State }) => state.userRole,
  },
  modules: {
  }
})
