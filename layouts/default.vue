<template>
  <v-app class="layout-auth primary div-nuxt-content">
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {},
  mounted() {
    if (process.client) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('theme_mode'))
    }
  },
}
</script>
<style lang="scss" scoped>
.layout-auth {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
.theme--dark.div-nuxt-content {
  background-color: #111111 !important;
}
</style>
