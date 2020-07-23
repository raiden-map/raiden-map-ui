<template>
  <div>
    <div>
      <RaidenHeader
        :cryptoName="cryptoName"
        :cryptoIcon="cryptoIcon"
        ref="raidenHeaderRef"
        @showMap="mapVisibility = true, dashboardVisibility = false, paddingCardBody = 'padding: 0px'"
        @showDashboard="mapVisibility = false, dashboardVisibility = true, paddingCardBody = 'padding: 20px'"
      />
    </div>
    <div class="card-body" :style="paddingCardBody">
      <cryptoDashboard v-if="dashboardVisibility" 
        :twitterName="twitterName"
        ref="cryptoDashboardRef"/>
      <mapLocation v-if="mapVisibility" />
    </div>
  </div>
</template>

<script>
import cryptoData from "./fakeValue";

import cryptoDashboard from "./cryptoDashboard";
import mapLocation from "./mapLocation";
import RaidenHeader from "./RaidenHeader";

import { _ } from "vue-underscore";
import axios from "axios";

export default {
  name: "cryptoDetails",
  components: {
    mapLocation,
    cryptoDashboard,
    RaidenHeader
  },
  data() {
    return {
      mapVisibility: false,
      dashboardVisibility: true,
      price: "",
      deposit: "",
      marketcap: "",
      change: "",
      items: cryptoData,

      cryptoName: "",
      cryptoIcon: "",
      twitterName: "",

      paddingCardBody: 'padding: 20px'
    };
  },

  mounted() {
    var key = localStorage.getItem("token");
    axios.get("TokenNetworkDelta.json").then(resp => {
      resp.data.TOKEN_NETWORK_DELTA.forEach(element => {
        if (element.key == key) {
          this.price = element.datakey.token.valueBtc;
          this.deposit = element.datakey.totalDeposit;
          this.marketcap = element.datakey.token.marketCap;
          this.change = element.datakey.token.priceChangeDayBtc;
        }
      });
    });
  },

  methods: {
    getData(id) {      
      this.mapVisibility = false;
      this.dashboardVisibility = true;
      
      this.paddingCardBody = 'padding: 20px'

      var _id = parseInt(id);
      var crypto = _.findWhere(this.items, { _id: _id });

      this.cryptoName = crypto.name;
      this.cryptoIcon = require("../../../public/icon/" + crypto.icon);
      this.twitterName = crypto.twitterName
    },

    tokenprofile() {
      if (localStorage.getItem("token")) {
        this.$router.push("/tokenprofile");
      } else {
        this.$swal({
          type: "error",
          title: "No token key avaliable!",
          text: " Please provide a token key to go to this page"
        });
      }
    }
  },

  created() {
    this.getData(this.$route.query.id);
  },

  watch: {
    $route: function(param) {
      //con $route dentro il watch riesco a intercettare il cambio pagina tramite l'id passato in get
      //in questo modo posso ricaricare i dati della pagina per ogni cryptovaluta
      this.$refs.raidenHeaderRef.reset(); 
      this.$refs.cryptoDashboardRef.reset(); 
      this.getData(param.query.id);
    },
  }
};
</script>