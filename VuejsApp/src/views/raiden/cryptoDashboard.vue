<template>
  <b-card-group row class="card-rows">
    <b-col :class="Boolean(twitterName) ? 'col-9' : 'col-12'">
      <b-card v-show="false">
        <highcharts :options="charts.options[0]"></highcharts>
      </b-card>
      <b-card>
        <highcharts :options="charts.options[1]"></highcharts>
      </b-card>
    </b-col>

    <b-col class="col-3"  v-if="Boolean(twitterName)">
      <div class="card">
        <div class="card-body" style="padding:0px;">
          <div style="height: 750px; max-height: 750px;" id="twitterTimeline">
            <Timeline
              :key="TimeLineKey"
              :id="twitterName"
              :sourceType="sourceType"
              widget-class="mt-3"
              style="height: 700px; max-height: 700px; overflow:auto"
            ></Timeline>
          </div>
        </div>
      </div>
    </b-col>
  </b-card-group>
</template>

<script>
import nodiAperti from "./fakeNodiAperti";
import fakeElevationData from "./fakeElevationData";

import LineExample from "../charts/LineExample";
import { Tweet, Moment, Timeline } from "vue-tweet-embed";
import OmisegoChart from "../charts/OmisegoChart";

import { Chart } from "highcharts-vue";

import { _ } from "vue-underscore";
import axios from "axios";

export default {
  name: "cryptoDashboard",

  components: {
    LineExample,
    Tweet,
    Moment,
    Timeline,
    OmisegoChart,
    highcharts: Chart,
  },
  data() {
    return {
      componentKey: 0,
      sourceType: "profile",
      TimeLineKey: 0,
      openNodesItems: nodiAperti,
      elevationData: fakeElevationData,

      charts: {
        options: [
          {
            chart: {
              type: "areaspline",
            },
            title: {
              text: "Titolo",
            },
            legend: {
              align: "center",
              //verticalAlign: "top",
              //floating: true,
              borderWidth: 1,
              backgroundColor: "#FFFFFF",
            },
            xAxis: {
              categories: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              title: {
                text: "titolo asse X",
              },
              // plotBands: [
              //   {
              //     // visualize the weekend
              //     from: 4.5,
              //     to: 6.5,
              //     color: "rgba(68, 170, 213, .2)"
              //   }
              // ]
            },
            yAxis: {
              title: {
                text: "titolo asse Y",
              },
            },
            tooltip: {
              shared: true,
              valueSuffix: " units",
            },
            credits: {
              enabled: false,
            },
            // plotOptions: {
            //   areaspline: {
            //     fillOpacity: 0.5,
            //   },
            // },
            plotOptions: {
              area: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                  },
                  // stops: [
                  //     [0, highcharts.getOptions().colors[0]],
                  //     [1, highcharts.color(highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  // ]
                },
                marker: {
                  radius: 2,
                },
                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1,
                  },
                },
                threshold: null,
              },
            },

            colors: [
              "#2f7ed8", //blu
              "#0d233a", //nero
              "#8bbc21", //verde
              "#910000", //rosso
              "#1aadce", //celeste
              "#492970", //viola
              "#f28f43", //arancio
              "#77a1e5", //violetto
              "#c42525", //rosso
              "#a6c96a", //verde
            ],
            series: [
              {
                name: "N° Light Client",
                data: [79, 50, 20, 85, 10, 70, 65, 79, 50, 20, 85, 10],
                color: "#1aadce",
              },
              {
                name: "N° Full Nodes",
                data: [15, 3, 94, 40, 26, 8, 90, 15, 3, 94, 40, 26],
                color: "#dbdbdb",
              },
            ],
          },

          {
            chart: {
              //type: "area",
              type: "areaspline",
              //type: "line",
              //type: "spline",
              //type: "scatter",

              zoomType: "x",
              // panning: true,
              // panKey: "shift",
              // scrollablePlotArea: {
              //   minWidth: 600,
              // },
            },

            caption: {
              text: "trascina il mouse sull'asse x per fare zoom",
            },

            title: {
              text: "Channels Overview",
            },
            credits: {
              enabled: false,
            },
            xAxis: {
              type: "datetime",
            },

            yAxis: {
              title: {
                text: "channels",
              },
            },

            legend: {
              align: "center",
              //verticalAlign: "top",
              //floating: true,
              borderWidth: 1,
              backgroundColor: "#FFFFFF",
            },

            tooltip: {
              // headerFormat: "Distance: {point.x:.1f} km<br>",
              // pointFormat: "{point.y} m a. s. l.",
              // shared: true,
            },

            series: [
              {
                data: [],
                threshold: null,
                name: "Opened Channel",
                color: "#1aadce",
                marker: {
                  enabled: true,
                },
                // accessibility: {
                //   keyboardNavigation: {
                //     enabled: false,
                //   },
                // },
                // lineColor: Highcharts.getOptions().colors[1],
                // color: Highcharts.getOptions().colors[2],
                //fillOpacity: 0.5,
                // marker: {
                //   enabled: false,
                // },
              },
              {
                data: [],
                threshold: null,
                name: "Closed Channel",
                color: "#dbdbdb",
                marker: {
                  enabled: true,
                },
              },
            ],
          },
        ],
      },
    };
  },

  props: {
    twitterName: {
      type: String,
      default: null,
    },
    tokenAddress: {
      type: String,
      default: null,
    },
  },

  methods: {
    reset() {
      //il parametro TimeLineKey, assegnato alla :key di <TimeLine> serve per refreschare il componente ogni volta che si cambia
      //voce di menù. Senza questo i parametri passati non si aggiornano e si vedrebbero sempre i tweet dello stesso account
      this.TimeLineKey += 1;

      this.getDatiGrafico();
    },

    getDatiGrafico() {
      let self = this;
      this.charts.options[1].series[0].data = [];
      this.charts.options[1].series[1].data = [];

      axios({
        method: "get",
        url:
          "http://localhost:3000/api/token-network/channel-overview/" +
          this.tokenAddress,
      })
        .then(function (response) {
          _.each(response.data.openedChannel, function (item, index) {
            var data = [item.blockTimestamp, item.opened_channels_sum];

            self.charts.options[1].series[0].data.push(data);
          });

          _.each(response.data.closedChannel, function (item, index) {
            var data = [item.blockTimestamp, item.closed_channels_sum];

            self.charts.options[1].series[1].data.push(data);
          });
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
          //console.log(response);
        });

      // var dataGroup = _.groupBy(this.openNodesItems, "timeStamp");

      // let self = this;
      // _.each(this.elevationData, function (item, index) {
      //   self.charts.options[1].series[0].data.push(item);
      // });
    },
  },

  watch: {
    tokenAddress: function (param) {
      //this.getDatiGrafico();
    },
  },

  updated: function () {},
};
</script>

<style>
/* .twitter-timeline {
  max-height: 700px; 
  height: 700px;
} */
</style>