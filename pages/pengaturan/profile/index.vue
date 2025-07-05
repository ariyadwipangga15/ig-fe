<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <v-card hover>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <v-layout row wrap>
                <v-col cols="12" md="7">
                  <div class="pt-3">
                    <v-btn color="primary" dark @click="openDialog()">
                      Ubah Password
                    </v-btn>
                  </div>
                </v-col>
                <v-flex xs6 sm6 md2> </v-flex>
                <v-flex xs12 sm12 md4> </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-layout>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="dataUser.nama"
                        label="Nama"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="dataUser.email"
                        label="Email"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="dataUser.username"
                        label="Username"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="dataRole.nama"
                        label="Role"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
          </v-card-text>
          <v-card-actions>
            <!-- no Action -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-form
          onSubmit="return false"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card-title
            class="primary"
            style="color: white; padding-top: 12px; padding-bottom: 12px"
          >
            <v-toolbar-title>Ubah Password</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close()" style="color: white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout>
                <v-flex>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    onSubmit="return false;"
                  >
                    <v-layout>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.oldPassword"
                            :rules="[
                              () =>
                                !!editedItem.oldPassword ||
                                'Password wajib diisi',
                            ]"
                            required
                            label="Password Lama"
                            :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="value1 ? 'password' : 'text'"
                            @click:append="() => (value1 = !value1)"
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.newPassword"
                            :rules="passwordRules"
                            required
                            label="Password Baru"
                            :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="value2 ? 'password' : 'text'"
                            @click:append="() => (value2 = !value2)"
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.ulangi_password"
                            :rules="[
                              () =>
                                !!editedItem.ulangi_password ||
                                'Ulangi Password Baru wajib diisi',
                              () =>
                                editedItem.newPassword ==
                                  editedItem.ulangi_password ||
                                'ulangi password tidak sama!',
                            ]"
                            required
                            label="Ulangi Password Baru"
                            :append-icon="value3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="value3 ? 'password' : 'text'"
                            @click:append="() => (value3 = !value3)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-layout>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="pa-2">
              <v-btn class="mr-2" color="primary" @click="validate()" dark
                >Simpan</v-btn
              >
              <v-btn
                class="body-2 font-weight-bold"
                color="grey"
                dark
                @click="close()"
                >Batal</v-btn
              >
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- End Dialog -->
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
import { toast } from "@/mixins/toast.js";
import { mapGetters } from "vuex";
export default {
  layout: "admin",
  head: {
    title: "User Profile",
  },
  data: () => ({
    loading: true,
    dialog: false,
    value1: true,
    value2: true,
    value3: true,
    editedIndex: -1,
    passwordRules: [
      (v) => !!v || "Password wajib diisi",
      (v) => (v && v.length >= 6) || "Password minimal 6 karakter",
    ],
    editedItem: {
      oldPassword: "",
      newPassword: "",
    },
    defaultItem: {
      oldPassword: "",
      newPassword: "",
    },
    valid: true,
  }),

  mixins: [toast],

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  computed: {
    ...mapGetters({
      items: "auth/user",
    }),
  },

  created() {
    this.dataUser = this.items;
    this.dataRole = this.dataUser.role;
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.valid) {
          this.save();
          this.$refs.form.resetValidation();
        }
      }
    },

    async save() {
      let self = this;
      const data = {
        username: this.dataUser.username,
        password: self.editedItem.oldPassword,
        password_baru: self.editedItem.newPassword,
      };
      this.$profileService()
        .ubahPassword(data)
        .then((res) => {
          if (res.success == true) {
            this.close();
            toast.methods.showToast("success", "Password berhasil diubah");
          } else {
            toast.methods.showToast("error", res.message);
          }
        });
    },

    openDialog() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      // reset form validation
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
