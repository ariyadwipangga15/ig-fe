/* eslint-disable import/order */
import vue from 'vue'

vue.filter('upper', val => val.toUpperCase())
vue.filter('lower', val => val.toLowerCase())
vue.filter('number', val => {
    if (!val) return 0
      return parseInt(val) < 0
        ? '(' + Number(Math.abs(parseInt(val))).toLocaleString() + ')'
        : Number(Math.abs(parseInt(val))).toLocaleString()
})
vue.filter('thousand', val => {
  if (!val) return 0
    return  Number((parseInt(val))).toLocaleString() 
})
vue.filter('replaceUnderscore', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.replace(/_/g, ' ')
})
