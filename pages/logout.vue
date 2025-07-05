<template>
  <div />
</template>
<script>
export default {
  created() {
    this.$cookies.remove(this.$config.tokenKey)
    console.log('process.browser', process.browser)
    if (process.browser) {
      localStorage.clear()
      localStorage.setItem('theme_mode', this.$vuetify.theme.dark)
    }
    this.$router.push('/')
    this.$store.commit('shared/SET_NOTIFICATION', null, { root: true })
  },
}
</script>
