<template>
  <div>
    <div class="card-header bg-white">
      <div class="row">
        <div class="col h4">
           <img src="../../../public/img/OmiseGO-OMG-icon.png">
          OmiseGO
        </div>
        <div class="col-7">
          <div class="row">
           <div class="col-sm ">Price <p class="text-secondary">1235442</p></div>
            <div class="col-sm ">Market Cap <p class="text-secondary">123</p></div>
            <div class="col-sm ">Change(24h)<p class="text-danger">-2.20%</p></div>
            <div class="col-sm ">Deposited<p class="text-secondary">1523M</p></div>
            <div class="col-sm ">Light Client<p class="text-secondary">60000</p></div>
            <div class="col-sm ">Full Nodes <p class="text-secondary">2000</p></div>
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
import RaidenMap from '../RaidenMap'
import RaidenMapLocation from '../RaidenMapLocation'

export default {
    name: 'navOMG',
    components: { RaidenMapLocation ,RaidenMap },
    data() {
        return {
            a:false,
            b:true
        }
    },
    methods:{
        change: function (){
            this.a=true,
            this.b=false
        },
        change2: function(){
          this.a=false,
            this.b=true  

        }

    }
  
  
}
</script>
