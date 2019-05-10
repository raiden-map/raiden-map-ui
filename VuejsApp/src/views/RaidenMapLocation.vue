<template>
  <b-card>

    <gmap-map :center="center"
              :zoom="4"
              style="height:700px;position: relative;">

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <b-link :href="infoLink" target="_blank">{{infoContent}}</b-link>

      </gmap-info-window>

      <gmap-info-window @closeclick="window_open=false" :opened="window_open" :position="infowindow" :options="infoOptions">
        <b-table class="mb-0-table-outline" responsive="sm" hover :items="tableItems" :fields="tableFields" head-variant="light">

          <i slot="flag" class="h4 mb-0" :class="flag(item.value.flag)" slot-scope="item" :title="item.value.flag" :id="item.value.flag"></i>

          <div slot="state" slot-scope="item">
            <p>{{item.value.name}}</p>

          </div>

          <div slot="eth" slot-scope="item">

            <p>{{item.value.name}}</p>

          </div>

        </b-table>
      </gmap-info-window>

      <gmap-marker :key="index"
                   v-for="(m, index) in markers"
                   :position="m.position"
                   :label="m.label"
                   :title="m.title"
                   :clickable="true"
                   :draggable="m.draggable"
                   :icon="{ url: ('/img/marker.svg'),size: {width:23, height: 23, f: 'px', b: 'px'},scaledSize: {width: 23, height: 23, f: 'px', b: 'px'}}"
                   @click="toggleInfoWindow(m, index)">
      </gmap-marker>

      <gmap-marker :key="index"
                   v-for="(m, index) in markers_table"
                   :position="m.position"
                   :clickable="true"
                   :draggable="m.draggable"
                   :icon="{ url: ('/img/table_show.svg'),size: {width:23, height: 23, f: 'px', b: 'px'},scaledSize: {width: 23, height: 23, f: 'px', b: 'px'}}"
                   @click="toggleInfoWindow1(m, index)">
      </gmap-marker>




      <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#000000'}">
      </gmap-polyline>
      <gmap-polyline v-bind:path.sync="path1" v-bind:options="{ strokeColor:'#000000'}">
      </gmap-polyline>
      <gmap-polyline v-bind:path.sync="path2" v-bind:options="{ strokeColor:'#000000'}">
      </gmap-polyline>

    </gmap-map>



    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </b-card>
</template>
<script>

  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'
  import axios from 'axios';




  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'
      // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
      // v: 'OPTIONAL VERSION NUMBER',
      // libraries: 'places', //// If you need to use place input
    }
  })

  export default {
    name: 'google-maps',
    

    data() {
      return {
        center: { lat: 49.50917427824771, lng: 15.202471799531395 },
        path: [

          { lat: 40.416842, lng: -3.645264 },
          { lat: 41.980725, lng: 1.212882 },
          { lat: 45.308893, lng: 9.202146 }

        ],
        path1: [
          { lat: 52.375600, lng: -8.964852 },
          { lat: 45.308893, lng: 9.202146 },
          { lat: 40.858694, lng: 29.089600 }
        ],
        path2: [
          { lat: 45.308893, lng: 9.202146 },
          { lat: 49.679003, lng: 14.941402 },
          { lat: 60.099909, lng: 39.023429 }
        ],
        tableItems: [
          {
            flag: { name: 'Italy', flag: 'it' },
            state: { name: 'Italy' },
            eth: { name: '2' }
          },
          {
            flag: { name: 'Ireland', flag: 'ir' },
            state: { name: 'Ireland' },
            eth: { name: '2' }
          },
          {
            flag: { name: 'Russia', flag: 'rs' },
            state: { name: 'Russia' },
            eth: { name: '9' }
          }
         
        ],
        tableFields: {
          flag: {
            flag: '',
            label:'Node Map'
          }
          , state: {
            label: '',
            state: 'text-right'
          }
          , eth: {
            label: '',
            state: 'text-right'
          }
          },

        markers: [],
        markers_table: [],

        infoContent: '',
        infoLink: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infowindow: {
          lat: 50,
          lng: 50
        },
        infoWinOpen: false,
        windows_open:false,
        currentMidx: null,
        currentMidx1: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        errors: []
      }
    },

    created() {
      axios.get(`data.json`)
        .then(response => {

          var listMarkers = [];
          response.data.endpoints.forEach(function (item) {
            listMarkers.push({
              position: { lat: item.latitude-0.6, lng: item.longitude },
              label: '' + item.ethAddress,
              draggable: false,
              title: item.ipAddress,
              www: 'https://www.ip-tracker.org/locator/ip-lookup.php?ip=' + item.ipAddress
            });
          });
          this.markers = listMarkers;


        })
        .catch(e => {
          this.errors.push(e)
        })

    },

    mounted() {

      axios.get(`data.json`)
        .then(response => {

          var Markers_table = [];
          response.data.endpoints.forEach(function (item) {
            Markers_table.push({
              position: { lat: 60.099909, lng: 50.023429 },
              draggable: false
            });
          });

          this.markers_table = Markers_table;

        })

        .catch(e => {
          this.errors.push(e)
        })

    },

    methods: {
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position
        this.infoContent = marker.title
        this.infoLink = marker.www
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
          this.currentMidx = idx
          this.infoWinOpen = true
        }
      }
      ,

      toggleInfoWindow1: function (marker, idx) {
      this.infowindow = marker.position

        if (this.currentMidx1 === idx) {
          this.windows_open = !this.windows_open
        } else {
          this.currentMidx1 = idx
          this.windows_open = true
        }
      }

      ,
      flag(value) {
        return 'flag-icon flag-icon-' + value
      }
    }
  }



 
</script>

<style>
  .mb-0-table-outline {
    max-width: 800px;
  }


</style>
