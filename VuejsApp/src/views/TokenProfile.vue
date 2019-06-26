<template>
<div>
<div class="card-header bg-white">
      <div class="row">
        <div class="col h4 ">
          <img src="../../public/tokennetwork.png"> 
          Token Profile
        </div>
        <div class="col-7">
          <div class="row">
           
          </div>
        </div>
      </div>
      
    </div>
    <div >
        <b-card-body
            header-tag="header"
            footer-tag="footer">
           
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Name
                <b-badge variant="primary" pill>{{name}}</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
               Value USD
                <b-badge variant="primary" pill>{{valueBtc}}</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Value ETH
                <b-badge variant="primary" pill>{{valueEth}}</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Value BTC
                <b-badge variant="primary" pill>{{valueUsd}}</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Volume
                <b-badge variant="primary" pill>{{volume}}</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Channels
                <b-badge variant="primary" pill>{{channelsCount}}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
      
    </div>
   </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'TokenProfile',
    components: { },
    data() {
      return {
          name:"",
          valueUsd:0,
          valueEth:0,
          valueBtc:0,
          volume:0,
          channelsCount:0
       
      }
    },
    created() {
     
       var key=localStorage.getItem('token');
            
         axios.get('TokenNetworkDelta.json')
        .then(resp => {
         
             resp.data.TOKEN_NETWORK_DELTA.forEach(element => {
              if(element.key==key) {
                  this.name=element.datakey.token.name,
                  this.valueUsd=element.datakey.token.valueUsd,
                   this.valueEth=element.datakey.token.valueEth,
                    this.valueBtc=element.datakey.token.valueBtc,
                     this.volume=element.datakey.token.volume,
                      this.channelsCount=element.datakey.channelsCount
                 
                 
              }  
             });
             
         
          
        })
    },

  }
</script>
