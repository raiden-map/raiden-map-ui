<template>
  <b-card-group row class="card-rows">
    <b-card-group column class="card-colums" style="width:75%">
      <b-container>
        <b-row>
          <b-col>
            <div class="card mb-2" >
              <b-card style="height: 20rem;" >
               
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
                <line-example @clicked="onClickChild" v-if="a" style="height: 20rem;" chartId="chart-line-01"  />
                <OmisegoChart  v-if="b" style="height: 16.8rem;" />
                <button  class="btn-primary" v-if="b" @click="goback"> <i class="cui-arrow-left icons "></i> </button>
               
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>

    <b-card style="width: 7rem;">
      <b-row row class="navbar-brand-full" >
        <Timeline>
         <a class="twitter-timeline"
          href="https://twitter.com/omise_go?lang=en"
       data-width="700"
          data-height="700">
     Tweets by omise_go
               </a>
                 
         </Timeline>	
        	

       

      </b-row>
      
</b-card>
  </b-card-group>
</template>

<script>
  import LineExample from '../charts/LineExample'
  import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
  import OmisegoChart from '../charts/OmisegoChart'

  export default {
      name: 'cryptoDashboard',
    
      components: {
      LineExample,
      Tweet,
      Moment,
      Timeline,
      OmisegoChart

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