<template>
  <v-menu
    ref="menu_model"
    v-model="menu_model"
    :close-on-content-click="false"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="model"
        :label="label"
        :outlined="outlined"
        :dense="dense"
        prepend-inner-icon="mdi-clock-time-four-outline"
        :rules="rules"
        :hide-details="hideDetails"
        :required="required"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-if="menu_model"
      v-model="model"
      scrollable
      format="24hr"
      @click:minute="$refs.menu_model.save(model)"
      @change="updateData"
      :landscape="$vuetify.breakpoint.smAndUp"
    >
      <!-- :min="minDateData" -->
    </v-time-picker>
  </v-menu>
</template>

<script>
import { tanggal } from "@/mixins/tanggal";
export default {
  props: {
    model: {
      type: String | Boolean,
    },
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
      type: Array,
    },
    required: {
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
    time: null,
    menu_model: false,
    // model: "",
    minDateData: "",
    maxDateData: "",
  }),
  computed: {},
  methods: {
    reset() {
      this.model = "";
    },
    updateData() {
      let val = this.model;
      this.$emit("listen", val);
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
  },
};
</script>
