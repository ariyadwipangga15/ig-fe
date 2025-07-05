<template>
  <v-menu
    ref="menu_model"
    v-model="menu_model"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-if="rules"
        v-model="computedDate"
        :label="label"
        :outlined="outlined"
        :dense="dense"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-on="on"
        :rules="[() => !!computedDate || 'Field wajib diisi!']"
        :hide-details="hideDetails"
      />
      <v-text-field
        v-else
        v-model="computedDate"
        :label="label"
        :outlined="outlined"
        :dense="dense"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-on="on"
        :hide-details="hideDetails"
      />
    </template>
    <v-date-picker
      v-model="model"
      no-title
      scrollable
      :max="maxDateData"
      @input="menu_model = false"
      @change="updateData()"
    >
      <!-- :min="minDateData" -->
    </v-date-picker>
  </v-menu>
</template>

<script>
/**
 * HOW TO USE ?
 * <DatePicker label="Tanggal Terima" :data="tanggal_awal" @listen="listenDataTanggalAwal" />
 * label : up to you!
 * data : initialize data from your parent component
 * listen : make a method from your parent to update the data.
 * listen example => listenDataTanggalAwal(val) {
 *                     this.tanggal_awal = val
 *                     load_data()
 *                   },
 *
 */

import { tanggal } from "@/mixins/tanggal";
export default {
  props: {
    outlined: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    data: {
      type: String,
    },
    minDate: {
      type: String,
    },
    maxDate: {
      type: String,
    },
    rules: {
      type: Boolean,
    },
    formatted: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },

  mixins: [tanggal],
  data: () => ({
    menu_model: false,
    model: "",
    minDateData: "",
    maxDateData: "",
  }),
  computed: {
    computedDate() {
      return this.model
        ? this.customBackEndDateFormat(this.model, "DD/MM/YYYY")
        : "";
    },
  },
  methods: {
    updateData() {
      let val = this.model;
      this.$emit("listen", val);
    },
    updateMinDate(val) {
      this.minDateData = val;
    },
    updateMaxDate(val) {
      this.maxDateData = val;
    },
    updateValue(val) {
      this.model = val;
    },
    resetVal(newData) {
      this.model = newData;
    },
  },
  created() {
    this.model = this.data;
    this.minDateData = this.minDate;
    if (this.maxDateData != "") {
      this.maxDateData = new Date().toISOString().substr(0, 10);
    }
  },
};
</script>
