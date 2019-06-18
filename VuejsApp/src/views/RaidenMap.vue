<template>
  <b-card-group row class="card-rows">
    <b-card-group column class="card-colums" style="width:75%">
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2" >
              <b-card style="height: 20rem;" >
                <line-example @clicked="onClickChild" v-if="a" style="height: 20rem;" chartId="chart-line-01"  />
                <DetailedChartOMG  v-if="b" style="height: 16.8rem;" />
                <button  class="btn-primary" v-if="b" @click="goback"> <i class="cui-arrow-left icons "></i> </button>
              </b-card>
              
             
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2">
              <b-card style="height: 20rem;">
               
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>

    <b-card style="width: 5rem;">
      <b-row row class="navbar-brand-full">

        <img src="../../public/img/Twitter.png" width="35" height="35">
        &nbsp;<h7> OmiseGO </h7> &nbsp; &nbsp; <a href="#" class="card-link">omisego.com</a>

      </b-row>
       <b-row style="width: 5rem;">
         <Tweet id="783943172057694208"  style="width: 5rem;">
           <div class="spinner-border text-primary  " role="status">
                 
                 </div>
         </Tweet>
          <Tweet id="14"></Tweet>
        </b-row>
</b-card>
  </b-card-group>
</template>

<script>
  import LineExample from '../views/charts/LineExample'
  import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
  import DetailedChartOMG from '../views/charts/DetailedChartOMG'
  import EventBus from '../event-bus'

  export default {
      name: 'RaidenMap',
    
      components: {

      LineExample,Tweet, Moment, Timeline ,DetailedChartOMG

      },
       data(){
      return{
       a: true, 
       
        b: false,
        componentKey: 0
       }
     },
      methods: {
      onClickChild(event) {
          this.a = false,
            this.b = true
        },
        goback(){
          this.a=true,
          this.b=false
        }
    }
    }
   
   
  
</script>