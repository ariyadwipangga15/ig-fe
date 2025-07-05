<template>
  <v-text-field
    v-if="type === 'input'"
    :ref="name"
    :value="model"
    @keyup="$emit('input', $event.target.value)"
    :rules="rules"
    :required="isRequired"
    :label="label"
    :disabled="disabled"
    :hide-details="hideDetail"
    outlined
    dense
    :type="jenis || 'text'"
  ></v-text-field>
  <v-text-field
    v-else-if="type === 'inputs'"
    :ref="name"
    :value="model"
    @keyup="$emit('input', $event.target.value)"
    :rules="rules"
    :required="isRequired"
    :label="label"
    :type="jenis || 'texts'"
  ></v-text-field>
  <v-textarea
    v-else-if="type === 'textarea'"
    :ref="name"
    :value="model"
    :hide-details="hideDetail"
    @keyup="$emit('input', $event.target.value)"
    :rules="rules"
    rows="2"
    :required="isRequired"
  >
    <template v-slot:label>
      <div>
        {{ label }}
      </div>
    </template>
  </v-textarea>
  <v-text-field
    v-else-if="type === 'number'"
    :ref="name"
    :value="model"
    @keypress="isNumber($event)"
    @keyup="$emit('input', $event.target.value)"
    :rules="rules"
    :required="isRequired"
    :label="label"
    :hide-details="hideDetail"
    :maxlength="maxLength"
  ></v-text-field>
  <v-checkbox
    v-else-if="type === 'checkbox'"
    :ref="name"
    :id="name"
    :hide-details="hideDetail"
    :input-value="model"
    @click="changeValueCheckbox($event, name)"
    :label="label"
    :rules="rules"
    :required="isRequired"
  ></v-checkbox>

  <v-autocomplete
    v-else-if="type === 'autocomplete-with-id'"
    :ref="name"
    :id="name"
    :hide-details="hideDetail"
    :value="model"
    @change="changeValueAutocomplete($event, name)"
    :rules="rules"
    :required="isRequired"
    :items="items"
    :item-text="(item) => '[' + item.id + '] ' + item.nama"
    item-value="id"
    :closeOnSelect="true"
    :menu-props="{ top: false, offsetY: true }"
    :label="label"
  >
  </v-autocomplete>

  <v-autocomplete
    v-else-if="type === 'autocomplete'"
    :ref="name"
    :id="name"
    :value="model"
    :hide-details="hideDetail"
    @change="changeValueAutocomplete($event, name)"
    :rules="rules"
    :required="isRequired"
    :items="items"
    :item-text="(item) => item.nama"
    item-value="id"
    :closeOnSelect="true"
    :menu-props="{ top: false, offsetY: true }"
    :label="label"
    outlined
    dense
  >
  </v-autocomplete>
  <v-select
    v-else-if="type === 'select'"
    :ref="name"
    :id="name"
    :value="model"
    :hide-details="hideDetail"
    @change="changeValueAutocomplete($event, name)"
    :rules="rules"
    :required="isRequired"
    :items="items"
    :closeOnSelect="true"
    :menu-props="{ top: false, offsetY: true }"
    :label="label"
  >
  </v-select>
  <custom-date-picker-component
    v-else-if="type === 'date'"
    :ref="name"
    :id="name"
    :label="label"
    :data="model"
    :model="model"
    :hide-details="hideDetail"
    :rules="rules"
    :required="isRequired"
    @listen="updateDate"
    :maxDate="maxDate"
    :minDate="minDate"
    outlined
    dense
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
    },
    jenis: {
      type: String,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    model: {
      type: String | Boolean,
    },
    rules: {
      type: Array,
    },
    isRequired: {
      type: Boolean,
    },
    items: {
      type: Array,
    },
    maxLength: {
      type: String | Number,
    },
    maxDate: {
      type: String,
    },
    minDate: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    hideDetail: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    updateDate(val) {
      this.$emit("input", val);
    },

    resetForm() {
      if (this.$refs[this.name]) {
        // if (this.type == "datetime") {
        //   this.$refs[this.name].clearHandler();
        // } else {
        this.$refs[this.name].reset();
        this.$refs[this.name] = "";
        // }
      }
    },
    changeValueCheckbox(e, id) {
      let elt = document.getElementById(id);
      let checked = false;
      if (!elt.checked) {
        checked = true;
      }

      this.$emit("input", checked);
    },
    changeValueAutocomplete(e, id) {
      this.$emit("input", e);
    },
  },
  mounted() {
    this.$nuxt.$on("reset-base-input", () => {
      this.resetForm();
    });
  },
};
</script>
