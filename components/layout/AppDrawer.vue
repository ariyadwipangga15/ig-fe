<template>
  <v-navigation-drawer
    app
    class="app--drawer"
    :mini-variant.sync="mini"
    v-model="drawer"
    :width="drawerWidth"
    floating
    :style="`max-height: 100%; border:0 `"
  >
    
  <div class="ml-5 mr-5">
      <v-img :src="logo" :style="`max-width: 50%;`" />
      <v-divider color="brown"></v-divider>
  </div>

    <v-list class="pa-0">
      <template v-for="(item, key) in computeMenu">
        <template v-if="item.children && item.children.length > 0">
          <v-list-group color="#0093DD" :key="key" no-action :to="item.link_menu">
            <template v-slot:prependIcon>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" v-text="item.class_icon" />
                </template>
                <span> {{ item.nama_menu }} </span>
              </v-tooltip>
            </template>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.nama_menu" />
              </v-list-item-content>
            </template>
            <v-list-item
              :class="drawerWidth === 64 ? 'pl-4' : ''"
              v-for="subItem in item.children"
              :key="subItem.nama_menu"
              :to="subItem.link_menu"
              color="#0093DD"
            >
              <template v-if="drawerWidth === 64">
                <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        v-text="subItem.class_icon"
                      />
                    </template>
                    <span>{{ subItem.nama_menu }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.nama_menu" />
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item color="#0093DD" :key="key" :to="item.link_menu">
            <v-list-item-icon>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" v-text="item.class_icon" />
                </template>
                <span>{{ item.nama_menu }}</span>
              </v-tooltip>
            </v-list-item-icon>
            <v-list-item-content v-if="drawerWidth !== 64">
              <v-list-item-title v-text="item.nama_menu" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <!-- Collapse -->
    <template v-slot:append>
      <div class="grey lighten-3">
        <template v-if="drawerWidth === 64">
          <div class="d-flex">
            <v-btn
              width="64"
              icon
              tile
              @click="handleDrawerCollapse"
              class="mx-auto"
            >
              <v-icon class="text--disabled">mdi-arrow-collapse-right</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-else>
          <div class="d-flex">
            <v-spacer />
            <v-btn icon tile @click="handleDrawerCollapse" class="mr-2">
              <v-icon class="text--disabled">mdi-arrow-collapse-left</v-icon>
            </v-btn>
          </div>
        </template>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import menu from "@/api/menu";
import Util from "~/utils";
import { mapGetters } from "vuex";
import { toast } from "@/mixins/toast.js";

export default {
  name: "AppDrawer",
  components: {},
  mixins: [toast],
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mini: false,
      collapseDrawer: true,
      drawerWidth: 256,
      drawer: true,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
      // sponsor: {
      //   href: "https://www.theopticalfiber.com/",
      //   src: "https://www.theopticalfiber.com/images/logo/logo.png",
      //   srcMini: "https://www.theopticalfiber.com/images/logo/logo_mini.png",
      // },
      computeMenu: [],
    };
  },

  computed: {
    ...mapGetters({
      authMenus: "auth/menus",
      user: "auth/user",
    }),
    computeLogo() {
      return "/static/m.png";
    },
    avatar() {
      return require(`~/assets/avatar/boy.png`);
    },
    logo() {
      return require(`~/assets/image/logo.png`);
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  async mounted() {},
  created() {
    this.getMenu();
  },

  methods: {
    async getMenu() {
      await this.$store.dispatch(`auth/loadAuthMenu`, this.user.role.id);
      if (
        this.authMenus == undefined ||
        this.authMenus == null ||
        this.authMenus.length == 0
      ) {
        // this.showToast("success", "Otorisasi menu untuk anda belum di set");
        // this.$router.push("/logout");
        // return;
      }

      let menu = this.authMenus != null ? this.authMenus : [];
      this.computeMenu = menu;
      // this.menus = menu
      for (var i = 0; i < this.computeMenu.length; i++) {
        const el = this.computeMenu[i];
        if (el.isPermission == true) {
          el.splice(el.indexOf(el), -1);
        }
        if (el.children == null) {
          delete el.children;
        }
      }
    },

    async getData() {
      const postBody = {
        roleId: "SUPERADMIN",
      };
      await this.$axios
        .$get("/v1/menu-user", { params: postBody })
        .then((response) => {
          let menu = response.data != null ? response.data : [];
          this.menus = menu;
          for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].isPermission == true) {
              this.menus.splice(this.menus.indexOf(this.menus[i]), -1);
            }
            if (this.menus[i].children == null) {
              delete this.menus[i].children;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    handleDrawerCollapse() {
      this.drawerWidth = this.drawerWidth === 256 ? 64 : 256;
    },
    toggleDrawer(val) {
      this.drawer = val ? false : !this.drawer;
    },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
  },
  watch: {
    "$route.path": {
      handler(query) {},
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.font-size-role {
  font-size: 11px;
}
</style>
<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
/* ::-webkit-scrollbar-track {
  background: #ff2929;
} */

/* Handle */
::-webkit-scrollbar-thumb {
  background: #dedede;
  /* background: rgb(255, 219, 219); */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #918d8d;
}
</style>
