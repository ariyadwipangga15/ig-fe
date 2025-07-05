<template>
  <v-app dark>
    <app-drawer class="app--drawer" ref="drawer" />
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerVisible" />
    <v-main class="div-nuxt-content">
      <div class="pa-2" v-if="isHasAccess">
        <nuxt />
      </div>
      <div v-else>
        <AccessDenied />
      </div>
    </v-main>
    <v-footer
      class="justify-left pl-3"
      color="#f5f5f5"
      inset
      app
      :absolute="!fixed"
      style="
        border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
        font-size: 15px;
      "
    >
      <span>
        &copy; {{ new Date().getFullYear() }} Aplikasi - Inventory PTPN XII
      </span>
    </v-footer>

    <!-- v-idle -->
    <div v-show="false">
      <v-idle
        @idle="onidle"
        @remind="onremind"
        :loop="true"
        :reminders="[30]"
        :wait="30"
        :duration="900"
      />
    </div>
    <v-dialog v-model="isIdle" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Session Expired
        </v-card-title>
        <v-card-text>
          <br />
          Sesi anda akan berakhir dalam {{ second }} detik
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isIdle = false"> Kembali </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AppDrawer from "~/components/layout/AppDrawer";
import AppToolbar from "~/components/layout/AppToolbar";
export default {
  components: {
    AppDrawer,
    AppToolbar,
  },
  name: "Admin",
  middleware: "authenticated",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isIdle: false,
      time: 10000,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      menus: [],
      isHasAccess: true,
    };
  },
  computed: {
    second() {
      return this.time / 1000;
    },
  },
  watch: {
    $route: {
      handler() {
        this.checkAkses();
      },
      immediate: true,
    },
  },
  async mounted() {
    // await this.loadMenuPermission();
    this.$nuxt.$on("drawer-side", (data) => {
      this.handleDrawerVisible(data);
    });
  },
  methods: {
    async loadMenuPermission() {
      await this.$menuService()
        .getMenuPermission({
          idRole: this.$store.state.auth.user.role.id,
          app: "1",
        })
        .then((res) => {
          this.menus = res.data || [];
          this.$store.dispatch("auth/setMenuUser", this.menus);
          this.checkAkses();
        });
    },
    handleDrawerVisible(data) {
      this.$refs.drawer.toggleDrawer(data);
    },
    onidle() {
      this.$router.push("/logout");
    },
    onremind(time) {
      this.time = 30000;
      this.isIdle = true;
      let timerId = setInterval(() => {
        this.time -= 1000;
        if (!this.isIdle) clearInterval(timerId);
        if (this.time < 1) {
          clearInterval(timerId);
        }
      }, 1000);
    },
    // RBAC Menu
    checkAkses() {
      let menus = this.menus;
      if (menus.length > 0) {
        let route = this.$route.path;
        this.isHasAccess = this.findRoute(menus, route);
      }
    },

    match_str(val1, val2) {
      let a = val1.split("/").join("");
      let b = val2.split("/").join("");
      let reg = new RegExp(b, "g");
      let result = a.match(reg);
      // console.log("parse", {a:a, b:b, result:result});
      return result ? true : false;
    },

    findRoute(arr, val) {
      let found = arr.filter((menu) => {
        return this.match_str(val, menu.link);
      });
      return found.length > 0 ? true : false;
    },
  },
};
</script>
<style>
.th-head {
  /* background-color: #EEEEEE;
    color : #fff !important; */
  font-size: 13px !important;
}
/* .table-head > th{
    background-color: #495057;;
    color : #fff !important;
    font-size:14px !important;
  } */
.btn-actions {
  height: 28px !important;
  padding: 0px !important;
  min-width: 31px !important;
}
/* .mdi-arrow-up::before {
    color: #fff;
  } */
table,
th,
td {
  border: 1px solid #d8dbe0 !important;
  border-collapse: collapse;
}
.swal2-title,
.swal2-content,
.swal2-actions {
  font-family: sans-serif !important;
}

.control-label {
  font-weight: 400 !important;
  font-size: 15px;
  color: #000 !important;
  /* font-family: "Open Sans", sans-serif !important; */
}
</style>
