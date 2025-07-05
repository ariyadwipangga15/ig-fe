const { NODE_ENV, HOST, PORT, API_HOST, REPORT_HOST, DOMAIN, TOKEN_KEY, BASE, BASE_BE} = process.env

import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - APP IG',
    title: 'APP IG',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#25D366' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/default.scss',
  "vue-touch-keyboard/dist/vue-touch-keyboard.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ssr', ssr: true },
    { src: '~/plugins/filters', ssr: false },
    { src: '~/plugins/vidle.js' },
    '@/plugins/service',
    '@/plugins/axios-accessor',
    '@/plugins/vuexPersistedState.client',
    '@/plugins/vuetify-money',
    '@/plugins/vue-keyboard',
    { src : '~/plugins/vue-apexcharts.js', ssr : false },
    { src : '~/plugins/highcharts.js', ssr : false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  env:{},
  axios: {
    proxy: true,
    prefix: `${BASE_BE}`
  },
  proxy: {
    [`${BASE_BE}api/`]: {
      target: API_HOST,
      pathRewrite: { [`^${BASE_BE}api/`]: 'api/v1/' },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          background: '#5e5e69',
          appcolor: '#0093DD',
          primary: colors.blue.darken2,
          accent: colors.orange.lighten1,
          netral: colors.shades.black,
          softgrey: colors.grey.darken3
        },
        light: {
          appcolor: '#0093DD',
          primary: colors.blue.darken2,
          accent: colors.orange.darken3,
          netral: colors.shades.white,
          softgrey: colors.grey.lighten3
        },
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vuelidate'],
    transpile: [/^vue2-google-maps($|\/)/, 'vuetify-money'],
    extend(config, { isClient }) {
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    },
    publicPath: `${BASE}_nuxt/`
  },
  router: {
    base: BASE
  },
  publicRuntimeConfig: {
    tokenKey: TOKEN_KEY,
    baseUrl: BASE_BE
  },
  server: {
    port: process.env.PORT || 3500,
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
}
