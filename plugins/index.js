import cookie from 'vue-cookies'

export const mapStatesToGetters = (states, getters = {}) => {
  Object.keys(states).forEach((key) => {
    getters[key] = (state) => state[key]
  })
  return getters
}

export const mapStatesToMutations = (states, mutations = {}) => {
  Object.keys(states).forEach((key) => {
    mutations[key] = (state, payload) => (state[key] = payload)
  })
  return mutations
}

export const cta = (cta, methods = {}) => {
  Object.keys(cta).forEach((method) => {
    methods[method] = async function (...params) {
      const ctx = {
        $loading: this.$nuxt.$loading,
        $state: this.$store.state,
        $commit: this.$store.commit,
        $getters: this.$store.getters,
        $dispatch: this.$store.dispatch,
      }

      if (ctx.$loading.loading) return
      ctx.$loading.start()
      try {
        await cta[method].call(this, ...params, ctx)
      } catch ({ response, message }) {
        const dialog = {
          title: 'Oops!',
          message,
          button: {
            primary: true,
            label: 'OK',
            handler: (close) => close(),
          },
        }
        if (response && response.data && response.data.message) {
          dialog.message = response.data.message
        }
        this.$dialog(dialog)
      }
      ctx.$loading.finish()
    }
  })
  return methods
}

window.onNuxtReady(({ $store, $config }) => {
  if (cookie.get($config.tokenKey)) {
    
  }
})
