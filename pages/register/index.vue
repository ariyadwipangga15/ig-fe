<template>
  <div>
    <v-container fluid>
      <v-row style="margin-top: 80px" align="center" justify="center">
        <v-col cols="12" md="6" sm="10">
          <v-card style="width: 100%" elevation="3">
            <h1 class="text-center pa-5">Registrasi Akun</h1>
            <v-divider class="py-1"></v-divider>
            <v-card-text>
              <p class="black--text mb-6" style="font-size: 11pt">
                Silakan masukkan data diri Anda untuk memulai pendaftaran!
                kembali ke halaman <a href="/">beranda</a>
              </p>
              <v-form
                onSubmit="return false"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <h3 class="black--text">Data Diri</h3>
                <v-text-field
                  v-model="editedItem.nama"
                  label="Nama"
                  :rules="[() => !!editedItem.nama || 'Nama wajib diisi']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  :rules="[() => !!editedItem.username || 'Username wajib diisi']"
                  required
                ></v-text-field>
                <br />
                <h3 class="black--text">User Akun</h3>
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  :rules="[emailRules.required, emailRules.format]"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="editedItem.password"
                  :rules="passwordRules"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  browser-autocomplete="new-password"
                  @click:append="show_password = !show_password"
                  hide-details="auto"
                ></v-text-field>
                <br />
                <v-checkbox
                  style="font-size: 10px"
                  v-model="checkKebijakan"
                  :label="`Saya setuju dengan Kebijakan Privasi IG`"
                ></v-checkbox>
                <div class="text-left">
                  <v-btn
                    :disabled="!checkKebijakan"
                    :loading="loading"
                    color="primary"
                    :dark="checkKebijakan"
                    class="mt-3 pl-8 pr-8"
                    @click="saveValidate()"
                  >
                    Daftar
                  </v-btn>
                </div>
                <br />
                <p class="black--text" style="font-size: 11pt">
                  Sudah memiliki akun? <a href="/">login</a>
                </p>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <br /><br />
  </div>
</template>
<script>
import { toast } from '@/mixins/toast.js'
import { validasi } from '@/mixins/validasi.js'
export default {
  layout: 'frontend',
  mixins: [toast, validasi],
  data: () => ({
    menu: false,
    loading: false,
    tanggal: new Date().toISOString().substr(0, 10),
    valid: '',
    mode: 'web',
    checkKebijakan: false,
    editedItem: {},
    show_password: false,
    passwordRules: [
      (v) => !!v || 'Password wajib diisi',
      (v) => (v && v.length >= 6) || 'Password minimal 6 karakter',
      (v) => /(?=.*[A-Z])/.test(v) || 'Password minimal satu huruf kapital',
      (v) => /(?=.*\d)/.test(v) || 'Password minimal berisikan satu angka',
    ],
    rulesnik: {
      required: (v) => !!v || 'NIK Wajib Diisi !',
      loanMax: (v) => (v && v.length >= 16) || 'NIK Maksimal 16 Digit',
    },
    emailRules: {
      required: (v) => !!v || 'Email Wajib Diisi !',
      format: (v) => /.+@.+/.test(v) || 'Format Email Salah !',
    },
   
  }),
  computed: {
  },

  methods: {
    formatDatePicker(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    saveValidate() {
      if (this.$refs.form.validate()) {
        if (this.valid) {
          this.save()
          this.$refs.form.resetValidation()
        }
      } else {
        console.log('none !')
      }
    },

    async save() {
    //   this.loading = true
      var dataObj = {
        nama: this.editedItem.nama.replace("'", "`"),
        email: this.editedItem.email,
        password: this.editedItem.password,
        username: this.editedItem.username,
        role : 'HA02',
      }
      try {
      } catch (error) {
        console.log('Login error:', error)
      }
      await this.$axios
        .$post('/register', dataObj)
        .then((response) => {
          if (response.success == true) {
            setTimeout(() => {
              this.swalAlert('Berhasil Register', 'success', response.message)
            //   this.loading = false
              this.reset()
              this.$router.push('/')
            }, 2000)
          } else {
            // this.loading = false
            this.reset()
            this.swalAlert('Maaf', 'error', response.message)
          }
        })
        .catch((error) => console.log(error))
    },

    reset() {
      this.$refs.form.resetValidation()
      this.checkKebijakan = false
      this.editedItem = {}
    },
  },
}
</script>
