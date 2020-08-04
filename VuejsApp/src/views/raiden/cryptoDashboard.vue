<template>
  <b-card-group row class="card-rows">
    <b-col class="col-8">
      <!-- <b-card v-show="false">
        <highcharts :options="charts.options[0]"></highcharts>
      </b-card>-->
      <b-card>
        <highcharts :options="charts.options[0]" style="width:100%"></highcharts>
      </b-card>
    </b-col>
    <b-col class="col-4">
      <b-card class="text-center">
        <div class="h5 m-0">Token Network Address</div>
        <div>{{tokenAddress}}</div>
      </b-card>
      <b-card class="text-center">
        <div class="h5 m-0">Contract Address</div>
        <div>{{tokenContract}}</div>
      </b-card>
      <b-card>
        <b-row>
          <b-col class="col-6">
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Registered:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;1</span>
            </div>
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Opened Channels:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;3</span>
            </div>
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Closed Channels:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;5</span>
            </div>
          </b-col>
          <b-col class="col-6">
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Settled Channels:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;2</span>
            </div>
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Deposit:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;4</span>
            </div>
            <div>
              <span class="text-muted text-uppercase font-weight-bold font-xs">Withdrah:</span>
              <span class="text-uppercase font-weight-bold font-xs">&nbsp;6</span>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>

    <b-col class="col-8">
      <b-card class="text-center">
        <div class="text-muted text-uppercase font-weight-bold mb-3">Partecipants</div>

        <b-table
          :hover="false"
          :striped="true"
          :bordered="true"
          :small="true"
          :fixed="false"
          responsive="sm"
          :items="partecipants"
          :fields="fieldsPartecipants"
          :current-page="currentPage"
          :per-page="perPage"
        >
          <!-- <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
          </template>-->
        </b-table>
        <nav>
          <b-pagination
            :total-rows="getRowCount(partecipants)"
            :per-page="perPage"
            v-model="currentPage"
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons
          />
        </nav>
      </b-card>
    </b-col>

    <b-col class="col-4" v-if="Boolean(twitterName)">
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
      partecipants: [],

      charts: {
        options: [
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
                color: "#2F353A",
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

      fieldsPartecipants: [
        { key: "participant", label: "Registered" },
        { key: "count", label: "#Channels" },
        { key: "channel_identifiers", label: "ID Channel" },
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
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
    tokenContract: {
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
      this.getPartecipants();
    },

    getDatiGrafico() {
      let self = this;
      this.charts.options[0].series[0].data = [];
      this.charts.options[0].series[1].data = [];

      axios({
        method: "get",
        url:
          "http://localhost:3000/api/token-network/channel-overview/" +
          this.tokenAddress,
      })
        .then(function (response) {
          _.each(response.data.openedChannel, function (item, index) {
            var data = [item.blockTimestamp, item.opened_channels_sum];

            self.charts.options[0].series[0].data.push(data);
          });

          _.each(response.data.closedChannel, function (item, index) {
            var data = [item.blockTimestamp, item.closed_channels_sum];

            self.charts.options[0].series[1].data.push(data);
          });
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
          //console.log(response);
        });
    },

    getRowCount(items) {
      return items.length;
    },

    getPartecipants() {
      let self = this;
      this.partecipants = []

      axios({
        method: "get",
        url:
          "http://localhost:3000/api/token-network/participant-overview/" +
          this.tokenAddress,
      })
        .then(function (response) {
          _.each(response.data, function (item, index) {
            self.partecipants.push(item);
          });
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
          //console.log(response);
        });
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