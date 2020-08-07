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
      <dashboardDetails
        v-show="dashboardVisibility"
        :twitterName="twitterName"
        :tokenAddress="tokenAddress"
        :tokenContract="tokenContract"
        ref="dashboardDetailsRef"
      />
      <!-- <mapLocation v-show="mapVisibility" /> -->
    </div>
  </div>
</template>

<script>
import cryptoData from "./fakeToken";

import dashboardDetails from "./dashboardDetails";
//import mapLocation from "./mapLocation";
import RaidenHeader from "./RaidenHeader";

import { _ } from "vue-underscore";
import axios from "axios";

export default {
  name: "cryptoDetails",
  components: {
    //mapLocation,
    dashboardDetails,
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

  mounted() {
    //chiamo queste istruzioni dopo che sono stati caricati tutti i componenti della pagina
    //utilizzo Promise così da attendere che getData carichi tutte le variabili da passare ai componenti
    
    Promise.resolve(this.getData()).then((result) => {
      this.$refs.raidenHeaderRef.reset();
      this.$refs.dashboardDetailsRef.reset();
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
    async getData(id) {
      this.mapVisibility = false;
      this.dashboardVisibility = true;

      this.paddingCardBody = "padding: 20px";

      //serve per quando si carica la pagina la prima volta e non si passa dal metodo setActive in DefaultContainer
      if (JSON.parse(localStorage.getItem("currentToken")) == null) {
        var currentItem = {
          twitterName: "raiden_network",
          cryptoName: "Raiden Network",
          cryptoIcon: "",
          tokenAddress: "",
          tokenLink: "https://raiden.network/",
          tokenContract: "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
          blockTimestamp: "",
        };

        localStorage.setItem("currentToken", JSON.stringify(currentItem));
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

    // tokenprofile() {
    //   if (localStorage.getItem("token")) {
    //     this.$router.push("/tokenprofile");
    //   } else {
    //     this.$swal({
    //       type: "error",
    //       title: "No token key avaliable!",
    //       text: " Please provide a token key to go to this page",
    //     });
    //   }
    // },
  },

  // beforeMount() {
  // },

  // created() {
  //   console.log('create')
  //   Promise.resolve(this.getData()).then((result) => {
  //     this.$refs.raidenHeaderRef.reset();
  //     this.$refs.dashboardDetailsRef.reset();
  //   });
  // },

  watch: {
    $route: function (param) {
      //con $route dentro il watch riesco a intercettare il cambio pagina tramite l'id passato in get
      //in questo modo posso ricaricare i dati della pagina per ogni cryptovaluta
      //utilizzo Promise così da attendere che getData carichi tutte le variabili da passare ai componenti
      // console.log('watch')
      // Promise.resolve(this.getData()).then((result) => {
      //   this.$refs.raidenHeaderRef.reset();
      //   this.$refs.dashboardDetailsRef.reset();
      // });
    },
  },
};
</script>