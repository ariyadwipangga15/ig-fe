<template>
  <v-container fluid>
    <v-card>
      <v-card-text class="py-0">
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
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  text
                  solo
                  flat
                  hide-details
                  clearable
                  class="mr-2"
                  append-icon="mdi-magnify"
                  :placeholder="searchTitle"
                  v-model="filter.q"
                  @keyup.enter="handleApplyFilter"
                  @click:append="handleApplyFilter"
                  @click:clear="handleClear"
                >
                </v-text-field>
                <v-btn icon @click="handleRefreshItems">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn icon @click="handleAddItem">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                class="btn-actions"
                small
                color="warning"
                @click="handleEditItem(item)"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                class="btn-actions"
                x-small
                color="error"
                dark
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
        page: 1,
        sortBy: this.defaultSortBy,
        sortType: "asc",
      },
    };
  },
  methods: {
    handleApplyFilter() {
      const filter = Object.assign({}, this.filter);
      this.filter = {
        q: filter.q,
        pageSize: this.itemsPerPage,
        page: 1,
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
      resetFilter.page = 1;
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
    handlePageChanged(page) {
      this.filter.page = page;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    updateFilterQuery(query) {
      const filter = Object.assign(this.filter, query);
      filter.page = parseInt(filter.page);
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
        page: 1,
        size: this.itemsPerPage,
        q: "",
        sort: `${this.defaultSortBy} ,asc`,
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
