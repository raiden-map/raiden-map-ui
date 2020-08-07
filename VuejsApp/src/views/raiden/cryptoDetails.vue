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
        :tokenContract="tokenContract"
        ref="cryptoDashboardRef"
      />
      <!-- <mapLocation v-show="mapVisibility" /> -->
    </div>
  </div>
</template>

<script>
import cryptoData from "./fakeToken";

import cryptoDashboard from "./cryptoDashboard";
//import mapLocation from "./mapLocation";
import RaidenHeader from "./RaidenHeader";

import { _ } from "vue-underscore";
import axios from "axios";

export default {
  name: "cryptoDetails",
  components: {
    //mapLocation,
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
      tokenContract: "",
      tokenLink: "",
      headerFields: {
        price: 0,
        market_cap: 0,
        change24: 0,
        change24_perc: 0,
        total_volume: 0,
      },

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

      //serve per quando si carica la pagina la prima volta e non si passa dal metodo setActive in DefaultContainer
      if (JSON.parse(localStorage.getItem("currentToken")) == null) {
        await this.loadTokenData(this.$route.query.id);
      }

      var currentToken = JSON.parse(localStorage.getItem("currentToken"));

      this.cryptoName = currentToken.cryptoName;
      this.cryptoIcon = currentToken.cryptoIcon;
      this.twitterName = currentToken.twitterName;
      this.tokenAddress = currentToken.tokenAddress;
      this.tokenContract = currentToken.tokenContract;
      this.tokenLink = currentToken.tokenLink;

      let self = this;

      await axios({
        method: "get",
        url:
          "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
          currentToken.tokenContract, //+ "/market_chart/?vs_currency=usd&days=0",
      })
        .then((response) => {
          var price = response.data.market_data.current_price.usd;
          var market_cap = response.data.market_data.market_cap.usd;
          var change24 = response.data.market_data.price_change_24h;
          var change24_perc =
            response.data.market_data.price_change_percentage_24h;
          var total_volume = response.data.market_data.total_volume.usd;

          self.headerFields.price = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(price);
          self.headerFields.market_cap = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(market_cap);
          self.headerFields.change24 = change24.toFixed(3);
          self.headerFields.change24_perc = change24_perc.toFixed(2);
          self.headerFields.total_volume = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(total_volume);
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
        });
    },

    async loadTokenData(id) {
      //serve per quando si carica la pagina la prima volta e non si passa dal metodo setActive in DefaultContainer
      await axios({
        method: "get",
        url: this.$apiUrl + "token-network/info/" + id,
      })
        .then((response) => {
          console.log();

          var currentItem = {
            twitterName: response.data.twitterName,
            cryptoName: response.data.name,
            cryptoIcon: response.data.imgUrl,
            tokenAddress: response.data.tokenNetwork,
            tokenLink: response.data.homepage,
            tokenContract: response.data.contract,
            blockTimestamp: response.data.blockTimestamp,
          };

          localStorage.setItem("currentToken", JSON.stringify(currentItem));
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
        });
    },
  },

  // beforeMount() {
  // },

  // mounted() {
  // },

  created: function () {
    //serve per quando si carica la pagina la prima volta e non si passa dal metodo setActive in DefaultContainer
    //this.loadTokenData(this.$route.query.id);
  },

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