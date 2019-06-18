<script>
  import { Line } from 'vue-chartjs'
  import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
  import { hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
  import axios from 'axios'

  export default {
      name:"TokenNetworkChart2",
      components: {
      hexToRgba,
      CustomTooltips
    },
      extends: Line,

 


    mounted() {
      var datasets1 = [];
      var datasets2 = [];

      axios.get("TokenNetworkDelta.json")
        .then(response => {
          response.data.TOKEN_NETWORK_DELTA.forEach(function (item) {
            datasets1.push(
            item.datakey.openChannels

            );
            datasets2.push(
            item.datakey.closedChannels

            );

          })

          this.renderChart(


            {
              labels: ['January', 'February', 'March', 'April', 'May','June'],
              datasets: [
                {
                  label: 'Opened Channels',
                  backgroundColor: hexToRgba('#ADD8E6',90),
                  data: datasets1
                },
                {
                  label: 'Closed Channels',
                  backgroundColor: hexToRgba('#D3D3D3', 90),
                  data: datasets2
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
              }
            }
          )
        })
    },
    methods: {}
  }

</script>