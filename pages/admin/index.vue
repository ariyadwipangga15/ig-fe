<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'admin',
  head: {
    title: 'Admin',
  },
  data() {
    return {
      error: null,
      showPassword: false,
      formValid: false,
      formModel: {
        email: null,
        password: null,
      },
      formRule: {
        email: [(v) => !!v || 'Username Harus diisi'],
        password: [(v) => !!v || 'Password Harus diisi'],
      },
    }
  },
}
</script>
