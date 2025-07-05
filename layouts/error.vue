<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <div class="layout-content ma-auto w-full">
          <v-card
            class="text-center"
            style="padding: 8px 8px 20px 8px !important; border-radius: 6px"
          >
            <v-card-title class="headline justify-center">
              <h1 v-if="error.statusCode === 404">
                {{ pageNotFound.title }}
              </h1>
              <h1 v-else>
                {{ otherError.title }}
              </h1>
            </v-card-title>
            <v-card-text>
              <span v-if="error.statusCode === 404">
                {{ pageNotFound.text }}
              </span>
              <span v-else>
                {{ otherError.text }}
              </span>
              <v-btn block dark large color="primary" class="mt-16" to="/"
                >Back To Home</v-btn
              >
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: {
        title: 'Page Not Found',
        text: "Sorry we can't seem to find the page you're looking for",
      },
      otherError: {
        title: 'An Error Occurred',
        text: 'Our experts are working to fix the issue.',
      },
    }
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.pageNotFound.title
        : this.otherError.title
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
