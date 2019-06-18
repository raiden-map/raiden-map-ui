<template>
  <b-card-group row class="card-rows">
    <b-card-group column class="card-colums" style="width:75%">
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2">
              <b-card style="height: 18rem;">
                
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2">
              <b-card style="height: 18rem;">
               <TokenNetworkChart2    style="height: 18rem;" />
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>

    <b-card style="width: 5rem;" class="fixed-row">
      <b-row row class="navbar-brand-full ">

        <img src="../../public/img/Twitter.png" width="35" height="35">
        &nbsp;<h7> Tokenetwork</h7> &nbsp; &nbsp; <a href="#" class="card-link">tokenetwork.com</a>

      </b-row>
       <b-row style="width: 5rem;">
        <Tweet id="692527862369357824" style="width: 5rem;">
              <div class="spinner-border text-primary  " role="status">
                 
                 </div>
        </Tweet>
             
       
          
        </b-row>
        
</b-card>
  </b-card-group>
</template>

<script>
import TokenNetworkChart2 from "./charts/TokenNetworkChart2"
  import LineExample from '../views/charts/LineExample'
  import { Tweet, Moment, Timeline } from 'vue-tweet-embed'

  export default {
    name: 'RaidenMap',
    components: {

      LineExample,Tweet, Moment, Timeline ,
      TokenNetworkChart2

    }
  }
</script>