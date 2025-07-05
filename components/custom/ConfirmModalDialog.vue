<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title class="primary" style="color: #fff">
        {{ title }}
      </v-card-title>
      <v-card-text
        class="mt-2 pt-4"
        v-show="!!message"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="body-2 font-weight-bold"
          @click.native="agree"
          >OK</v-btn
        >
        <v-btn
          v-if="!options.noconfirm"
          color="grey"
          dark
          class="body-2 font-weight-bold"
          @click.native="cancel"
          >Batal</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModalDialog',
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: 'grey lighten-3',
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
    }
  },

  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
