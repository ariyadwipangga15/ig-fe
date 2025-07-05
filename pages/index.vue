<template>
  <v-app id="login">
    <v-main>
      <!-- <div class="elps1"></div> -->
      <!-- <div class="elps2"></div> -->
      <v-container fill-height>
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="bx-crd-lg" elevation="5">
              <v-card-text style="padding: 0px">
                <v-row>
                  <v-col
                    class="img-lg"
                    cols="12"
                    md="6"
                    style="padding: 0px; background-image: url(img-login.jpg)"
                  >
                    <div class="bx-grd"></div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-container>
                      <div class="text-center">
                        <img width="33%" :src="logo" />
                        <br />
                        <h3 style="color: #333">Login</h3>
                        <p>
                          Selamat datang di Aplikasi IG Instan, silakan
                          masukkan Username dan password Anda dengan benar
                        </p>
                      </div>
                      <v-form>
                      <v-text-field
                        ref="username"
                        label="Masukan Username"
                        prepend-inner-icon="mdi-account-circle"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        :error-messages="usernameErrors"
                        v-model="username"
                        required
                        autofocus
                       outlined

                      />
                      <v-text-field
                        ref="password"
                        :type="showPassword ? 'text' : 'password'"
                        label="Masukan Password"
                        prepend-inner-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        v-on:keyup.enter="handleLogin"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        :error-messages="passwordErrors"
                        v-model="password"
                        class="pb-2"
                        outlined
                      />
  
                      <div class="text-right">
                        <v-btn dark large color="primary" @click="handleLogin"
                          >Login</v-btn
                        >
                      </div>
                    </v-form>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, username } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { toast } from "@/mixins/toast.js";
export default {
  mixins: [validationMixin],
  validations: {
    password: { required, maxLength: minLength(8) },
    username: { required },
  },
  layout: "auth",
  name: "PageLogin",
  head: {
    title: "Login",
  },
  middleware: "unauthenticated",
  data() {
    return {
      error: null,
      showPassword: false,
      formValid: false,
      username: "",
      password: "",
      focus: null,
    };
  },
  methods: {
    handleLogin() {
      this.$v.$touch();
      if (this.$v.username.$invalid) this.$refs["username"].$refs.input.focus();
      else if (this.$v.password.$invalid)
        this.$refs["password"].$refs.input.focus();

      try {
        this.$store
          .dispatch("auth/login", {
            username: this.username,
            password: this.password,
          })
          .catch((err) => {
            this.hasErr = true;
            this.errMsg = err.message;
            this.$nuxt.$loading.finish();
            toast.methods.showToast("error", 'Pastikan Username dan Password Benar !');

          });
      } catch (err) {
        console.log("errorlogin", err);
        throw err;
      }
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
  computed: {
    ...mapGetters({
      notifications: "shared/notifications",
    }),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("username harus diisi");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password harus diisi");
      return errors;
    },
    logo() {
      return require(`~/assets/image/logo-ims.png`);
    },
  },
};
</script>

<!-- <style lang="scss" scoped> -->
<style>
.bx-grd {
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 20px 0px 0px 20px;
  background-image: linear-gradient(
    159.36deg,
    #483bf9 4.04%,
    rgba(217, 217, 217, 0) 80.75%
  );
}
div.img-lg {
  padding: 0px;
  background-position: 48%;
  border-radius: 20px 0px 0px 20px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    159.36deg,
    #3b4ef9 4.04%,
    rgba(217, 217, 217, 0) 80.75%
  );
}
.bx-crd-lg {
  margin: auto;
  width: 80%;
  border-radius: 20px !important;
}
.bck-lg {
  position: absolute;
  z-index: 2;
}
.elps1 {
  /* background-color: #def0e2; */
  background-color: #F9C53B;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  position: absolute;
  left: -350px;
  top: -350;
}
.elps2 {
  background-color: #DB3730;
  border-radius: 50%;
  width: 350px;
  height: 210px;
  position: absolute;
  left: 95%;
  top: 500px;
}
</style>
