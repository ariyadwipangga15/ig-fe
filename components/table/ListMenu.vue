<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="appcolor" dark flat dense>
        <v-toolbar-title class="subheading">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleRefreshItems">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="12">
          <v-tabs v-model="tab" color="appcolor">
            <v-tab key="menu">Menu</v-tab>
            <v-tab key="akses">Hak Akses</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item key="menu">
            <v-row>
              <v-col cols="12" md="8">
                <div class="pt-3">
                  <v-btn color="#5cb270" @click="handleAddItem" dark>
                    <v-icon left dark> mdi-plus-circle-outline</v-icon>Tambah
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="filter.q"
                  append-icon="mdi-magnify"
                  label="Cari ( Tekan Enter )"
                  @keyup.enter="handleApplyFilter"
                  @click:append="handleApplyFilter"
                  @click:clear="handleClear"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <br />
            <template>
              <v-data-table
                :headers="headers"
                :items="tableData.items"
                :server-items-length="tableData.meta.totalItems"
                :items-per-page="itemsPerPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @update:page="handlePageChanged"
                @update:items-per-page="getItemPerPage"
                :footer-props="footerProps"
                item-key="id"
                no-data-text="Tidak ada data yang tersedia"
              >
                <template v-slot:[`footer.prepend`]>
                  <div>
                    <p class="mt-auto mb-auto">
                      Menampilkan {{ tableData.items.length }} dari total
                      {{ tableData.meta.totalItems }} data
                    </p>
                  </div>
                </template>
                <template v-slot:[`item.no`]="{ item }">
                  {{
                    filter.pageNumber * filter.pageSize -
                    filter.pageSize +
                    tableData.items.indexOf(item) +
                    1
                  }}.
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    class="btn-actions"
                    small
                    color="warning"
                    outlined
                    @click="handleEditItem(item)"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn
                    class="btn-actions"
                    x-small
                    color="error"
                    dark
                    outlined
                    @click="deleteItem(item)"
                  >
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <template v-slot:[`item.isUtama`]="{ item }">
                  <v-container class="py-0 px-0" fluid>
                    <v-checkbox
                      class="mt-0"
                      :input-value="item.isUtama"
                      value
                      hide-details
                      disabled
                    ></v-checkbox>
                  </v-container>
                </template>
              </v-data-table>
            </template>
          </v-tab-item>
          <v-tab-item key="akses">
            <v-row>
              <v-col cols="12" md="5">
                <div style="margin-right: 12px; margin-top: 8px">
                  <v-autocomplete
                    v-model="role_selected"
                    :items="listRole"
                    item-text="nama"
                    item-value="id"
                    label="Pilih Role . . ."
                    @change="handleLoadMenu()"
                    outlined
                  ></v-autocomplete>
                  <v-btn
                    color="#5cb270"
                    style="float: right"
                    @click="addMenuUser()"
                    class="mb-3"
                    dark
                  >
                    <v-icon>mdi-plus</v-icon>
                    Menu Ke User
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="12"
                md="7"
                style="
                  border-left: 1px solid #d8dbe0;
                  margin-top: -10px;
                  padding-left: 5px;
                "
              >
                <h3 class="pt-2 pl-5 mb-2">Data Menu User</h3>
                <p class="pl-5" v-show="role_selected == ''">
                  Silakan pilih role untuk melihat data menu !
                </p>
                <div v-if="loadingMenuUser == true" class="pl-5">
                  <v-progress-circular
                    :width="2"
                    :size="20"
                    color="red"
                    indeterminate
                    style="margin-top: -5px"
                  ></v-progress-circular>
                  &nbsp;
                  <span style="font-weight: bold"
                    >Sedang Mengambil Data . . .</span
                  >
                </div>
                <div v-show="loading_action_menu_user == true">
                  <v-progress-circular
                    :width="2"
                    :size="20"
                    color="red"
                    indeterminate
                    style="margin-top: -5px"
                  ></v-progress-circular>
                  &nbsp;
                  <span style="font-weight: bold">Loading . . .</span>
                </div>
                <transition name="fade">
                  <v-treeview
                    v-show="role_selected != ''"
                    :items="listMenuUser"
                    :search="search"
                    open-all
                  >
                    <template v-slot:prepend="{ item }">
                      <v-icon v-if="item.class_icon">{{
                        item.class_icon
                      }}</v-icon>
                    </template>
                    <template v-slot:label="{ item }">
                      {{ item.nama_menu }}
                      <v-chip
                        v-if="item.level == 2"
                        :class="chipColor(item.posisi)"
                        x-small
                        ><span style="font-size: 11px; font-weight: 500">{{
                          item.ket_posisi
                        }}</span></v-chip
                      >
                      <div style="float: right">
                        <v-tooltip bottom v-if="item.show_button_up == true">
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              aria-hidden="false"
                              color="teal darken-3"
                              @click="fn_menu_user_up(item)"
                            >
                              mdi-arrow-up-bold-box
                            </v-icon>
                          </template>
                          <span>Pindahkan Menu {{ item.nama_menu }} Ke Atas</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="item.show_button_down == true">
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              aria-hidden="false"
                              color="blue-grey darken-4"
                              @click="fn_menu_user_down(item)"
                            >
                              mdi-arrow-down-bold-box
                            </v-icon>
                          </template>
                          <span>Pindahkan Menu {{ item.nama_menu }} Ke Bawah</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              aria-hidden="false"
                              color="error"
                              @click="$emit('delete-menu-user', item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                          <span>Delete {{ item.nama_menu }}</span>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-treeview>
                </transition>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";
