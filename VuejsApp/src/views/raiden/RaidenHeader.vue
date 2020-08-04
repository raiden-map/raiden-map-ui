<template >
  <div class="row">
    <div class="col h4 col-2">
      <div style="margin-left:15px;margin-top:15px;">
        <a :href="tokenLink" target="blank" style="text-decoration:none; color:black; ">
          <img :src="cryptoIcon" width="32" style="margin-right:10px" />
          {{cryptoName}}
        </a>
      </div>
    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-sm" style="text-align:center">
          Price
          <p class="text-secondary">{{headerFields.price}}</p>
        </div>
        <div class="col-sm" style="text-align:center">
          Market Cap
          <p class="text-secondary">{{headerFields.market_cap}}</p>
        </div>
        <div class="col-sm" style="text-align:center">
          Change (24h)
          <p :class="headerFields.change24 < 0 ? 'text-danger' : 'text-success'">
            <small>
              <i :class="headerFields.change24 < 0 ? 'fa fa-level-down' : 'fa fa-level-up'"></i>
              {{headerFields.change24_perc}}%
            </small>
            <br />
            {{headerFields.change24}}
          </p>
        </div>
        <div class="col-sm" style="text-align:center">
          Total Volume
          <p class="text-secondary">{{headerFields.total_volume}}</p>
        </div>
        <!-- <div class="col-sm" style="text-align:center">
          Deposited
          <p class="text-secondary">{{deposit}}</p>
        </div>
        <div class="col-sm" style="text-align:center">
          Users
          <p class="text-secondary"></p>
        </div>-->
      </div>
    </div>
    <!-- <div class="col-2">
      <button class="bg-dark h15" align="right" @click="tokenprofile">
        <img src="../../../public/tokenicon.png" />
        Token Profile
      </button>
    </div>-->
    <div class="col-2" style="text-align: right">
      <b-button
        block
        variant="dark"
        class="btn-square"
        v-on:click="mapButtonVisibility = false, dashboardButtonVisibility = true, showMap()"
        v-show="mapButtonVisibility"
        style="height:70px; vertical-align: middle;"
      >
        <i class="fa fa-globe fa-2x"></i>
        Go To Map
      </b-button>
      <b-button
        block
        variant="dark"
        class="btn-square"
        v-on:click="mapButtonVisibility = true, dashboardButtonVisibility = false, showDashboard()"
        v-show="dashboardButtonVisibility"
        style="height:70px; vertical-align: middle; margin-top: 0px"
      >
        <i class="fa fa-line-chart fa-2x"></i>
        <span>Go To Dashboard</span>
      </b-button>
    </div>
    <div class="col-12" style="vertical-align: top;">
      <hr style="margin:0" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RaidenHeader",
  components: {},
  data() {
    return {
      a: true,
      b: false,
      price: "",
      deposit: "",
      marketcap: "",
      change: "",
      mapButtonVisibility: false, //mettere a true per vedere il bottone
      dashboardButtonVisibility: false,
    };
  },
  props: {
    cryptoName: {
      type: String,
      default: null,
    },
    cryptoIcon: {
      type: String,
      default: null,
    },
    tokenLink: {
      type: String,
      default: null,
    },
    headerFields: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // var key = localStorage.getItem("token");
    // axios.get("TokenNetworkDelta.json").then((resp) => {
    //   resp.data.TOKEN_NETWORK_DELTA.forEach((element) => {
    //     if (element.key == key) {
    //       this.price = element.datakey.token.valueBtc;
    //       this.deposit = element.datakey.totalDeposit;
    //       this.marketcap = element.datakey.token.marketCap;
    //       this.change = element.datakey.token.priceChangeDayBtc;
    //     }
    //   });
    // });
  },
  methods: {
    showDashboard() {
      this.$emit("showDashboard");
    },

    showMap() {
      this.$emit("showMap");
    },

    tokenprofile() {
      // if (localStorage.getItem("token")) {
      //   this.$router.push("/tokenprofile");
      // } else {
      //   this.$swal({
      //     type: "error",
      //     title: "No token key avaliable!",
      //     text: " Please provide a token key to go to this page",
      //   });
      // }
    },

    reset() {
      this.mapButtonVisibility = false, //mettere a true per vedere il bottone
      this.dashboardButtonVisibility = false;
    },
  },
};
</script>