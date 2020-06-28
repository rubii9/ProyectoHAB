<template>
  <div class="usuariosPerfil">
    <vue-headful title="Perfil usuarios | Coworkings.com" description="Profile page" />

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

    <!-- PROFILE COMPONENT -->
    <ProfileComponent :profile="profile" v-show="!loading" class="Profile"></ProfileComponent>

    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Profile",
  components: {
    menucustom,
    ProfileComponent,
    footercustom
  },
  data() {
    return {
      profile: {},
      loading: true,
      modal: false,
      newName: "",
      newCity: "",
      newCommunity: "",
      newPhone: ""
    };
  },

  methods: {
    getProfile() {
      let self = this;

      axios
        .get("http://localhost:3001/users/" + self.$route.params.id)
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.profile = response.data.data;
          }, 1000);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            /*   self.$router.push({ path: "/error" }); */
          }
        });
    },

    closeModal() {
      this.modal = false;
      (this.newName = ""),
        (this.newCity = ""),
        (this.newCommunity = ""),
        (this.newPhone = "");
    },
    openModal() {
      this.modal = true;
      this.showEditText();
    }
  },
  created() {
    this.getProfile();
  }
};
</script>
<style scoped>
* {
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}
.footer {
  margin-top: 10rem;
}
.usuariosPerfil {
  height: 100vh;
  color: #436f8a;
  background: url("https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80")
    no-repeat fixed;
  background-size: cover;
}

.Profile {
  width: 20%;
  margin: 2rem auto;
  padding: 5rem;
  background: #f7fbe1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px #6f94ac;
  border: 2px solid #f7fbe1;
  border-radius: 30px;
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