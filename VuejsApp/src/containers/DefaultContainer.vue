<template >
  <div class="app bg-white" v-if="mobile == false">
    <div class="app-body bg-white">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <SidebarToggler class="d-md-down-none" display="lg" />
      <AppSidebar fixed class="ss">
        <SidebarHeader>
          <div row class="navbar-brand-full" style="margin-left: 15px; margin-bottom: 10px">
            <a
              href="#/dashboard"
              style="text-decoration: none; color: white"
              v-on:click="setActive(-1)"
            >
              <b-row>
                <div class="col-3 m-0 p-0 mt-2">
                  <img
                    src="../../public/img/raiden-map logo.png"
                    width="60"
                    height="60"
                    alt="Token Logo"
                    style="margin-right: 5px; margin-bottom: 6px;"
                  />
                </div>
                <div class="col-9 text-left mt-2">
                  <div style="font-size:24px;">RaidenMap</div>
                  <div style="font-size:11px;">the Raiden Network Analyzer</div>
                </div>
              </b-row>
            </a>
          </div>
          <b-row row class="navbar-brand-full">
            <b-input-group style="margin-left:10px;margin-right:10px">
              <b-form-input type="text" placeholder="Search" v-model="tokenkey"></b-form-input>
              <b-input-group-append>
                <b-input-group-text>
                  <i class="fa fa-search"></i>
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-row>
        </SidebarHeader>

        <SidebarForm />

        <!-- <SidebarNav :navItems="nav"></SidebarNav> -->
        <nav class="sidebar-nav">
          <ul class="nav" id="myUL">
            <li class="nav-item" v-for="(item, index) in filteredList" v-bind:key="index">
              <a
                class="nav-link"
                :href="'#/cryptoDetails/?id=' + item._id"
                :class="Boolean(item._active) ? 'active' : ''"
                v-on:click="setActive(item)"
              >
                <div class="row" v-bind:class="{ 'pl-20': Boolean(item._active) }">
                  <div style="padding: 0px; text-align: center" class="col-2">
                    <img :src="item.imgUrl" width="20" />
                    <br />
                    <small
                      v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                      style="text-transform: uppercase"
                    >{{item.symbol}}</small>
                  </div>
                  <div
                    style="margin-top:10px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                  >{{item.name}}</div>
                  <!-- <div
                    style="margin-top:10px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                  >${{item.price}}</div>-->

                  <!-- <div
                    style="margin-top:10px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active), 'text-danger': item.v2 <= 0, 'text-success': item.v2 > 0 }"
                  >{{item.v2}}%</div>-->
                </div>
              </a>
            </li>
            <li class="nav-item" v-show="noResult">
              <span style="margin-left:15px;">
                <i>no result</i>
              </span>
            </li>
          </ul>
        </nav>

        <SidebarFooter />
        <!-- <SidebarMinimizer /> -->

        <a href="http://www.vivido.it" style="text-decoration: none" target="_blank">
          <span class="text-muted text-uppercase font-weight-bold font-xs ml-1">Powered by</span>
          <img src="../../public/icon/vivido.png" class="ml-1" style="margin-bottom:5px" width="45" />
        </a>
      </AppSidebar>
      <main class="main">
        <div class="align-content-xl-center bg-white">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside />
      </AppAside>
    </div>

    <!--<TheFooter>-->
  </div>

  <!-- -------------------------------------MOBILE------------------------------------- -->

  <div class="app bg-white text-center" v-else>
    <div class="app-body bg-white mt-0 mb-5">
      <div style="width:55px; height:1px">&nbsp;</div>
      
      <AppSidebar fixed class="ss" style="height:100% ">
        <SidebarHeader>
          <div row class="navbar-brand-full" style="margin-left: 15px; margin-bottom: 10px">
            <a
              href="#/dashboard"
              style="text-decoration: none; color: white"
              v-on:click="setActive(-1)"
            >
              <b-row>
                <div class="col-3 m-0 p-0 mt-2">
                  <img
                    src="../../public/img/raiden-map logo.png"
                    width="60"
                    height="60"
                    alt="Token Logo"
                    style="margin-right: 5px; margin-bottom: 6px; margin-left:190px"
                  />
                </div>
              </b-row>
            </a>
          </div>
        </SidebarHeader>

        <SidebarForm />

        <!-- <SidebarNav :navItems="nav"></SidebarNav> -->
        <nav class="sidebar-nav">
          <ul class="nav" id="myUL">
            <li class="nav-item" v-for="(item, index) in filteredList" v-bind:key="index">
              <a
                class="nav-link"
                :href="'#/cryptoDetails/?id=' + item._id"
                :class="Boolean(item._active) ? 'active' : ''"
                v-on:click="setActive(item)"
              >
                <div class="row" v-bind:class="{ 'pl-20': Boolean(item._active) }">
                  <div style="padding: 0px; text-align: center; margin-left:200px" class="col-2">
                    <img :src="item.imgUrl" width="20" />
                    <br />
                    <small
                      v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                      style="text-transform: uppercase"
                    >{{item.symbol}}</small>
                  </div>
                  <div
                    style="margin-top:10px; margin-left:200px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                  ></div>
                </div>
              </a>
            </li>
            <li class="nav-item" v-show="noResult">
              <span style="margin-left:15px;">
                <i>no result</i>
              </span>
            </li>
          </ul>
        </nav>

        <SidebarFooter />
        <!-- <SidebarMinimizer /> -->

        <a href="http://www.vivido.it" style="text-decoration: none; margin-left:200px" target="_blank">
          <span class="text-muted text-uppercase font-weight-bold ml-1" style="font-size: 8px;">Powered by</span>
          <img src="../../public/icon/vivido.png" class="ml-1" style="margin-bottom:5px" width="45" />
        </a>
      </AppSidebar>
      <main class="main">
        <div class="align-content-xl-center bg-white">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside />
      </AppAside>
    </div>

    <!-- <div>
      <img
        src="../../public/img/raiden-map logo.png"
        width="100"
        height="100"
        alt="Token Logo"
        class="text-center mb-3"
      />
    </div>
    <span>We are really sorry, but our website is not yet accessible by mobile devices.</span>
    <span class="mt-2">You can visit raidenmap.io from your computer.</span>-->
  </div>
