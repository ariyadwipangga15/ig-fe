<template>
  <v-container fluid>
    <v-card>
      <v-row
        style="
          padding-left: 1%;
          padding-right: 1%;
          padding-top: 1%;
          padding-bottom: 0%;
        "
        no-gutters
      >
        <v-col
          cols="12"
          md="2"
          style="padding-top: 1%; padding-right: 1%; padding-bottom: 0%"
        >
          <v-menu
            class="mr-0 ml-0"
            ref="menuTglAwal"
            v-model="menuTglAwal"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                class="mr-0 ml-0"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-model="computedTanggalAwal"
                v-on="on"
                hide-details="auto"
                outlined
                dense
                color="appcolor"
              />
            </template>
            <v-date-picker
              no-title
              scrollable
              @change="changeTglAwal"
              v-model="tglAwal"
              @input="menuTglAwal = false"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          md="2"
          style="padding-top: 1%; padding-right: 1%; padding-bottom: 0%"
        >
          <v-menu
            class="mr-0 ml-0"
            ref="menuTglAkhir"
            v-model="menuTglAkhir"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                class="mr-0 ml-0"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-model="computedTanggalAkhir"
                v-on="on"
                hide-details="auto"
                outlined
                dense
                color="appcolor"
              />
            </template>
            <v-date-picker
              no-title
              scrollable
              @change="changeTglAkhir"
              v-model="tglAkhir"
              @input="menuTglAkhir = false"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          md="4"
          style="padding-top: 1%; padding-right: 1%; padding-bottom: 0%"
        >
          <v-autocomplete
            v-model="idItem"
            :items="listItem"
            item-value="id"
            item-text="nama"
            hide-details="auto"
            label="Komoditas"
            placeholder="Pilih Komoditas"
            outlined
            dense
            clearable
            @change="changeItem($event)"
            color="appcolor"
          >
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="4"
          style="padding-top: 1%; padding-right: 1%; padding-bottom: 0%"
        >
          <v-autocomplete
            v-model="idGudang"
            :items="listGudang"
            :readonly="disableGudang"
            item-value="id"
            item-text="nama"
            hide-details="auto"
            label="Gudang"
            placeholder="Pilih Gudang"
            outlined
            dense
            :clearable="!disableGudang"
            @change="changeGudang($event)"
            color="appcolor"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <highcharts type="column" :options="chartOption"> </highcharts>
    </v-card>
  </v-container>
</template>
<script>
import { tanggal } from "~/mixins/tanggal";
import { mapGetters } from "vuex";
export default {
  mixins: [tanggal],
  data() {
    return {
      menuTglAwal: false,
      menuTglAkhir: false,
      tglAwal: "",
      tglAkhir: "",
      idGudang: "",
      idItem: "",
      dataKomoditas: [],
      dataColli: [],
      dataBruto: [],
      dataNetto: [],
      listItem: [],
      listGudang: [],
      chartOption: {
        chart: {
          renderTo: "container",
          type: "column",
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25,
          },
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            enabled: false,
          },
        },
        tooltip: {
          headerFormat: "<b>{point.key}</b><br>",
          pointFormat: "Colli: {point.y}",
        },
        title: {
          text: "Jumlah Stock Barang",
          align: "center",
        },
        subtitle: {
          text:
            "Source: " +
            '<a href="https://ofv.no/registreringsstatistikk"' +
            'target="_blank">OFV</a>',
          align: "center",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}",
            },
          },
          column: {
            depth: 25,
            colors: [
              "#51b5ce",
              "#89c733",
              "#54a329",
              "#2f7ed8",
              "#0d233a",
              "#8bbc21",
              "#910000",
              "#1aadce",
              "#492970",
              "#f28f43",
              "#77a1e5",
              "#c42525",
              "#a6c96a",
            ],
          },
        },
        series: [
          {
            data: [],
          },
        ],
        credits: {
          enabled: false,
        },
      },
      disableGudang: false,
    };
  },

  async created() {
    this.tglAwal = new Date().toISOString().substring(0, 10);
    this.tglAkhir = new Date().toISOString().substring(0, 10);

    this.idGudang = this.userLogin.id_gudang;
    await this.loadGudang();
    this.loadAllItem();
    this.loadData();
  },

  computed: {
    ...mapGetters({
      userLogin: "auth/user",
    }),
    computedTanggalAwal() {
      return this.formatDatePicker(this.tglAwal);
    },
    computedTanggalAkhir() {
      return this.formatDatePicker(this.tglAkhir);
    },
  },

  methods: {
    formatDatePicker(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    loadData() {
      this.chartOption.xAxis.categories = [];
      this.chartOption.series = [];
      this.dataStok = [];
      this.chartOption.subtitle.text =
        "Tanggal " +
        this.computedTanggalAwal +
        " - " +
        this.computedTanggalAkhir;
      this.$dashboardService()
        .retrieveStok({
          tgl_awal: this.tglAwal,
          tgl_akhir: this.tglAkhir,
          id_gudang: this.idGudang,
          id_item: this.idItem,
        })
        .then((res) => {
          this.dataKomoditas = res.data;
          for (let index = 0; index < this.dataKomoditas.length; index++) {
            const element = this.dataKomoditas[index];
            this.chartOption.xAxis.categories.push(
              element.nama_komoditas + " - " + element.nama_gudang
            );
            this.dataStok.push(parseInt(element.stock));
          }

          this.chartOption.series.push({
            name: "Colli",
            data: this.dataStok,
          });

          this.$forceUpdate();
        });
    },
    loadAllItem() {
      this.$penerimaanService()
        .retrieveAllitem()
        .then((res) => {
          this.listItem = res.data ? res.data : [];
        });
    },
    loadGudang() {
      this.$penerimaanService()
        .retrieveGudang()
        .then((res) => {
          this.listGudang = res.data ? res.data : [];
          if (this.userLogin.id_gudang != null) {
            this.disableGudang = true;
          }
        });
    },
    changeGudang(x) {
      this.idGudang = x;
      this.loadData();
    },
    changeItem(x) {
      this.idItem = x;
      this.loadData();
    },
    changeTglAwal() {
      this.tglAwal = this.tglAwal;
      this.loadData();
    },
    changeTglAkhir() {
      this.tglAkhir = this.tglAkhir;
      this.loadData();
    },
  },
};
</script>
