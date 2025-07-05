<template>
  <div>
    <v-menu
      v-model="menuDatepicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :label="label"
          :disabled="disabled"
          persistent-hint
          append-icon="mdi-calendar"
          readonly
          dense
          hide-details="auto"
          outlined
          v-model="dateFormatted"
          v-bind="attrs"
          v-on="on"
          @input="handleInput"
        ></v-text-field>
      </template>
      <v-date-picker
        no-title
        :value="value"
        :min="minDate"
        @input="handleInput"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component({
  name: 'DatePicker',
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
  },
})
export default class UDatePicker extends Vue {
  @Prop({
    type: String as PropType<string>,
    default: () => '',
  })
  private readonly jenis!: string

  @Prop({
    type: String as PropType<string>,
    default: () => '',
  })
  private readonly label!: string

  @Prop({
    type: String as PropType<string>,
    default: () => '',
  })
  private readonly name!: string

  @Prop({
    type: String as PropType<string>,
    default: () => '',
  })
  private readonly minDate!: string

  @Prop({
    type: Array as PropType<any[]>,
    default: () => [],
  })
  private readonly rules!: any[]

  @Prop({
    type: String as PropType<string>,
    default: () => null,
  })
  private readonly value!: any

  @Prop({
    type: Boolean as PropType<boolean>,
    default: () => null,
  })
  private readonly disabled!: any

  dateFormatted = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10))

  formatDate(date: string) {
    if (!date) return null

    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  public menuDatepicker: boolean = false

  resetForm() {
    if (this.$refs[this.name]) {
      ;(<any>this.$refs)[this.name].reset()(<any>this.$refs).$refs[this.name] =
        ''
    }
  }

  handleInput(e: any) {
    this.menuDatepicker = false
    if (e) {
      this.$emit('input', e.target?.value ?? e)
    } else {
      this.$emit('input', null)
    }
  }

  parseDate(date: string) {
    if (!date) return null

    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  mounted() {
    this.$nuxt.$on('reset-base-input', () => {
      this.resetForm()
    })
  }

  @Watch('value')
  async watchFormatDate(date: any) {
    this.dateFormatted = this.formatDate(date)
  }
}
</script>
