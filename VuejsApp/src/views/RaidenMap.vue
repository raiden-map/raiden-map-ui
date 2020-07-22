<template>
  <b-card-group row class="card-rows">
    <b-card-group column class="card-colums" style="width:75%">
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2">
              <b-card style="height: 18rem;"></b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2">
              <b-card style="height: 20rem;">
                <RaidenNetworkChart @clicked="onClickChild" v-if="a" style="height: 20rem;" />
                <RaidenNetworkChart2 v-if="b" style="height: 16.8rem;" />
                <button class="btn-primary" v-if="b" @click="goback">
                  <i class="cui-arrow-left icons"></i>
                </button>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>

    <b-card style="width: 5rem;" class="fixed-row">
      <b-row row class="navbar-brand-full">
        <Timeline>
          <a
            class="twitter-timeline"
            href="https://twitter.com/raiden_network?lang=en"
            data-width="700"
            data-height="700"
          >Tweets by raiden_network</a>
        </Timeline>
      </b-row>
    </b-card>
  </b-card-group>
</template>

<script>
import RaidenNetworkChart from "./charts/RaidenNetworkChart";
import RaidenNetworkChart2 from "./charts/RaidenNetworkChart2";
import LineExample from "../views/charts/LineExample";
import { Tweet, Moment, Timeline } from "vue-tweet-embed";

export default {
  name: "RaidenMap",
  components: {
    LineExample,
    Tweet,
    Moment,
    Timeline,
    RaidenNetworkChart,
    RaidenNetworkChart2
  },
  data() {
    return {
      a: true,

      b: false,
      componentKey: 0
    };
  },
  methods: {
    onClickChild(event) {
      (this.a = false), (this.b = true);
    },
    goback() {
      (this.a = true), (this.b = false);
    }
  }
};
</script>