</template>

<script>
import cryptoData from "../views/raiden/fakeToken";

import Vue from "vue";
import axios from "axios";
import { _ } from "vue-underscore";

import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb,
} from "@coreui/vue";

import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import LineExample from "../views/charts/LineExample";
import { isMobile } from "mobile-device-detect";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
  },

  data() {
    return {
      mobile: isMobile,
      nav: [],
      dangerModal: false,
      tokenkey: "",
      noResult: false,

      //items: cryptoData,
      items: [],
    };
  },

  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        (route) => route.name || route.meta.label
      );
    },
    filteredList() {
      var resultExist = false;

      return this.items.filter((item) => {
        //questo if-else serve a mostrare la label "nessun risultato"
        if (
          item.name.toLowerCase().includes(this.tokenkey.toLowerCase()) ==
            false &&
          resultExist == false
        ) {
          this.noResult = true;
        } else {
          this.noResult = false;
          resultExist = true;
        }

        return item.name.toLowerCase().includes(this.tokenkey.toLowerCase());
      });
    },
  },

  // beforeUpdate: function () {
  //
  // },

  methods: {
    navData() {
      let self = this;
      var dati = [];

      axios({
        method: "get",
        url: this.$apiUrl + "token-network/info",
      })
        .then(function (response) {
          _.each(response.data, function (item, i) {
            //recupero il prezzo dei Token utilizzando un Promise, così che i dati vengano caricati tutti nello stesso momento
            // Promise.resolve(self.getCryptoPrice(item)).then((result) => {
            //   item.price = result;
            //   dati.push(item);

            //   //imposto l'elemento come selezionato (ha senso solo quando viene refreshata la pagina)
            //   if (item._id == self.$route.query.id) self.setActive(item);
            // });

            dati.push(item);

            //imposto l'elemento come selezionato (ha senso solo quando viene refreshata la pagina)
            if (item._id == self.$route.query.id) self.setActive(item);
          });

          self.items = _.sortBy(dati, "name");
          Vue.prototype.$nTokens = dati.length;
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
        });

      //nbaldini
      //quello sotto è codice obsoleto?
      // axios.get('data.json').then(response => {
      //   this.nav[0].name = response.data.endpoints[0].ethAddress;
      // });
    },

    async getCryptoPrice(item) {
      let self = this;
      var price = 0.0;

      await axios({
        method: "get",
        url:
          "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
          item.contract +
          "/market_chart/?vs_currency=usd&days=0",
      })
        .then((response) => {
          price = response.data.prices[0][1];
        })
        .catch((e) => {
          console.log("CATCH");
          console.log(e);
        });

      return price.toFixed(2);
    },

    setActive(item) {
      var result = _.findWhere(this.items, { _active: "_active" });
      if (result != undefined) this.$set(result, "_active", "");

      if (item != -1) {
        this.$set(item, "_active", "_active");

        var currentItem = {
          twitterName: item.twitterName,
          cryptoName: item.name,
          cryptoIcon: item.imgUrl,
          tokenAddress: item.tokenNetwork,
          tokenLink: item.homepage,
          tokenContract: item.contract,
          blockTimestamp: item.blockTimestamp,
        };
      } else {
        var currentItem = {
          twitterName: "raiden_network",
          cryptoName: "Raiden Network",
          cryptoIcon: "",
          tokenAddress: "",
          tokenLink: "https://raiden.network/",
          tokenContract: "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
          blockTimestamp: "",
        };
      }

      localStorage.setItem("currentToken", JSON.stringify(currentItem));
    },
  },

  created: function () {
    this.navData();
  },

  watch: {},
};
</script>

<style>
.sidebar .nav-link.active {
  color: #000000;
  background: #fff;
}
.sidebar .nav-link.active:hover .nav-icon {
  color: #20a8d8;
}
.sidebar .nav {
  width: 270px;
}
.sidebar .sidebar-nav {
  width: 270px;
}
.sidebar .sidebar-scroll {
  width: 270px;
}
.sidebar-fixed .sidebar {
  width: 270px;
}
.sidebar {
  width: 270px;
}
.pl-20 {
  padding-left: 20px;
}

.sidebar-min .nav {
  width: 50px;
}
.sidebar-min .sidebar-nav {
  width: 50px;
}
.sidebar-min .sidebar-scroll {
  width: 50px;
}
.sidebar-min-fixed .sidebar {
  width: 50px;
}
.sidebar-min {
  width: 50px;
}
</style>
