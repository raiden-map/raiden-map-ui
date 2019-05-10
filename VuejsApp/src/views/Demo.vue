<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="myMap"></div>
  </div>

</template>
<script src="https://maps.googleapis.com/maps/api/js?key=yourKey"></script>

<script>

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
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted: function () {
      console.log("map: ", google.maps)
      this.map = new google.maps.Map(document.getElementById('myMap'), {
        center: { lat: 61.180059, lng: -149.822075 },
        scrollwheel: false,
        zoom: 4
      })
    }

  }

</script>

<style scoped>
  #myMap {
    height: 300px;
    width: 100%;
  }
</style>
