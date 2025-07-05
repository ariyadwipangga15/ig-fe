import { mapStatesToGetters, mapStatesToMutations } from '@/plugins'

const states = () => {
  return {
    user: null,
    token: null,
    loggedIn: null,
    menus: [],
  }
}

export const state = () => states()

export const getters = {
  ...mapStatesToGetters(states()),
  getLoginStatus: (state) => {
    return Boolean(state.user)
  },
}

export const mutations = {
  ...mapStatesToMutations(states()),
  SET_MENU_USER(state, payload) {
    state.userMenu = payload
  },
}

export const actions = {
  async initUserData({ commit }, app) {
    const data = await app.$axios.$get('/user')
    commit('setData', data)
    return data
  },
  async login({ commit }, payload) {
    try {
      window.$nuxt.$root.$loading.start()
      const data = await this.$axios.$post('/login', payload)
      // console.log('data',data.token)
      this.$cookies.set(this.$config.tokenKey, data.token)


      // set localy
      commit('user', data.user)
      commit('token', data.token)
      if(data.user.role.id=="HA02"){ 
        this.$router.push('/ig')
      }else{
        this.$router.push('/dashboard')
      }
     
    } catch (err) {
      console.log('error.login', err)
      throw err
    } finally {
      console.log('Finally Login')
      window.$nuxt.$root.$loading.finish()
    }
  },
  logout() {
    if (window.confirm('Apakah Anda yakin akan logout?')) {
      this.$router.push('/logout')
    }
  },
  async loadAuthMenu({ commit }, roleId) {
    const { data } = await this.$axios.$get(`/menu-user`, {
      params : {
        idRole : roleId,
        app : 1,
        posisiSubMenu: '1'
      }
    })
    commit('menus', data)
  },
  async setMenuUser({ commit }, data) {
    commit('SET_MENU_USER', data)
  },
}
