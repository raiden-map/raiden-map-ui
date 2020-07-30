<template>
  <div>
    <div>
      <RaidenHeader
        :cryptoName="'Raiden Network'"
        :cryptoIcon="''"
        :tokenLink="tokenLink"
        :headerFields="[]"
        ref="raidenHeaderRef"
        @showMap="mapVisibility = true, dashboardVisibility = false, paddingCardBody = 'padding: 0px'"
        @showDashboard="mapVisibility = false, dashboardVisibility = true, paddingCardBody = 'padding: 20px'"
      />
    </div>
    <div class="card-body" :style="paddingCardBody">
      <cryptoDashboard
        v-show="dashboardVisibility"
        :twitterName="'raiden_network'"
        ref="cryptoDashboardRef"
      />
      <mapLocation v-show="mapVisibility" />
    </div>
  </div>
</template>

<script>
import cryptoData from "./fakeToken";

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
    RaidenHeader,
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
      tokenAddress: "",

      paddingCardBody: "padding: 20px",
    };
  },

  mounted() {
    //chiamo queste istruzioni dopo che sono stati caricati tutti i componenti della pagina
    this.$refs.raidenHeaderRef.reset();
    this.$refs.cryptoDashboardRef.reset();
    this.getData(this.$route.query.id);

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
    getData(id) {
      this.mapVisibility = false;
      this.dashboardVisibility = true;

      this.paddingCardBody = "padding: 20px";

      //var crypto = _.findWhere(this.items, { _id: id });

      var currentToken = JSON.parse(localStorage.getItem("currentToken"));

      this.cryptoName = currentToken.cryptoName;
      this.cryptoIcon = currentToken.cryptoIcon;
      this.twitterName = currentToken.twitterName;
      this.tokenAddress = currentToken.tokenAddress;
      this.tokenLink = currentToken.tokenLink;
    },

    tokenprofile() {
      if (localStorage.getItem("token")) {
        this.$router.push("/tokenprofile");
      } else {
        this.$swal({
          type: "error",
          title: "No token key avaliable!",
          text: " Please provide a token key to go to this page",
        });
      }
    },
  },

  // beforeMount() {
  //   this.getUnits();
  // },

  // mounted() {
  //   this.$refs.raidenHeaderRef.reset();
  //   this.$refs.cryptoDashboardRef.reset();
  //   console.log($route);
  //   //this.getData(param.query.id);
  // },

  watch: {
    $route: function (param) {
      //con $route dentro il watch riesco a intercettare il cambio pagina tramite l'id passato in get
      //in questo modo posso ricaricare i dati della pagina per ogni cryptovaluta
      this.$refs.raidenHeaderRef.reset();
      this.$refs.cryptoDashboardRef.reset();
      this.getData(param.query.id);
    },
  },
};
</script>