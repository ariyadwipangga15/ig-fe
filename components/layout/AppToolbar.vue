<template>
  <v-app-bar color="netral" app elevation="0">
    <v-app-bar-nav-icon @click="handleDrawerToggle" />
    <v-spacer />
    <div v-if="!isLoggedIn">
      <v-btn text to="/login">LOGIN</v-btn>
    </div>
    <v-toolbar-items v-if="isLoggedIn">
      <!-- <v-btn icon @click="handleDarkMode()" title="Mode">
        <v-icon>{{
          this.$vuetify.theme.dark ? "mdi-brightness-6" : "mdi-brightness-2"
        }}</v-icon>
      </v-btn> -->
      <v-btn icon @click="handleFullScreen()" title="Fullscreen">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <!-- <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        transition="scale-transition"
        :alt="user.email"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon text slot="activator" v-on="on">
            <v-badge color="red" overlap>
              <span slot="badge">3</span>
              <v-icon medium>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
      </v-menu> -->

      <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <div style="padding: 10px">
            <v-btn dense text v-bind="attrs" v-on="on">
              <v-avatar size="30px">
                <img :src="avatar" :alt="user.username" /> &nbsp;
              </v-avatar>
              <span v-if="!mdAndDown" style="font-size: 80%; text-align: left">
                <!-- <strong>{{ user.username }}</strong> -->
                <!-- <br /> -->
                <!-- <span
                  class="black--text"
                  style="padding-top: 90%; font-size: 7pt"
                  >{{ user.nama_role }}</span
                > -->
              </span>

              <v-spacer></v-spacer>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="!item.href ? { name: item.href } : null"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <confirm-modal-dialog ref="confirm" />
  </v-app-bar>
</template>
<script>
import Util from "~/utils";
import { mapGetters } from "vuex";
import ConfirmModalDialog from "../custom/ConfirmModalDialog";

export default {
  name: "AppToolbar",
  components: {
    ConfirmModalDialog,
    // NotificationList,
  },
  data() {
    return {
      isLoggedIn: false,
      profileMenus: [
        {
          icon: "mdi-account",
          href: "#",
          title: "Profile",
          click: this.handleProfile,
        },
        {
          icon: "mdi-power",
          href: "#",
          title: "Logout",
          click: this.handleLogut,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    avatar() {
      return require(`~/assets/avatar/boy.png`);
    },
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    breadcrumbs() {
      const { matched } = this.$route;
      return matched.map((route, index) => {
        const to =
          index === matched.length - 1
            ? this.$route.path
            : route.path || route.redirect;
        const text = route.meta.title;
        return {
          text: text,
          to: to,
          exact: true,
          disabled: false,
        };
      });
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  methods: {
    handleDrawerToggle() {
      this.$emit("side-icon-click");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (process.client) {
        localStorage.setItem("theme_mode", this.$vuetify.theme.dark);
      }
    },
    async handleLogut() {
      // if (window.confirm('Apakah Anda yakin akan logout?')) {
      //   this.$router.push('/logout')
      // }
      if (
        await this.$refs.confirm.open(
          "Logout",
          "Apakah Anda yakin akan logout?"
        )
      ) {
        this.$router.push("/logout");
      }
    },
    handleChangeLocale({ value }) {
      this.$vuetify.lang.current = value;
    },
    handleProfile() {
      this.$router.push("/pengaturan/profile");
    },

    handleGoBack() {
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {
    this.isLoggedIn = Boolean(this.user);
    if (process.client) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("theme_mode"));
    }
  },
};
</script>

<style lang="sass" scoped>
.v-toolbar__extension
  padding: 0 !important
</style>
