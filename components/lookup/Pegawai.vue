<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="1000px">
      <v-card>
        <v-card-title
          class="appcolor"
          style="color: white; padding-top: 10px; padding-bottom: 10px"
        >
          <span style="font-size: 18px; padding-right: 10px"
            >Lookup Pegawai</span
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="handleClose()" style="color: white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="7"></v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="filter.q"
                append-icon="mdi-magnify"
                label="Cari ( Tekan Enter )"
                @keyup.enter="handlePageChanged(1)"
                @click:append="handlePageChanged(1)"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <br />
          <template>
            <v-data-table
              style="cursor: pointer"
              :headers="headers"
              :items="data.items"
              :server-items-length="data.meta.totalItems"
              :items-per-page="itemsPerPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              @update:page="handlePageChanged"
              @update:items-per-page="getItemPerPage"
              :footer-props="footerProps"
              item-key="id"
              @click:row="handleClick"
            >
              <template v-slot:[`item.no`]="{ item }">
                {{ data.items.indexOf(item) + 1 }}.
              </template>
            </v-data-table>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="pa-1">
            <v-btn depressed @click.prevent="handleClose">Tutup </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";

@Component({
  layout: "admin",
})
export default class LookupPegawaiComponent extends Vue {
  public isLoading = false;
  public itemsPerPage = PAGE_SIZE;
  public page = 1;
  public previousPage = 1;
  public propOrder = "id";
  public reverse = false;
  public dialog = false;
  public selectedRow: any = {};

  public headers = [
    { text: "No", value: "no", align: "center", sortable: false, width: "3%" },
    { text: "NIP", value: "nip", width: "10%" },
    { text: "Nama", value: "nama", width: "20%" },
    { text: "Unit Kerja", value: "namaUnor", width: "15%" },
    { text: "Jabatan", value: "namaJabatan", width: "15%" },
  ];
  public data = {
    items: [],
    meta: {
      totalItems: 0,
    },
  };
  public defaultSortBy = "nama";
  public filter: any = {
    q: "",
    pageSize: this.itemsPerPage,
    pageNumber: 1,
    sortBy: this.defaultSortBy,
    sortType: "asc",
  };
  public footerProps = { "items-per-page-options": [5, 10, 20, 40, 50, 100] };
  public editedItem: any = {};
  public sortBy = [this.defaultSortBy];
  public sortDesc = [false];

  async loadData() {
    await this.loadAll();
    this.dialog = true;
  }
  handleClose(): void {
    this.handleResetFilter();
    this.dialog = false;
  }
  handleClick(row: any) {
    this.selectedRow = row;
    this.$emit("selectItem", this.selectedRow);
    this.handleClose();
  }
  handlePageChanged(page: any) {
    this.filter.pageNumber = page;
    this.filter.pageSize = this.filter.pageSize
      ? this.filter.pageSize
      : this.itemsPerPage;
    this.loadAll();
  }
  updateFilterQuery() {
    const filter = Object.assign(this.filter, {});
    filter.pageNumber = filter.page;
    filter.pageSize = filter.pageSize ? filter.pageSize : this.itemsPerPage;
    return filter;
  }
  handleResetFilter() {
    this.filter = {
      q: "",
      pageSize: this.itemsPerPage,
      pageNumber: 1,
      sortBy: this.sortBy[0],
      sortType: "asc",
    };
  }
  getItemPerPage(val: number) {
    this.itemsPerPage = +val;
    this.handleResetFilter();
    this.handlePageChanged(1);
  }

  @Watch("sortBy")
  @Watch("sortDesc")
  watchHandler() {
    this.handleSort();
  }
  handleSort() {
    if (this.sortBy.length > 0 && this.sortDesc.length > 0) {
      this.filter.sortBy = this.sortBy[0];
      this.filter.sortType = this.sortDesc[0] == true ? "desc" : "asc";
      this.loadAll();
    }
  }

  async loadAll() {
    this.isLoading = true;
    await this.$pegawaiService()
      .retrieve({
        q: this.filter.q,
        pageSize: this.filter.pageSize,
        pageNumber: this.filter.pageNumber,
        sortBy: this.filter.sortBy,
        sortType: this.filter.sortType,
      })
      .then((res: any) => {
        this.isLoading = false;
        this.data = {
          items: res.data != null ? res.data.items : [],
          meta: res.data.meta,
        };
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
</script>
