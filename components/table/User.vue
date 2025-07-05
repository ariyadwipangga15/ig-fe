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
      <v-card-text>
        <v-row>
          <v-col cols="12" md="2">
            <div class="pt-3">
              <v-btn color="success" @click="handleAddItem" dark>
                <v-icon left dark> mdi-plus-circle-outline</v-icon>Tambah
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
                  v-model="idRole"
                  :items="listRole"
                  item-value="id"
                  item-text="nama"
                  label="Role"
                  single-line
                  clearable
                  @click:clear="handleClearRole"
                  @change="handleChangeRole($event)"
                  >
            </v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" md="2">
          </v-col> -->
          <v-col cols="12" md="2">
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
          >
          <template v-slot:[`item.no`]="{ item }">
              {{ numberInc + parseInt(tableData.items.indexOf(item)) + 1 }}.
            </template>
            <template
              v-for="header in headers.filter((header) =>
                header.hasOwnProperty('formatter')
              )"
              v-slot:[`item.${header.value}`]="{ value }"
            >
              {{ header.formatter(value) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                class="btn-actions"
                small
                color="warning"
                @click="handleEditItem(item)"
                title="Edit"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                class="btn-actions"
                x-small
                color="error"
                dark
                title="Delete User"
                @click="deleteItem(item)"
              >
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
              <v-btn
                class="btn-actions"
                x-small
                color="teal"
                title="Reset Password"
                dark
                @click="resetItem(item)"
              >
                <v-icon small> mdi-refresh </v-icon>
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
                <!-- <v-switch v-model="isem.isUtama" disabled></v-switch> -->
              </v-container>
            </template>
          </v-data-table>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { PAGE_SIZE } from "~/constants/global";
export default {
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
    idRole: {
      type: String,
      default: "",
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
  },
  data() {
    return {
      itemsPerPage: PAGE_SIZE,
      footerProps: { "items-per-page-options": [10, 20, 40, 50] },
      sortBy: [this.defaultSortBy],
      sortDesc: [false],
      filter: {
        q: "",
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.defaultSortBy,
        sortType: "asc",
      },
    };
  },
  computed: {
    numberInc() {
      var number = parseInt(this.filter.pageNumber - 1) * this.itemsPerPage;
      return number;
    }
  },
  methods: {
    handleApplyFilter() {
      const filter = Object.assign({}, this.filter);
      this.filter = {
        q: filter.q,
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.sortBy[0],
        sortType: this.sortDesc[0] == true ? "desc" : "asc",
        t: Date.now(),
        idRole: this.idRole,
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
    resetItem(item) {
      this.$emit("resetItem", item);
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
      this.idRole = "";
      this.filter = {
        pageNumber: 1,
        pageSize: this.itemsPerPage,
        q: "",
        sortBy: `${this.defaultSortBy} ,asc`,
        t: Date.now(),
        idRole: this.idRole,
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
    handleClearRole() {
      this.idRole = "";
      this.filter.idRole = this.idRole;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleChangeRole(x) {
      this.idRole = x;
      this.filter.idRole = this.idRole;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    }
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
