import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import exportingInit from "highcharts/modules/exporting";
import NetworkGraph from 'highcharts/modules/networkgraph'

NetworkGraph(Highcharts)
Highcharts.addEvent(
  Highcharts.Series,
  'afterSetOptions',
  function (e) {
    var colors = Highcharts.getOptions().colors,
      i = 0,
      nodes = {};
    if (
      this instanceof Highcharts.seriesTypes.networkgraph &&
      e.options.id === 'kompetensi-jejaring'
    ) {
      e.options.data.forEach(function (link) {
        if (e.options.data[0].from == link.from) {
          // graph pertama
          nodes[link.from] = {
            id: link.from,
            marker: {
              radius: 10,
              symbol: "url(resources.png)",
              width: 70,
              height: 70
            },
          };
          if (link.relasi === "PERSON") {
            nodes[link.to] = {
              id: link.to,
              marker: {
                radius: 10,
                symbol: "url(person.png)",
                width: 30,
                height: 30
              },
            };
          } else if (link.relasi === "INSTITUTION") {
            nodes[link.to] = {
              id: link.to,
              marker: {
                radius: 20,
                symbol: "url(department.png)",
                width: 30,
                height: 30
              },
            };
          }
        } else {
          // jika network lebih dari 1 tingkat
          const relasi_after = e.options.data.find(e => e.to == link.from).relasi
          var marker_after = {
            radius: 10,
            color: "#8085e9"
          }
          if (relasi_after == "PERSON") {
            marker_after = {
              radius: 10,
              symbol: "url(person.png)",
              width: 30,
              height: 30
            }
          }
          if (relasi_after == "INSTITUTION") {
            marker_after = {
              radius: 10,
              symbol: "url(department.png)",
              width: 30,
              height: 30
            }
          }

          if (link.relasi === "PERSON") {
            nodes[link.from] = {
              id: link.from,
              marker: marker_after
            };
            nodes[link.to] = {
              id: link.to,
              marker: {
                radius: 10,
                symbol: "url(person.png)",
                width: 30,
                height: 30
              },
            };
          } else if (link.relasi === "INSTITUTION") {
            nodes[link.from] = {
              id: link.from,
              marker: marker_after
            };
            nodes[link.to] = {
              id: link.to,
              marker: {
                radius: 20,
                symbol: "url(department.png)",
                width: 30,
                height: 30
              },
            };
          }
        }
      });

      e.options.nodes = Object.keys(nodes).map(function (id) {
        return nodes[id];
      });
    }
  }
);
if (typeof Highcharts === 'object') {
  exportingInit(Highcharts)
}

Vue.use(HighchartsVue);