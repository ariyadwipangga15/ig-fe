/* eslint-disable import/order */
import vue from 'vue'
import vuelidate from 'vuelidate'
import backdrop from '@/components/backdrop'
import DatePicker from '@/components/custom/DatePicker.vue'

vue.use(vuelidate)
vue.component('backdrop', backdrop)
vue.use(require('vue-shortkey'))
vue.component('DatePicker', DatePicker)

