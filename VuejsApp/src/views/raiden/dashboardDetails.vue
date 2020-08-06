<template>
  <b-card-group row class="card-rows">
    <b-col class="col-8">
      <!-- <b-card v-show="false">
        <highcharts :options="charts.options[0]"></highcharts>
      </b-card>-->
      <b-card>
        <highcharts :options="charts.options[0]" style="width:100%" :key="TimeLineKey"></highcharts>
      </b-card>

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

    <b-col class="col-4">
      <b-card class>
        <b-row>
          <strong class="h2 col-2 text-primary">{{this.openChannel}}</strong>
          <span class="h2 col-10">Open Channels</span>
          <strong class="h2 col-2 text-primary">{{this.closedChannel}}</strong>
          <span class="h2 col-10">Closed Channels</span>
          <strong class="h2 col-2 text-primary">{{this.settledChannel}}</strong>
          <span class="h2 col-10">Settled Channels</span>
        </b-row>
      </b-card>

      <b-card>
        <b-row>
          <b-col class="col-4">
            <div class="text-center">
              <span class="text-muted text-uppercase font-weight-bold font-xs">
                Token
                <br />Network
              </span>
              <div class="text-uppercase font-weight-bold h3">&nbsp;{{this.tokenNetwork}}</div>
            </div>
          </b-col>
          <b-col class="col-4">
            <div class="text-center">
              <span class="text-muted text-uppercase font-weight-bold font-xs">
                Unique
                <br />Account
              </span>
              <div class="text-uppercase font-weight-bold h3">&nbsp;{{this.uniqueAccount}}</div>
            </div>
          </b-col>
          <b-col class="col-4">
            <div class="text-center">
              <span class="text-muted text-uppercase font-weight-bold font-xs">
                AVG Channels
                <br />per account
              </span>
              <div class="text-uppercase font-weight-bold h3">&nbsp;{{this.avgChannels}}</div>
            </div>
          </b-col>
        </b-row>
      </b-card>

      <div class="card" v-if="Boolean(twitterName)">
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
      channelOverview: {
        channelClosed: 0,
        channelOpened: 0,
        channelSettled: 0,
        depositCount: 0,
        withdrawCount: 0,
        blockTimestamp: "",
      },

      tokenNetwork: 0,
      uniqueAccount: 0,
      avgChannels: 0,

      partecipants: [],
      fieldsPartecipants: [
        { key: "participant", label: "Address" },
        { key: "count", label: "#Channels" },
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,

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

      this.getPartecipants();
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
          self.openChannel =
            response.data.channelOpened - response.data.channelClosed;

          self.closedChannel =
            response.data.channelClosed - response.data.channelSettled;

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

    getPartecipants() {
      let self = this;
      this.partecipants = [];
      var part = [];

      axios({
        method: "get",
        url: "http://localhost:3000/api/token-network/participant-overview/",
      })
        .then(function (response) {
          var totChannels = 0;
          _.each(response.data, function (item, index) {
            part.push(item);
            totChannels += item.count;
          });

          self.partecipants = _.sortBy(part, "count").reverse();
          self.uniqueAccount = response.data.length;

          var AvgChannels = totChannels / response.data.length;
          self.avgChannels = AvgChannels.toFixed(2);

          self.tokenNetwork = self.$nTokens;
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