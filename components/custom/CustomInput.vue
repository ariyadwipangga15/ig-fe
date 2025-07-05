<template id="custominput">
  <input
    style="text-align: right"
    type="text"
    class="form-control h5"
    :key_input="key_input"
    :value="active ? val : formatted"
    @keydown.up.prevent="increment"
    @keydown.down.prevent="decrement"
    @blur="update"
    @keyup.enter.stop="update"
    @focus="active = true"
  />
</template>

<script>
function formatAsCurrency(value, dec) {
  dec = dec || 0
  return value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
export default {
  name: 'CustomInput',
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100000000 },
    step: { type: Number, default: 10000 },
    decimals: { type: Number, default: 0 },
    type: { default: 'currency' },
    key_input: { type: Number, default: 0 },
  },
  data: function () {
    return {
      active: false,
      _value: null,
    }
  },
  computed: {
    val: function () {
      if (this.type === 'currency') {
        return Number(this.value) + ''
      } else if (this.type === 'years') {
        return Number(this.value) + ''
      } else if (this.type === 'percent') {
        return Number(this.value * 100).toFixed(3)
      }
    },
    formatted: function () {
      if (this.type === 'currency') {
        return formatAsCurrency(this.value, 0)
      } else if (this.type === 'years') {
        return Number(this.value + ''.replace(/[^0-9\.]+/g, '')) + ' Years'
      } else if (this.type === 'percent') {
        return (this.value * 100).toFixed(this.decimals) + '%'
      }
    },
  },
  mounted() {
    this._value = this.value
  },
  methods: {
    increment: function (e) {
      if (e.shiftKey) {
        this._value += 10 * this.step
      } else {
        this._value += this.step
      }
      if (this.value > this.max) {
        this._value = this.max
      }
      this.changed()
    },
    decrement: function (e) {
      if (e.shiftKey) {
        this._value -= 10 * this.step
      } else {
        this._value -= this.step
      }
      if (this.value < this.min) {
        this._value = this.min
      }
      this.changed()
    },
    update: function () {
      this.active = false
      var tempVal = this.$el.value + ''
      this._value = Number(tempVal.replace(/[^0-9\.]+/g, ''))
      if (this.type === 'percent') this._value /= 100
      this.changed()
    },
    changed: function () {
      this.$emit('input', Number(this._value))
    },
  },
  template: '#thousandinput',
}
</script>

<style lang="scss" scoped>
// ffffff-00171f-003459-007ea7-00a8e8
// ffffff d9e3f0 2d5386 263238
// dcdcdd-c5c3c6-46494c-4c5c68-1985a1
// 2b2d42-8d99ae-edf2f4-ef233c-d90429
$col0: #ffffff;
$col1: #d9e3f0;
$col2: #2d5386;
$col3: #263238;
$chartHeight: 300px;
$chartWidth: 560px;

h2 {
  text-align: center;
  font-size: 32px;
  margin: 20px 0 20px 0;
  padding-top: 20px;
  color: $col1;
  // @include text-shadow(rgba(0, 0, 0, 0.5) 2px 2px 10px)
}

h3 {
  text-align: center;
  font-size: 24px;
  margin: 16px 0 20px 0;
  color: $col2;
}

.form {
  margin: -30px 20px 20px 20px;
  display: block;
  background: $col0;
  padding: 18px;
  border-radius: 4px 4px 0 0;
  transform: translateY(30px);
  // @include box-shadow(rgba(0, 0, 0, 0.3) 2px 2px 18px);
}

.form-group {
  width: 100%;
  position: relative;
  box-sizing: content-box;
  font-size: 14px;
  display: block;
}

label {
  width: 49%;
  display: inline-block;
  text-align: right;
  box-sizing: content-box;
  line-height: 20px;
  padding: 10px;
}

.out {
  font-size: 16px;
  color: $col3;
}

input,
select {
  width: 100%;
  display: inline-block;
  box-sizing: content-box;
  font-size: 14px;
  padding: 6px 8px 2px 2px;
  border: none;
  border-bottom: 3px solid $col1;
  background: none;
  outline: none;
  border-radius: 2px 2px 0 0;
  color: $col3;

  &:active,
  &:focus {
    background: lighten($col1, 5%);
  }
  option {
    background: $col0;

    &:active,
    &:hover,
    &:focus {
      background: $col1;
    }
  }
}

.hover {
  position: fixed;
  display: block;
  padding: 8px;
  font-size: 14px;
  color: $col2;
  transition: all 0.1s;
  background: $col0;
  pointer-events: none;
  border: 1px solid $col3;
  //   @include box-shadow(rgba(0,0,0,0.3) 2px 2px 10px)
}

.note {
  text-align: center;
  font-size: 0.7em;
}

svg {
  text {
    fill: $col2;
    font-family: 'Mada', sans-serif;
  }

  line {
    stroke: $col2;
    stroke-width: 2px;
  }
}
</style>