export default {
  mixins: [toast],
  props: {
    title: {
      type: String,
    },
    defaultSortBy: {
      type: String,
    },
    searchTitle: {
      type: String,
    },
    listRole: {
      type: Array,
      default: [],
    },
    listPosisi: {
      type: Array,
      default: [],
    },
    listMenuUser: {
      type: Array,
      default: [],
    },
    tableData: {
      type: Object,
      default: {
        items: [],
        meta: {
          totalItems: 0,
        },
      },
    },
    headers: {
      type: Array,
      default: [],
    },
    loadingMenuUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: "",
      itemsPerPage: PAGE_SIZE,
      footerProps: { "items-per-page-options": [10, 20, 40, 50] },
      sortBy: [this.defaultSortBy],
      sortDesc: [true],
      filter: {
        q: "",
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.defaultSortBy,
        sortType: "desc",
      },
      tab: null,
      loading_menu_user: false,
      role_selected: "",
      posisi: "1",
      loading_action_menu_user: false,
    };
  },
  methods: {
    chipColor(val) {
      if (val == "1") {
        return "success pa-1";
      } else if (val == "2") {
        return "primary pa-1";
      } else if (val == "3") {
        return "info pa-1";
      } else {
        return "success pa-1";
      }
    },
    handleApplyFilter() {
      const filter = Object.assign({}, this.filter);
      this.filter = {
        q: filter.q,
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.sortBy[0],
        sortType: this.sortDesc[0] == true ? "desc" : "asc",
        t: Date.now(),
      };
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleRefreshItems() {
      const resetFilter = Object.assign({}, this.filter);
      resetFilter.q = "";
      resetFilter.pageNumber = 1;
      (resetFilter.t = Date.now()), (this.filter = resetFilter);
      this.handleApplyFilter();
    },
    handleLoadMenu() {
      this.$emit("load-menu-user", {
        idRole: this.role_selected,
        posisi: this.posisi,
      });
    },
    handleAddItem() {
      this.$emit("addItem");
    },
    handleEditItem(item) {
      // copy item to a before edit
      let a = JSON.parse(JSON.stringify(item));
      this.$emit("editItem", a);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
    handlePageChanged(page) {
      this.filter.pageNumber = page;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    updateFilterQuery(query) {
      const filter = Object.assign(this.filter, query);
      filter.pageNumber = parseInt(filter.pageNumber);
      filter.pageSize = parseInt(
        filter.pageSize ? filter.pageSize : this.itemsPerPage
      );
      filter.t = Date.now();
      return filter;
    },
    async handleClear() {
      await this.handleResetFilter();
      this.filter.t = Date.now();
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleResetFilter() {
      this.filter = {
        pageNumber: 1,
        pageSize: this.itemsPerPage,
        q: "",
        sortBy: `${this.defaultSortBy} ,asc`,
        t: Date.now(),
      };
    },
    handleSort() {
      if (this.sortBy.length > 0 && this.sortDesc.length > 0) {
        this.filter.sortBy = this.sortBy[0];
        this.filter.sortType = this.sortDesc[0] == true ? "desc" : "asc";
        this.$router.replace({
          path: this.$route.path,
          query: this.filter,
        });
      }
    },
    getItemPerPage(val) {
      this.itemsPerPage = +val;
      this.filter.pageSize = this.itemsPerPage;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },

    addMenuUser() {
      if (this.role_selected == "") {
        return this.swalAlert(
          "Maaf",
          "warning",
          "Harap pilih Role terlebih dahulu !"
        );
      }
      this.$emit("addMenuUser");
    },

    fn_menu_user_sort(jenis, item) {
      this.$menuService()
        .sort({
          id: item.id,
          jenisSort: jenis,
        })
        .then((res) => {
          this.handleLoadMenu();
        });
    },
    fn_menu_user_up(item) {
      this.$menuService()
        .upMenu({
          id: item.id,
        })
        .then((res) => {
          this.handleLoadMenu();
        });
    },
    fn_menu_user_down(item) {
      this.$menuService()
        .downMenu({
          id: item.id,
        })
        .then((res) => {
          this.handleLoadMenu();
        });
    },
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.filter = this.updateFilterQuery(query);
        this.$emit("fetchData");
      },
      immediate: true,
    },
    sortBy() {
      this.handleSort();
    },
    sortDesc() {
      this.handleSort();
    },
  },
};
</script>
