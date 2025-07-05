<template>
  <div>
    <v-dialog
      v-model="dialog"
      :scrollable="scrollable"
      :width="width"
      :persistent="persistent"
    >
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
            <slot></slot>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="pa-1">
            <v-btn depressed color="grey lighten-2" @click.prevent="handleClose"> BATAL </v-btn>
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
    width: {
      type: String,
      default: "600px",
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        this.dialog = this.show;
        this.resetForm = this.reset
      },
    },
    dialog(nv) {
      if (!nv) {
        this.handleClose();
      }
    },
  },
  data() {
    return {
      valid: false,
      dialog: false,
      resetForm: true,
    };
  },
  created() {},
  methods: {
    handleSave() {
      if (this.$refs.form.validate()) {
        if (this.valid) {
          this.$emit("handleSave", {});
          if (this.reset) {
            this.handleReset();
          }
        }
      }
    },
    handleClose() {
      this.dialog = false;
      this.$emit("handleClose", this.dialog);
      this.handleReset();
    },
    handleReset() {
      if (this.$refs.form) {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    },
  },
};
</script>
