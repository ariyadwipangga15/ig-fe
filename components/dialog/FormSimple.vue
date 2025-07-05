<template>
  <div>
    <v-dialog v-model="show" scrollable max-width="600px">
      <v-card>
        <v-card-title
          class="appcolor"
          style="color: white; padding-top: 12px; padding-bottom: 12px"
        >
          <span style="font-size: 20px; padding-right: 10px">{{
            formTitle
          }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleClose()" style="color: white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form
            onSubmit="return false"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container>
              <v-layout>
                <v-flex xs12 sm12 md12>
                  <div v-for="(x, index) in formInput" :key="index">
                    <div v-if="x.type === 'money'">
                      <vuetify-money
                        v-model="editedItem[x.model]"
                        :rules="x.rules"
                        :required="x.isRequired"
                        :label="x.label"
                        :name="x.model"
                        class="right-input"
                        type="number"
                        outlined
                        dense
                        hide-details
                        v-bind:options="optionsHarga"
                        @click.native="selectInput"
                      ></vuetify-money>
                    </div>
                    <div v-else-if="x.type === 'datetime'">
                      <v-datetime-picker
                        v-model="editedItem[x.model]"
                        :rules="x.rules"
                        :label="x.label"
                        :text-field-props="x.uniqueSetting.textFieldProps"
                        :date-picker-props="x.uniqueSetting.datePickerProps"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>
                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>
                      </v-datetime-picker>
                    </div>
                  </div>
                  <CustomBaseInput
                    v-for="x in formInput"
                    :key="x.model"
                    :type="x.type"
                    :label="x.label"
                    :rules="x.rules"
                    :model="editedItem[x.model]"
                    v-model="editedItem[x.model]"
                    :name="x.model"
                    :isRequired="x.isRequired"
                    :items="x.items"
                    :uniqueSetting="x.uniqueSetting"
                    :maxLength="x.maxLength"
                    :maxDate="x.maxDate"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="pa-1">
            <v-btn depressed @click.prevent="handleClose"> BATAL </v-btn>
            <v-btn depressed color="primary" @click.prevent="handleSave">
              SIMPAN
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },
    formTitle: {
      type: String,
    },
    formInput: {
      type: Array,
    },
    editedItem: {
      type: Object,
    },
  },
  data() {
    return {
      valid: false,
    };
  },
  created() {},
  methods: {
    handleSave() {
      if (this.$refs.form.validate()) {
        if (this.valid) {
          this.$nuxt.$emit("reset-base-input");
          this.$emit("handleSave", this.editedItem);
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
        }
      }
    },
    handleClose() {
      this.$nuxt.$emit("reset-base-input");
      this.$nuxt.$emit("close-dialog");
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
  mounted() {},
};
</script>
