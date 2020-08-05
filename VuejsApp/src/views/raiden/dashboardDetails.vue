<template>
  <b-card-group row class="card-rows">
    <b-col class="col-8">
      <!-- <b-card v-show="false">
        <highcharts :options="charts.options[0]"></highcharts>
      </b-card>-->
      <b-card>
        <highcharts :options="charts.options[0]" style="width:100%" :key="TimeLineKey"></highcharts>
      </b-card>
    </b-col>

    <b-col class="col-4" v-if="Boolean(twitterName)">
      <b-card class>
        <div class="h3 m-0">
          <strong class="text-primary">{{this.openChannel}}</strong> Open Channels
        </div>
        <div class="h3 m-0">
          <strong class="text-primary">{{this.closedChannel}}</strong> Closed Channels
        </div>
        <div class="h3 m-0">
          <strong class="text-primary">{{this.settledChannel}}</strong> Settled Channels
        </div>
      </b-card>

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
  name: "dashboardDetails",

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
      channelOverview: {
        channelClosed: 0,
        channelOpened: 0,
        channelSettled: 0,
        depositCount: 0,
        withdrawCount: 0,
        blockTimestamp: "",
      },

      openChannel: 0,
      closedChannel: 0,
      settledChannel: 0,

      charts: {
        options: [
          {
            chart: {
              type: "variablepie",
            },
            title: {
              text: "#Channels",
            },
            tooltip: {
              headerFormat: "",
              pointFormat:
                '<span style="color:{point.color}">\u25CF</span> {point.name} <b>{point.y}</b>',
            },

            series: [
              {
                minPointSize: 10,
                innerSize: "60%",
                zMin: 0,
                dataLabels: {
                  formatter: function () {
                    return "<b>" + this.point.name + ":</b> " + this.y;
                  },
                },
                data: [
                  {
                    name: "Open Channels",
                    y: 0,
                    z: 300,
                    color: "#2F353A",
                  },
                  {
                    name: "Closed Channels",
                    y: 0,
                    z: 300,
                    color: "#c7c3c9",
                  },
                  {
                    name: "Settled Channels",
                    y: 0,
                    z: 300,
                    color: "#8A818F",
                  },
                ],
              },
            ],
          },
        ],
      },

      fieldsPartecipants: [
        { key: "participant", label: "Address" },
        { key: "count", label: "#Channels" },
      ],
      currentPage: 1,
      perPage: 10,
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
      //voce di menù. Senza questo i parametri passati non si aggiornano e si vedrebbero sempre i tweet dello stesso account.
      //---la utilizzo anche nel componente highchart così se faccio zoom sul grafico di un token, quando cambio pagine, il grafico viene refreshato
      this.TimeLineKey += 1;
    },

    getRowCount(items) {
      return items.length;
    },

    getDatiGrafico() {
      let self = this;

      axios({
        method: "get",
        url:
          "http://localhost:3000/api/token-network/channel-overview/" +
          this.tokenAddress,
      })
        .then(function (response) {
          self.openChannel = response.data.channelOpened;
          self.closedChannel = response.data.channelClosed;
          self.settledChannel = response.data.channelSettled;

          var result = _.findWhere(self.charts.options[0].series[0].data, {
            name: "Open Channels",
          });
          result.y = self.openChannel;

          var result = _.findWhere(self.charts.options[0].series[0].data, {
            name: "Closed Channels",
          });
          result.y = self.closedChannel;

          var result = _.findWhere(self.charts.options[0].series[0].data, {
            name: "Settled Channels",
          });
          result.y = self.settledChannel;
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
          //console.log(response);
        });
    },
  },

  //watch: {  },

  updated: function () {
    this.getDatiGrafico();
  },
};
</script>

<style>
/* .twitter-timeline {
  max-height: 700px; 
  height: 700px;
} */
</style>