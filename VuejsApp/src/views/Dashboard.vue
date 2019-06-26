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
            <div class="col-sm">ETH Value <p class="text-secondary">{{ ethValue }}</p></div>
            <div class="col-sm">Users<p class="text-secondary">{{ users }}</p></div>
            <div class="col-sm">Tokens<p class="text-secondary">{{ tokens }}</p></div>
          </div>
        </div>
        <div class="col">
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
      <RaidenMapLocation v-if="a" />
      <RaidenMap v-if="b" />
    </div>
  </div>
</template>
<script>
  import RaidenMap from './RaidenMap'
  import RaidenMapLocation from './RaidenMapLocation'
  import axios from 'axios'

  export default {
    name: 'Dashboard',
    components: { RaidenMapLocation, RaidenMap },
    data() {
      return {
        a: false,
        b: true,
        btcValue:'',
        ethValue:'',
        users:'',
        tokens:''
      }
    },
    created(){
       var key = localStorage.getItem('token');
      axios.get('RaidenDelta.json')
        .then(resp => {
          resp.data.RAIDEN_DELTA.forEach(element => {
            if (element.key == key) {
              this.btcValue = element.datakey.tokenNetworksChanges[key].token.valueBtc
              this.ethValue = element.datakey.tokenNetworksChanges[key].token.valueEth
              this.users = element.datakey.userCount
              this.tokens = element.datakey.tokenNetworksCount
            }
          });
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
