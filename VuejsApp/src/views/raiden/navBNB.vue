
<template >
    <div>
         <p>{{dataekoncertuar}}   </p>
          <p>{{datatest}}   </p>
      
        <div>
           <ol>
        <li :key="key" v-for="(item,key) in grdetails">{{ item }}</li>
         </ol>
        </div>
        <AppHeader fixed>
        </AppHeader>
         
        
         <!-- <p>{{data1}} </p> -->
        <Tweet id="692527862369357824">
              <div class="spinner-border text-primary" role="status">
                 
                 </div>
        </Tweet>
          <Tweet id="14"></Tweet>	
          <p>{{data2}}   <i class='crypto-icon btc'></i>
          <i class='crypto-icon color btc'></i></p>
          <button @click="emerfunc"> klik</button>
           <button @click="merrdata"> merrdata</button>
      
    </div>
</template>

<script>
import DefaultContainer from "../../containers/DefaultContainer"
import axios from 'axios'

import { Tweet, Moment, Timeline } from 'vue-tweet-embed'

export default {
    name: 'navBNB',
    
    components:{
        Tweet

    },
    data(){
        return{
           
            grdetails:[],
            dataekoncertuar:0,
            datatest:[]
            
           
          
        }
    },
    mounted() {
       this.data1=this.a;
    }
    

    ,
    created(){
     
       this.data2=this.a;
        var i=1;
        var index="data"+i+"2";
        axios.get('test2.json').then( resp=> {
        this.data=resp.data.TOKEN_NETWORK_DELTA[0].index.openChannels 
          
          })
          
    },
    methods:{
        emerfunc(){
            var key=localStorage.getItem('token')
            
           axios.get('RaidenDelta.json')
          .then(resp =>  {
              var grdetailsadd=[];
             resp.data.RAIDEN_DELTA.forEach(element => {
              if(element.key==key) {
                  var timestamp= element.datakey.timestamp;
                  var a= new Date(timestamp*1000);
                  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  var month = months[a.getMonth()];
                   var hour = a.getHours();
                  grdetailsadd.push({
                      hour: hour,
                      openChannels: element.datakey.tokenNetworksChanges[key].openChannels,
                      closedChannels: element.datakey.tokenNetworksChanges[key].closedChannels


                  })
              }  
             });
             this.grdetails=grdetailsadd;
            
          })
         
         
        },
        merrdata(){
            var data1=[{"data":1,"name":"paula"},
            {"data":5,"name":"jkl"},
            {"data":2,"name":"kula"},
             {"data":2,"name":"kula2"}];
            var data2=[];
            
            data1.forEach(element=>{
                data2[element.data-1]=element.name
            })
            ;
            this.datatest=data2;

        }
       
    }
}
    
</script>

