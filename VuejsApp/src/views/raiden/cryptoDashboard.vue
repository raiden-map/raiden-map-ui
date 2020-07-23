<template>
  <b-card-group row class="card-rows">
    <b-col class="col-9">
      <b-card>
        <highcharts :options="charts.options[0]"></highcharts>
      </b-card>
      <b-card>
        <highcharts :options="charts.options[1]"></highcharts>
      </b-card>
    </b-col>

    <b-col class="col-3" id="twitterrr">
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
import LineExample from "../charts/LineExample";
import { Tweet, Moment, Timeline } from "vue-tweet-embed";
import OmisegoChart from "../charts/OmisegoChart";

import { Chart } from "highcharts-vue";

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
            plotOptions: {
              areaspline: {
                fillOpacity: 0.5,
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
            plotOptions: {
              areaspline: {
                fillOpacity: 0.5,
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
                name: "N° Full Nodes",
                data: [15, 3, 94, 40, 26, 8, 90, 15, 3, 94, 40, 26],
                color: "#1aadce",
              },
              {
                name: "N° Light Client",
                data: [79, 50, 20, 85, 10, 70, 65, 79, 50, 20, 85, 10],
                color: "#dbdbdb",
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
  },

  methods: {
    reset() {
      //il parametro TimeLineKey, assegnato alla :key di <TimeLine> serve per refreschare il componente ogni volta che si cambia
      //voce di menù. Senza questo i parametri passati non si aggiornano e si vedrebbero sempre i tweet dello stesso account
      this.TimeLineKey += 1;
    },
  },

  watch: {},
};
</script>

<style>
/* .twitter-timeline {
  max-height: 700px; 
  height: 700px;
} */
</style>