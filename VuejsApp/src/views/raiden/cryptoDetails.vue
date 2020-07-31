<template>
  <div>
    <div>
      <RaidenHeader
        :cryptoName="cryptoName"
        :cryptoIcon="cryptoIcon"
        :tokenLink="tokenLink"
        :headerFields="headerFields"
        ref="raidenHeaderRef"
        @showMap="mapVisibility = true, dashboardVisibility = false, paddingCardBody = 'padding: 0px'"
        @showDashboard="mapVisibility = false, dashboardVisibility = true, paddingCardBody = 'padding: 20px'"
      />
    </div>
    <div class="card-body" :style="paddingCardBody">
      <cryptoDashboard
        v-show="dashboardVisibility"
        :twitterName="twitterName"
        :tokenAddress="tokenAddress"
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
      tokenLink: "",
      headerFields: [],

      paddingCardBody: "padding: 20px",
    };
  },

  beforeUpdate() {},

  mounted() {
    //chiamo queste istruzioni dopo che sono stati caricati tutti i componenti della pagina
    //utilizzo Promise così da attendere che getData carichi tutte le variabili da passare ai componenti
    Promise.resolve(this.getData()).then((result) => {
      this.$refs.raidenHeaderRef.reset();
      this.$refs.cryptoDashboardRef.reset();
    });

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
    async getData() {
      this.mapVisibility = false;
      this.dashboardVisibility = true;

      this.paddingCardBody = "padding: 20px";

      var currentToken = JSON.parse(localStorage.getItem("currentToken"));

      this.cryptoName = currentToken.cryptoName;
      this.cryptoIcon = currentToken.cryptoIcon;
      this.twitterName = currentToken.twitterName;
      this.tokenAddress = currentToken.tokenAddress;
      this.tokenLink = currentToken.tokenLink;

      let self = this;
      var HeaderFields = [];

      await axios({
        method: "get",
        url:
          "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
          currentToken.tokenContract +
          "/market_chart/?vs_currency=usd&days=0",
      })
        .then((response) => {
          HeaderFields = {
            price: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(response.data.prices[0][1]),
            market_cap: new Intl.NumberFormat('de-DE').format(response.data.market_caps[0][1]),
            total_volume: new Intl.NumberFormat('de-DE').format(response.data.total_volumes[0][1]),
          };
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
        });
      
      this.headerFields = HeaderFields;
      
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
  // },

  // mounted() {
  // },

  created: function () {},

  watch: {
    $route: function (param) {
      //con $route dentro il watch riesco a intercettare il cambio pagina tramite l'id passato in get
      //in questo modo posso ricaricare i dati della pagina per ogni cryptovaluta

      //utilizzo Promise così da attendere che getData carichi tutte le variabili da passare ai componenti
      Promise.resolve(this.getData()).then((result) => {
        this.$refs.raidenHeaderRef.reset();
        this.$refs.cryptoDashboardRef.reset();
      });
    },
  },
};
</script>