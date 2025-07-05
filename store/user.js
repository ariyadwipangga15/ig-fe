export const state = () => ({
  users: [],
  currentUser: {},
  count: 0,
})

export const getters = {
  getUsers(state) {
    return state.users
  },
  getEditedUser(state) {
    return state.editedUser
  },
  getCountUser(state) {
    return state.count
  },
}

export const actions = {
  async loadUsers({ commit, dispatch }, filter) {
    const users = await this.$axios.$get('auth/users', { params: filter })
    commit('SET_USERS', users.data.items)
  },
  async saveUser({ commit, dispatch }, payload) {
    commit('shared/SET_SUCCESS', false, { root: true })
    commit('shared/SET_ERROR', null, { root: true })
    if (!payload.id) {
      await this.$axios
        .$post('auth/users', payload)
        .then((data) => {
          commit('shared/SET_SUCCESS', true, { root: true })
          commit('ADD_USER', data)
        })
        .catch((err) => {
          commit('shared/SET_SUCCESS', false, { root: true })
          commit('shared/SET_ERROR', err, { root: true })
        })
    } else {
      await this.$axios
        .$put(`auth/users/${payload.id}`, payload)
        .then(() => {
          commit('shared/SET_SUCCESS', true, { root: true })
          commit('UPDATE_USER', payload)
        })
        .catch((err) => {
          commit('shared/SET_SUCCESS', false, { root: true })
          commit('shared/SET_ERROR', err, { root: true })
        })
    }
  },
  async putPasswordUser({ commit, dispatch }, payload) {
    await this.$axios
      .$put(`auth/users/password/${payload.id}`, payload.data)
      .then((response) => {
        commit('shared/SET_SUCCESS', true, { root: true })
      })
      .catch((err) => {
        console.log('Error', err)
        commit('shared/SET_SUCCESS', false, { root: true })
      })
  },
  async deleteUser({ commit }, payload) {
    commit('shared/SET_SUCCESS', false, { root: true })
    await this.$axios
      .$delete(`auth/users/${payload.id}`)
      .then(() => {
        commit('DELETE_USER', payload)
        commit('shared/SET_SUCCESS', true, { root: true })
      })
      .catch((err) => {
        commit('shared/SET_SUCCESS', false, { root: true })
        commit('shared/SET_ERROR', err, { root: true })
      })
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  ADD_USER(state, payload) {
    state.users.push(payload)
  },
  UPDATE_USER(state, payload) {
    let user = state.users.find((u) => u.id == payload.id)
    if (payload.firstName) {
      user.firstName = payload.firstName
    }
    if (payload.lastName) {
      user.lastName = payload.lastName
    }
    if (typeof payload.email != undefined && payload.email !== null) {
      user.email = payload.email
    }
  },
  UPDATE_PASSWORD_USER(state, payload) {
    const index = state.users.findIndex((o) => o.id === payload.id)
    state.users.splice(index, 1)
    if (payload.newPassword) {
      user.newPassword = payload.newPassword
    }
    if (payload.oldPassword) {
      user.oldPassword = payload.oldPassword
    }
  },
  DELETE_USER(state, payload) {
    const index = state.users.findIndex((o) => o.id === payload.id)
    state.users.splice(index, 1)
  },
}
