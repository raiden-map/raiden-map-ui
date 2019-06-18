<template>
  <div>

    <div class="card-header bg-white">
      <div class="row">
        <div class="col h4">
          Raiden Network
        </div>
        <div class="col-7">
          <div class="row">
            <div class="col-sm ">BTC Value <p class="text-secondary"> {{ btcValue }} </p></div>
            <div class="col-sm">ETH Value <p class="text-secondary">123</p></div>
            <div class="col-sm">Users<p class="text-danger">-2.20%</p></div>
            <div class="col-sm">Tokens<p class="text-secondary">1523M</p></div>
          </div>
        </div>
        <div class="col">
          <!-- <a class="btn-dark" href="#" @click="change"  v-if="b"><i class="icon-globe"></i> Go To Map</a>
          <a class="btn-dark" href="#" @click="change2" v-if="a" ><i class="cui-dashboard"></i> Go To Dashboard</a> -->
          
           <button @click="change" class="bg-dark h15" v-if="b" align="right">
            <i class="icon-globe icons font-xl"></i>
            Go To Map
          </button>
          <button @click="change2" class="bg-dark xs" v-if="a">
            <i class="cui-dashboard font-xl" aria-hidden="true"></i> Go To Dashboard
          </button> 

        
        </div>
      </div>
    </div>

    <div class="card-body">
      <NetworkMapLocation v-if="a" />
      <NetworkMap v-if="b" />
    </div>
  </div>
</template>
<script>
  import NetworkMap from './NetworkMap'
  import NetworkMapLocation from './NetworkMapLocation'
  import axios from 'axios'

  export default {
    name: 'Dashboard',
    components: { NetworkMapLocation, NetworkMap },
    data() {
      return {
        a: false,
        b: true,
        btcValue: ''
      }
    },
    created(){
       axios.get(`RaidenSnapshot.json`)
        .then(response => {
         this.btcValue=response.data.states[0].btcValue;


        })
         .catch(e => {
          this.errors.push(e)
        })

    },

    methods: {
      change: function () {
        this.a = true,
          this.b = false
      },
      change2: function () {
        this.a = false,
          this.b = true

      }

    }
  }
</script>
