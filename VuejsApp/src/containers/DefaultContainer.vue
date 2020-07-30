<template>
  <div class="app bg-white">
    <!-- <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
    <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav> 
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownNotif/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownTasks/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownMssgs/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdown/>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
      <AsideToggler class="d-lg-none" mobile />
    </AppHeader>-->

    <div class="app-body bg-white">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#"></b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <AppSidebar fixed class="ss">
        <SidebarHeader>
          <b-row row class="navbar-brand-full" style="margin-left: 20px; margin-bottom: 10px">
            <a
              href="#/dashboard"
              style="text-decoration: none; color: white"
              v-on:click="setActive(-1)"
            >
              <img
                src="../../public/img/raiden-map logo.png"
                width="25"
                height="25"
                alt="Token Logo"
                style="margin-right: 5px;"
              />
              <span style="font-size:20px;">Token Networks</span>
            </a>
          </b-row>
          <b-row row class="navbar-brand-full">
            <b-input-group style="margin-left:10px;margin-right:10px">
              <b-form-input type="text" placeholder="Search" v-model="tokenkey"></b-form-input>
              <!-- Attach Right button -->
              <b-input-group-append>
                <b-button variant="secondary" @click="TokenSearch">
                  <i class="fa fa-search"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-row>
        </SidebarHeader>

        <SidebarForm />

        <!-- <SidebarNav :navItems="nav"></SidebarNav> -->

        <nav class="sidebar-nav">
          <ul class="nav">
            <li class="nav-item" v-for="(item, index) in items" v-bind:key="index">
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
                  <div
                    style="margin-top:10px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active) }"
                  >${{item.price}}</div>
                  <!-- <div
                    style="margin-top:10px"
                    class="col-3"
                    v-bind:class="{ 'font-weight-bold': Boolean(item._active), 'text-danger': item.v2 <= 0, 'text-success': item.v2 > 0 }"
                  >{{item.v2}}%</div>-->
                </div>
              </a>
            </li>
          </ul>
        </nav>

        <SidebarFooter />
        <!-- <SidebarMinimizer /> -->
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
      nav: [],
      dangerModal: false,
      tokenkey: "",

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
  },

  beforeUpdate: function () {
    let self = this;

    //il codice qua sotto si attiva quando refresho la pagina selezionando la voce di menù corrispondente all'id che ho nell'url
    var result = _.findWhere(this.items, { _id: this.$route.query.id });
    if (result != undefined) {
      this.setActive(result);
    }
  },

  methods: {
    navData() {
      let self = this;
      var dati = [];

      axios({
        method: "get",
        url: "http://localhost:3000/api/token-network/info",
      })
        .then(function (response) {
          _.each(response.data, function (item, i) {
            //recupero il prezzo dei Token utilizzando un Promise, così che i dati vengano caricati tutti nello stesso momento
            Promise.resolve(self.getCryptoPrice(item)).then((result) => {
              item.price = result;
              dati.push(item);
            });
          });

          self.items = dati;
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
        };

        localStorage.setItem("currentToken", JSON.stringify(currentItem));
      }
      else{
        //valorizzare currentItem anche qui con i dati di Raiden Network?
      }
    },

    TokenSearch() {
      var haskey = false;
      axios.get("TokenNetworkDelta.json").then((resp) => {
        resp.data.TOKEN_NETWORK_DELTA.forEach((element) => {
          if (element.key == this.tokenkey) {
            this.haskey = true;
          }
        });
        if (this.haskey) {
          localStorage.setItem("token", this.tokenkey);
          window.location.reload();
        } else {
          this.tokenkey = "";
          localStorage.removeItem("token");
          this.$swal({
            type: "error",
            title: "This key was not found!",
            text: " Please insert the correct key.",
          });
        }
      });
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
</style>
