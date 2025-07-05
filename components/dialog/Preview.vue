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
          class="text-h5 grey lighten-2"
          style="padding-top: 7px; padding-bottom: 7px"
        >
          <span style="font-size: 19px; padding-right: 10px">{{
            formTitle
          }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleClose()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p v-show="fileName" class="mt-4 black--text" style="font-size: 16px">
            <b>Nama File :</b> {{ fileName }}
          </p>
          <div class="text-center" style="height: 100vh">
            <img
              v-if="file.split('.').pop() != 'pdf'"
              width="100%"
              :src="file"
              alt=""
            />
            <iframe
              v-if="file.split('.').pop() == 'pdf'"
              width="100%"
              height="100%"
              :src="file"
              frameborder="0"
            ></iframe>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    formTitle: {
      type: String,
      default: "Preview Dokumen",
    },
    file: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "900px",
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
  },
  watch: {},
  data() {
    return {
      dialog: false,
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.dialog = false;
    },
    show() {
      this.dialog = true;
    },
  },
};
</script>
