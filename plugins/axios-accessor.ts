import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'
import { toast } from '@/mixins/toast.js'

const accessor: Plugin = ({ $axios, app, store, redirect, $config }) => {
  initializeAxios($axios)
  $axios.onError((error) => {
    if (error.response) {
      const { error: errMessage } = error.response.data
      store.commit('shared/SET_NOTIFICATION', errMessage)
      console.log('errMessage', errMessage)
      // toast.methods.showToast("error", errMessage)

      if (error.response.status === 401) {
        redirect('/logout')
      }
    }
  })

  $axios.defaults.baseURL = `${$config.baseUrl}api`
  $axios.onRequest((config) => {
    const token = app.$cookies.get($config.tokenKey)
    if (token) {
      $axios.setToken(token, 'Bearer')
      if(config.method=="get" && config.url?.includes("reports")) {
        config.headers.common['tenantId'] = app.$cookies.get('tenantId');
      }
    }

  })
}

export default accessor
