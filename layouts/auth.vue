<template>
  <v-app class="layout-auth primary div-nuxt-content" id="login">
    <v-main>
      <nuxt />
    </v-main>
    <!-- <v-footer class="div-nuxt-content">
      <div class="footer">BKAD IMS System @2021</div>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  methods: {},
  mounted() {
    if (process.client) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("theme_mode"));
    }
  },
};
</script>
<style lang="scss" scoped>
// #login {
//   min-height: 100%;
//   // background: url("~@/assets/image/bg.jpg");
//   background-size: contain;
//   box-shadow: inset 0 0 0 2000px rgba(10, 10, 10, 0.801);
//   overflow: hidden;
// }
#login {
  min-height: 100%;
  // background: url("~@/assets/mojokerto-bg.jpg");
  background-size: cover;
  // box-shadow: inset 0 0 0 2000px rgba(10, 10, 10, 0.500);
  overflow: hidden;
  background-position: center;
}
.layout-auth {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.footer {
  font-size: 0.625rem !important;
  letter-spacing: 0.1666666667em !important;
  line-height: 1rem;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
}
.theme--dark.div-nuxt-content {
  background-color: #111111 !important;
}
</style>
