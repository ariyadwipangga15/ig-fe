export const state = () => ({
  roles: [],
  editedRole: {
      id: null,
      name: '',
      urut: null,
  },
  count: 0,
})

export const getters = {
  getRoles(state) {
    return state.roles
  },
  getEditedRole(state) {
    return state.editedRole
  }
}

export const actions = {
  async loadRoles({ commit, dispatch }, filter) {
    const aFilter = filter ? '?filter=' + JSON.stringify(filter) : ''
    await this.$axios
      .$get('roles' + aFilter)
      .then((response) => {
        commit('SET_ROLES', response.data)
        commit('SET_COUNT', response.data.length)
      })
      .catch((error) => console.log(error))
  },
  async editRoleById({commit}, id) {
    await this.$axios.$get(`roles/${id}`)
    .then(response => {
      commit("SET_EDITED_ROLE", response.data)
    })
    .catch(error => {
      console.log("error role.findByID", error)
    })
  },
  async createOrUpdateRole({ commit, dispatch }, payload) {
    await this.$axios
      .$put(`roles/create-or-update`, payload)
      .then((response) => {
        dispatch("loadRoles")
      })
      .catch((err) => {
        console.log('Error', err)
      })
  },
  async deleteRole({ commit }, payload) {
    await this.$axios
      .$delete(`roles/${payload.id}`)
      .then(() => {
        commit('DELETE_ROLE', payload)
      })
      .catch((err) => {
        console.log('Error')
      })
  },
}

export const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_EDITED_ROLE(state, role) {
    state.editedRole = role
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  ADD_ROLE(state, payload) {
    state.roles.push(payload)
  },
  UPDATE_ROLE(state, payload) {
    let role = state.roles.find((u) => u.id == payload.id)
    if (payload.name) {
      role.name = payload.name
    }
    if (payload.urut) {
      role.urut = payload.urut
    }
  },
  DELETE_ROLE(state, payload) {
    const index = state.roles.findIndex((o) => o.id === payload.id)
    state.roles.splice(index, 1)
  },
}
