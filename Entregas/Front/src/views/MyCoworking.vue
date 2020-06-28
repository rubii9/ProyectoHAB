<template>
  <div class="coworking">
    <vue-headful title="My Coworking | Coworkings.com" description="Coworking page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <!--  SIMBOLO DE CARGA  -->
    <div v-show="loading" class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <coworking v-show="!loading" :spaces="spaces" :incidents="incidents"></coworking>

    <!-- NO RESULTS -->
    <p class="results" v-show="noResults" style="color:red">No tines ninguna reserva</p>

    <footercustom></footercustom>
  </div>
</template>

<script>
import axios from "axios";
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO COWORKING VIEW
import coworking from "@/components/CoworkingView.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
export default {
  name: "MyCoworking",
  components: { menucustom, coworking, footercustom },
  data() {
    return {
      spaces: [],
      incidents: [],
      loading: true,
      dateInput: false,
      noResults: false
    };
  },
  methods: {
    getSpaces() {
      let self = this;
      axios
        .get(`http://localhost:3001/mycoworking`)
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.spaces = response.data.data;
            self.incidents = response.data.dataIncidents;
          }, 1000);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    spaces: function() {
      if (this.spaces.length < 1) {
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    }
  },
  created() {
    this.getSpaces();
  }
};
</script>

<style scoped>
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
.results {
  height: 100vh;
}
.footer {
  margin-top: 2rem;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 10rem;
  margin-bottom: 100vh;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: cadetblue;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>