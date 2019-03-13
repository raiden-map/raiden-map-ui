<template>
  <div class="row">
    <div class="col-md-10">
      <b-card>
        <!--<div slot="header">
          RaidenMap
          <div class="card-header-actions">
          </div>
        </div>-->
        <div id="line-chart">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-2">
                  <div class="blueBox"></div>
                </div>
                <div class="col-md-9">N&#176; Bitcoin</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-2">
                  <div class="redBox"></div>
                </div>
                <div class="col-md-9">N&#176; Ethereum</div>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-md-2 col-xs-12" id="no-margin">
      <!--<twitter>
        <a class="twitter-timeline" href="https://twitter.com/raiden_network">Tweets by realDonaldTrump</a>
      </twitter>-->
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import Vue from 'vue';
  import axios from 'axios';
  //import twitter from 'vue-twitter'

  //Vue.use(twitter)

  export default {}
  let vue = new Vue({
    el: '#line-chart',
    data() {
      return {
        data: [],
        dataRed: [],
        width: 1020,
        height: 500
      }
    },
    created() {
      this.renderChart()
      axios.get(`/data.json`)
        .then(response => {
          var dataArray = [];
          var dataArrayRed = [];
          response.data.states.forEach(function (item) {
            dataArray.push({ date: vue.convertTimestamp(item.timestamp), close: item.btcValue  });
            dataArrayRed.push({ date: vue.convertTimestamp(item.timestamp), close: item.ethValue });
          });
          this.data = dataArray;
          this.dataRed = dataArrayRed;
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      convertTimestamp(timestamp) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var date = new Date(timestamp);
        var formatted = date.getDate() + "-" + (monthNames[date.getMonth()]) + "-" + date.getYear();
        return formatted;
      },
      renderChart() {
        if (document.getElementsByTagName('svg')) {
          d3.selectAll('svg').remove()
        }
        var data = this.data;
        var dataRed = this.dataRed;
        var margin = { top: 20, right: 50, bottom: 20, left: 50 }
        var width = this.width - margin.left - margin.right;
        var height = this.height - margin.top - margin.bottom;
        var parseTime = d3.timeParse('%d-%b-%y');

        // parse the date / time
        var parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the area
        var area = d3.area()
          .x(function (d) { return x(d.date); })
          .y0(height)
          .y1(function (d) { return y(d.close); });

        // define the line
        var valueline = d3.line()
          .x(function (d) { return x(d.date); })
          .y(function (d) { return y(d.close); });

        var svg = d3.select("#line-chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // format the data
        data.forEach(function (d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
        });

        dataRed.forEach(function (d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
        });

        // scale the range of the data
        var maxVal = data;
        if (Math.max.apply(Math, dataRed.map(function (o) { return o.close; })) > Math.max.apply(Math, data.map(function (o) { return o.close; }))) {
          maxVal = dataRed;
        }
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, d3.max(maxVal, function (d) { return d.close; })]);

        // add the area
        svg.append("path")
          .data([data])
          .attr("class", "area")
          .attr("d", area);

        // add the valueline path.
        svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);

        svg.append("path")
          .data([dataRed])
          .attr("class", "area2")
          .attr("d", area);

        // add the valueline path.
        svg.append("path")
          .data([dataRed])
          .attr("class", "line2")
          .attr("d", valueline);

        // add the X Axis
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // add the Y Axis
        svg.append("g")
          .call(d3.axisLeft(y));
      },
    },
    watch: {
      data(val) {
        if (val) {
          this.renderChart()
        }
      }
    }
  })
</script>
<style>
  .line {
    fill: none;
    stroke: rgb(0, 0, 128);
    stroke-width: 2px;
  }

  .area {
    fill: rgba(0, 0, 128, 0.2);
  }

  .line2 {
    fill: none;
    stroke: rgb(255, 0, 0);
    stroke-width: 2px;
  }

  .area2 {
    fill: rgba(255, 0, 0, 0.1);
  }

  .blueBox {
    border: 1.5px solid rgb(0, 0, 128);
    background-color: rgba(0, 0, 128, 0.2);
    width: 40px;
    height: 100%;
  }

  .redBox {
    border: 1.5px solid rgb(255, 0, 0);
    background-color: rgba(255, 0, 0, 0.1);
    width: 40px;
    height: 100%;
  }

  .currentColor {
    color: #000;
  }

  #no-margin {
    margin: 0 !important;
    padding: 0 !important;
    max-height: 605px;
    overflow-y: scroll;
  }

  #no-margin::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 15px;
    background-color: #F5F5F5;
  }

  #no-margin::-webkit-scrollbar {
    width: 5px;
    background-color: #555555;
  }

  #no-margin::-webkit-scrollbar-thumb {
    border-radius: 15px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #656565;
  }

  #no-margin::-webkit-scrollbar-thumb:hover {
    background-color: #000000;
  }

</style>
