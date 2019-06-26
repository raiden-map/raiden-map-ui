<script>
import { Bar, Line } from 'vue-chartjs'
import  CustomTooltips  from './tooltipstest'
  import { hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
  import axios from 'axios'
  import BarExample from './BarExample'

  export default {
      name:"OmisegoChart",
    components: {
      hexToRgba,
      CustomTooltips,
      BarExample
    },
    extends: Bar,

 


    mounted() {
      var dataset1=[];
       var dataset2=[];
       var datax=[];
       var key=localStorage.getItem('token');
            
         axios.get('TokenNetworkDelta.json')
        .then(resp => {
          var grdetailsadd=[];
             resp.data.TOKEN_NETWORK_DELTA.forEach(element => {
              if(element.key==key) {
                  var timestamp= element.datakey.timestamp;
                  var a= new Date(timestamp*1000);
                  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  var month = months[a.getMonth()];
                  var hour = a.getHours();
                  var min = a.getMinutes();
                  var sec = a.getSeconds();
                  if(hour==localStorage.getItem('positionX')){
                       datax.push(min+ "' : " +sec+ "''" );
                 
                  dataset1.push(element.datakey.openChannels);
                  dataset2.push(element.datakey.closedChannels);
                  }
              }  
             });
             
          var labelvalues=["HOUR/01","HOUR/02","HOUR/03","HOUR/04","HOUR/05","HOUR/06","HOUR/07","HOUR/08","HOUR/09","HOUR/10","HOUR/11","HOUR/12","HOUR/13","HOUR/14","HOUR/15","HOUR/16","HOUR/17","HOUR/18","HOUR/19","HOUR/20","HOUR/21","HOUR/22","HOUR/23","HOUR/24"];
          this.renderChart(
           


            {
              labels:datax,
              datasets: [
                {
                  label: 'Opened Channels',
                  backgroundColor: hexToRgba('#ADD8E6',90),
                  data: dataset1
                },
                 {
                   label: 'Closed Channels',
                   backgroundColor: hexToRgba('#D3D3D3', 90),
                   data: dataset2
                 }
              ],
            },
             {
              responsive: true,
              maintainAspectRatio: false,
              tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                  labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
                  }
                }
              },
              
              }
          )
        })
    },
    methods: {}
  }

</script>