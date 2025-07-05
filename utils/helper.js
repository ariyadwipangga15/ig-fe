import moment from 'moment'

export function formatDate(datetime) {
  if (!Boolean(datetime)) {
    return ''
  }
  const tgl = moment(datetime)
    .toISOString()
    .slice(0, 16)
    .replace(/-/g, ' ')
    .replace('T', ' ')
    .split(' ')
  if (datetime) {
    return `${tgl[2]}/${tgl[1]}/${tgl[0]}`
  }
}

export function formatDateTime(datetime) {
  if (!Boolean(datetime)) {
    return ''
  }
  const tgl = moment(datetime)
    .toISOString()
    .slice(0, 16)
    .replace(/-/g, ' ')
    .replace('T', ' ')
    .split(' ')
  if (datetime) {
    return `${tgl[2]}/${tgl[1]}/${tgl[0]} ${tgl[3]}`
  }
}

export function formatTime(datetime) {
  if (!Boolean(datetime)) {
    return ''
  }
  const tgl = moment(datetime)
    .toISOString()
    .slice(0, 16)
    .replace(/-/g, ' ')
    .replace('T', ' ')
    .split(' ')
  if (datetime) {
    return `${tgl[3]}`
  }
}

export function formatShortDate(datetime) {
  if (!Boolean(datetime)) {
    return ''
  }
  const tgl = moment(datetime)
    .toISOString()
    .slice(0, 16)
    .replace(/-/g, ' ')
    .replace('T', ' ')
    .split(' ')
  if (datetime) {
    return `${tgl[2]}/${tgl[1]}/${tgl[0].substring(0, 2)}`
  }
}

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toUpperCase() : match.toLowerCase()
  })
}

export function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


export function dateAdd(date, day) {
  return moment(date, 'YYYY-MM-DD').add(day, 'days')
}

export function selectInput(event) {
  if (event.target.nodeName == 'INPUT') {
    event.target.select()
  }
}