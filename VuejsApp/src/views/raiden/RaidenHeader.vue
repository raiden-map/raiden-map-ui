<template >
  <div class="row">
    <div class="col col-2" style="font-size: 20px">
      <div style="margin-left:15px;margin-top:15px;">
        <a :href="tokenLink" target="_blank" style="text-decoration:none; color:black;">
          <img :src="cryptoIcon" width="32" style="margin-right:10px" />
          <strong>{{cryptoName}}</strong>
        </a>
      </div>
    </div>

    <div class="col-8">
      <div class="row">
        <div class="col-sm" style="text-align:center">
          Price
          <p class="text-secondary">{{headerFields.price}}</p>
        </div>
        <div class="col-sm" style="text-align:center">
          Market Cap
          <p class="text-secondary">{{headerFields.market_cap}}</p>
        </div>
        <div class="col-sm" style="text-align:center">
          Change (24h)
          <p :class="headerFields.change24 < 0 ? 'text-danger' : 'text-success'">
            <small>
              <i :class="headerFields.change24 < 0 ? 'fa fa-level-down' : 'fa fa-level-up'"></i>
              {{headerFields.change24_perc}}%
            </small>
            <br />
            {{headerFields.change24}}
          </p>
        </div>
        <div class="col-sm" style="text-align:center">
          Total Volume
          <p class="text-secondary">{{headerFields.total_volume}}</p>
        </div>
      </div>
    </div>

    <div class="col-2 p-0">
      <!-- <b-row class="m-0"> -->
      <div class="col-12">
        <b-button
          block
          variant
          class="btn-square float-right mb-1"
          @click="donateModal = true"
          style="vertical-align: middle; width: 150px; height:38px"
        >
          <img src="../../../public/icon/donate.png" class="mb-1" width="22" />
          <span class="text-uppercase font-weight-bold">&nbsp;Donate</span>
        </b-button>
      </div>

      <div class="col-12">
        <b-button
          block
          variant
          class="btn-square float-right m-0"
          @click="feedbackModal = true"
          style="vertical-align: middle; width: 150px; height:38px"
        >
          <img src="../../../public/icon/comment.svg" class="mb-0" width="20" />
          <span class="text-uppercase font-weight-bold">&nbsp;Feedback</span>
        </b-button>
      </div>
      <!-- </b-row> -->
    </div>

    <!-- non viene mostrato -->
    <div class="col-2" style="text-align: right">
      <b-button
        block
        variant="dark"
        class="btn-square"
        v-on:click="mapButtonVisibility = false, dashboardButtonVisibility = true, showMap()"
        v-show="mapButtonVisibility"
        style="height:80px; vertical-align: middle;"
      >
        <i class="fa fa-globe fa-2x"></i>
        Go To Map
      </b-button>
      <b-button
        block
        variant="dark"
        class="btn-square"
        v-on:click="mapButtonVisibility = true, dashboardButtonVisibility = false, showDashboard()"
        v-show="dashboardButtonVisibility"
        style="height:80px; vertical-align: middle; margin-top: 0px"
      >
        <i class="fa fa-line-chart fa-2x"></i>
        <span>Go To Dashboard</span>
      </b-button>
    </div>
    <!-- ******** -->

    <div class="col-12" style="vertical-align: top;">
      <hr style="margin:0" />
    </div>

    <b-modal
      title="Make a Donation"
      class="modal-primary"
      v-model="donateModal"
      @ok="donateModal = false"
      ok-variant="primary"
    >
      <div class="text-center">
        <img src="../../../public/icon/donate.png" class="mb-1" width="100" />
        <div class="mt-4 mb-5">
          <p>
            Support us with a donation, so we can continue to develop and improve this project.
            <br />Here below you can find our wallet, click on it to copy the address.
          </p>
        </div>
        <b-row>
          <div class="col-12">
            <b-input-group>
              <b-input-group-append @click="copyAddress">
                <b-input-group-text style>
                  <img src="../../../public/icon/ethereum.svg" class="mb-1" width="17" />
                </b-input-group-text>
              </b-input-group-append>
              <b-form-input
                class="text-center"
                type="text"
                v-model="ethAddress"
                v-bind:readonly="ethDisabled"
                @click="copyAddress"
                id="ethAddress"
                style="background-color:white; "
              ></b-form-input>
              <b-input-group-append @click="copyAddress">
                <b-input-group-text style>
                  <img src="../../../public/icon/ethereum.svg" class="mb-1" width="17" />
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
            <b-popover
              target="ethAddress"
              placement="bottom"
              title="Text Copied!"
              triggers="focus"
            />
          </div>
        </b-row>
        <div class="mt-3">
          <p>
            <b>Thank you</b>
            <br />
            <i class="fa fa-smile-o fa-4x text-success"></i>
          </p>
        </div>
      </div>
    </b-modal>

    <b-modal
      title="Leave a Feedback"
      class="modal-primary"
      v-model="feedbackModal"
      @ok="feedbackModal = false"
      ok-variant="primary"
    >
      <div class="text-center">
        <img src="../../../public/icon/comment.svg" class="mb-1" width="100" />
        <div class="mt-4 mb-2">
          <p>
            Open an
            <a
              href="https://github.com/raiden-map/raiden-map-ui/issues"
              target="_blank"
            >Issue on GitHub</a>
            and tell us what you think about this project.
            <br />Or you can send us an email at
            <u>info@raidenmap.io</u>
          </p>
          <p class="mt-5">
            Thanks for any kind of feedback you will decide to leave.
            <br />It will be very useful.
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RaidenHeader",
  components: {},
  data() {
    return {
      price: "",
      deposit: "",
      marketcap: "",
      change: "",

      donateModal: false,
      feedbackModal: false,
      ethDisabled: true,
      ethAddress: "0xdB619D7D9fA1705601FD764C778CB6423F11039b",

      mapButtonVisibility: false, //mettere a true per vedere il bottone
      dashboardButtonVisibility: false,
    };
  },
  props: {
    cryptoName: {
      type: String,
      default: null,
    },
    cryptoIcon: {
      type: String,
      default: null,
    },
    tokenLink: {
      type: String,
      default: null,
    },
    headerFields: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // var key = localStorage.getItem("token");
    // axios.get("TokenNetworkDelta.json").then((resp) => {
    //   resp.data.TOKEN_NETWORK_DELTA.forEach((element) => {
    //     if (element.key == key) {
    //       this.price = element.datakey.token.valueBtc;
    //       this.deposit = element.datakey.totalDeposit;
    //       this.marketcap = element.datakey.token.marketCap;
    //       this.change = element.datakey.token.priceChangeDayBtc;
    //     }
    //   });
    // });
  },
  methods: {
    showDashboard() {
      this.$emit("showDashboard");
    },

    showMap() {
      this.$emit("showMap");
    },

    copyAddress() {
      let testingCodeToCopy = document.querySelector("#ethAddress");
      testingCodeToCopy.select();

      document.execCommand("copy");
    },

    tokenprofile() {
      // if (localStorage.getItem("token")) {
      //   this.$router.push("/tokenprofile");
      // } else {
      //   this.$swal({
      //     type: "error",
      //     title: "No token key avaliable!",
      //     text: " Please provide a token key to go to this page",
      //   });
      // }
    },

    reset() {
      (this.mapButtonVisibility = false), //mettere a true per vedere il bottone
        (this.dashboardButtonVisibility = false);
    },
  },
};
</script>