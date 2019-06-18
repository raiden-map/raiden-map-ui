<template>
  <div class="app  bg-white">
    <div class="app-body bg-white">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />

      <AppSidebar fixed class="ss">
        <SidebarHeader>
          <b-row row class="navbar-brand-full">
            <div class="b" align="left">
              &nbsp;&nbsp;&nbsp;
              <img src="../../public/img/raiden-map logo.png" width="25" height="25" alt="CoreUI Logo">
              &nbsp;
            </div>
            <div class="a" align="right">
              <h5> Token Networks </h5>
              <br />
            </div>
            <br />
          </b-row>
          <b-row row class="navbar-brand-full">
            <div class="b" align="left">
              &nbsp;&nbsp;
              
              <input type="text"  v-model="tokenkey" placeholder="Search"><button @click="TokenSearch" class="bg-dark"><i class='fa fa-search'></i></button>
            
            </div>
          </b-row>

        </SidebarHeader>
        <SidebarForm />

        <SidebarNav :navItems="nav">
          <div class="app-body bg-white">
          </div>
        </SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />

      </AppSidebar>
      <main class="main">
        <div class="align-content-xl-center  bg-white">
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
  import Vue from 'vue'
  import axios from 'axios'
  import nav from '@/_nav'
  import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
  import DefaultAside from './DefaultAside'
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
  import LineExample from '../views/charts/LineExample'
  export default {
    name: 'DefaultContainer',
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
      SidebarMinimizer
    },
    data() {
      return {
        nav: []
      }
    },
    computed: {
      name() {
        return this.$route.name
      },
      list() {
        return this.$route.matched.filter((route) => route.name || route.meta.label)
      }
    },
    methods: {
      navData() {
        this.nav = nav.items;
        axios.get('data.json').then(response => {
          this.nav[0].name = response.data.endpoints[0].ethAddress;
        });

      },
    
      TokenSearch(){
        localStorage.setItem('token',this.tokenkey );
         window.location.reload()
        
      }

    },

    created: function () {
      this.navData();

    }
  };
 
</script>
<style>

</style>
