<template>
  <b-card>
    <!--<div slot="header">
      RaidenMap Location
      <div class="card-header-actions">
      </div>
    </div>-->
    <gmap-map :center="center"
              :zoom="11"
              style="height: 500px">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <b-link :href="infoLink" target="_blank">{{infoContent}}</b-link>
      </gmap-info-window>
      <gmap-marker :key="index"
                   v-for="(m, index) in markers"
                   :position="m.position"
                   :label="m.label"
                   :title="m.title"
                   :clickable="true"
                   :draggable="m.draggable"
                   :icon="{ url: ('/img/marker.svg')}"
                   @click="toggleInfoWindow(m, index)"></gmap-marker>
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
        center: { lat: 41.8719, lng: 12.5674 },
        markers: [],
        infoContent: '',
        infoLink: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
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
              position: { lat: item.latitude, lng: item.longitude },
              label: '',
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
    }
  }
</script>
