<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
  import { hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
  import axios from 'axios'


  export default {
    components: {
      hexToRgba,
      CustomTooltips
    },
    extends: Line,
    mounted() {
      var dataset1 = [];
      var dataset2 = [];
      var key = localStorage.getItem('token');
     axios.get('RaidenDelta.json')
        .then(resp => {
          var grdetailsadd = [];
          resp.data.RAIDEN_DELTA.forEach(element => {
            if (element.key == key) {
              var timestamp = element.datakey.timestamp;
              var a =new Date(timestamp * 1000);
              var hour = a.getHours();
              grdetailsadd.push({
                hour: hour,
                openChannels:
                  element.datakey.tokenNetworksChanges[key].openChannels,
                closedChannels:
                  element.datakey.tokenNetworksChanges[key].closedChannels
              });
              grdetailsadd.forEach(element => {
                dataset1[element.hour - 1] = element.openChannels,
                  dataset2[element.hour - 1] = element.closedChannels
              });
            }

          });

          var labelvalues = ["HOUR/01", "HOUR/02", "HOUR/03", "HOUR/04", "HOUR/05", "HOUR/06", "HOUR/07", "HOUR/08", "HOUR/09", "HOUR/10", "HOUR/11", "HOUR/12", "HOUR/13", "HOUR/14", "HOUR/15", "HOUR/16", "HOUR/17", "HOUR/18", "HOUR/19", "HOUR/20", "HOUR/21", "HOUR/22", "HOUR/23", "HOUR/24"];

          this.renderChart(

            {

              labels: labelvalues,
              datasets: [
                {
                  label: 'Open Channels',
                  backgroundColor: hexToRgba('#ADD8E6', 90),
                  data: dataset1
                },
                {
                  label: 'Closed Channels',
                  backgroundColor: hexToRgba('#D3D3D3',90),
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
                  labelColor:
                    function (tooltipItem,chart) {
                      return {
                        backgroundColor:
                          chart.data.datasets[tooltipItem.datasetIndex].backgroundColor
                      }
                    }
                }
              },

              onClick: (evt, array) => {
                  var position =array[0]._index;
                  localStorage.setItem("positionX", position + 1);
                  this.$emit('clicked', true);
                }

            }

          )

        })

    },

    methods: {}

  } 
 
</script>