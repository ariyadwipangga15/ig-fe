<template>
  <div id="app">
    <div v-if="!file">
      <div
        :class="['dropZone', dragging ? 'dropZone-over' : '']"
        @dragenter="dragging = true"
        @dragleave="dragging = false"
      >
        <div class="dropZone-info" @drag="onChange">
          <span class="fa fa-cloud-upload dropZone-title"></span>
          <v-icon class="dropZone-title" x-large>mdi-cloud-upload</v-icon>
          <br />
          <span class="dropZone-title">Drop file or click to upload</span>
          <div class="dropZone-upload-limit-info">
            <div>Ukuran Maksimum File : 5 MB</div>
          </div>
        </div>
        <input type="file" @change="onChange" :accept="acceptFile" />
      </div>
    </div>
    <div v-else class="dropZone-uploaded">
      <div class="dropZone-uploaded-info">
        <div v-if="extension == 'png'">
          <img src="~/assets/image/icon-peenge.png" style="max-height: 100px" />
        </div>

        <div v-if="extension == 'jpg' || extension == 'jpeg'">
          <img src="~/assets/image/jpg.png" style="max-height: 100px" />
        </div>

        <div v-if="extension == 'doc' || extension == 'docx'">
          <img src="~/assets/image/icon-word.png" style="max-height: 100px" />
        </div>

        <div v-if="extension == 'xlsx' || extension == 'xlx'">
          <img src="~/assets/image/icon-excel.png" style="max-height: 100px" />
        </div>

        <div v-if="extension == 'ppt' || extension == 'pptx'">
          <img src="~/assets/image/icon-ppt.png" style="max-height: 100px" />
        </div>

        <div v-if="extension == 'pdf'">
          <img src="~/assets/image/icon-pdf.png" style="max-height: 100px" />
        </div>
        <div>{{ file.name }}</div>
        <div>Ukuran File(kb): {{ niceBytes(file.size) }}</div>
        <v-btn outlined color="error" @click="removeFile">Hapus</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { numbering } from "@/mixins/numbering";
import Swal from "sweetalert2";
export default {
  props: {
    acceptFile: {
      type: String,
      default: ".pdf",
    },
  },
  mixins: [numbering],
  data() {
    return {
      file: "",
      dragging: false,
      units: ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    };
  },
  methods: {
    niceBytes(x) {
      let l = 0,
        n = parseInt(x, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + this.units[l];
    },
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (file.size > 5000000) {
        this.dragging = false;
        this.removeFile();
        return Swal.fire("Maaf, ukuran terlalu besar.", "", "error");
      }

      this.file = file;
      this.$emit("listen", this.file);
      this.dragging = false;
    },
    removeFile() {
      this.file = "";
    },
  },
  computed: {
    extension() {
      return this.file ? this.file.name.split(".").pop() : "";
    },
  },
  mounted() {},
};
</script>

<style scoped>
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #aeaeae;
}

.dropZone:hover {
  border: 2px solid #5cb270;
}

.dropZone:hover .dropZone-title {
  color: #5cb270;
}

.dropZone-info {
  color: #aeaeae;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #aeaeae;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #aeaeae;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aeaeae;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
