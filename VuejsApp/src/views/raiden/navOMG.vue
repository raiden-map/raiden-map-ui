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
           <div class="col-sm ">Price <p class="text-secondary">{{price}}</p></div>
             <div class="col-sm ">MarketCap <p class="text-secondary">{{marketcap}}</p></div>
            <div class="col-sm ">Change(24h)<p class="text-danger">{{change}}</p></div>
            <div class="col-sm ">Deposited<p class="text-secondary">{{deposit}}</p></div>
            <div class="col-sm ">LightClient<p class="text-secondary"></p></div>
            <div class="col-sm ">FullNodes <p class="text-secondary"></p></div>
          </div>
        </div>
        <div class="col">
          <button  class="bg-dark h15"  v-if="a" v-on:click="a= !a , b=!b" align="right">
            <i class="icon-globe icons font-xl"></i>
            Go To Map &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
          </button>
          <button  v-if="b" v-on:click="b= !b, a= !a " class="bg-dark xs" >
            <i class="cui-dashboard font-xl" aria-hidden="true"></i> Go To Dashboard
          </button>
           <button class="bg-dark h15"  align="right" @click="tokenprofile">
              <img src="../../../public/tokenicon.png"> 
             &nbsp;Token Profile&nbsp; &nbsp; &nbsp;
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <OmisegoMap  v-if="a" />
      <OmisegoMapLocation v-if="b"/>
    </div>
  </div>
</template>
<script>
import OmisegoMap from '../OmisegoMap'
import OmisegoMapLocation from '../OmisegoMapLocation'
import axios from 'axios'
export default {
    name: 'navOMG',
    components: {  OmisegoMapLocation , OmisegoMap },
    data() {
        return {
            a:true,
            b:false,
            price:'',
            deposit: '',
            marketcap:'',
            change:''
        }
    },
     mounted() {

      var key = localStorage.getItem('token');
      axios.get('TokenNetworkDelta.json')
        .then(resp => {
          resp.data.TOKEN_NETWORK_DELTA.forEach(element => {

            if (element.key == key) {
              this.price = element.datakey.token.valueBtc
              this.deposit = element.datakey.totalDeposit
              this.marketcap = element.datakey.token.marketCap
              this.change = element.datakey.token.priceChangeDayBtc
            }
          });
         
        })

    },
    methods:{
       
        tokenprofile (){
          if(localStorage.getItem('token')){
          this.$router.push('/tokenprofile')
          }
          else {
             this.$swal({
                type: 'error',
                title: 'No token key avaliable!',
                text: ' Please provide a token key to go to this page'})
          }
        }
    }
  
  
}
</script>