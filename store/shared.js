// export default {
export const state = () => ({
  loading: false,
  success: false,
  error: false,
  notifications: null,
})
export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_SUCCESS(state, payload) {
    state.success = payload
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_NOTIFICATION(state, payload) {
    state.notifications = payload
  },
  CLEAR_ERROR(state) {
    state.error = null
  },
}
export const actions = {
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  },
}
export const getters = {
  loading(state) {
    return state.loading
  },
  success(state) {
    return state.success
  },
  error(state) {
    return state.error
  },
  notifications(state) {
    return state.notifications
  },
}
// };
