<template>
  <div class="usuariosPerfil">
    <vue-headful
      title="Perfil usuarios | Coworkings.com"
      description="Profile page"
    />

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
    <ProfileComponent
      :profile="profile"
      v-show="!loading"
      class="Profile"
    ></ProfileComponent>

    <div v-show="!loading">
      <button v-show="isAdmin" @click="message()">Eliminar</button>
    </div>

    <!-- FOOTER -->
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO COMPONENTE USUARIO
import ProfileComponent from "@/components/ProfileComponent.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
//IMPORTANDO AXIOS
import axios from "axios";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";
//IMPORTANDO FUNCION DE UTILS
import { getIsAdmin } from "../api/utils";

export default {
  name: "Profile",
  components: {
    menucustom,
    ProfileComponent,
    footercustom,
  },
  data() {
    return {
      profile: {},
      loading: true,
      isAdmin: false,
    };
  },

  methods: {
    //CONSEGUIR INFO DEL PERFIL USUARIO
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
          }
        });
    }, //MENSAJE DE BORRAR USUARIO
    message() {
      Swal.fire({
        title: "Estás seguro?",
        text: "No prodras recuperar tus datos una vez eliminados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,eliminar!",
      }).then((result) => {
        if (result.value) {
          this.deleteUser();
          this.$router.push("/home");
          Swal.fire("Borrado!", "El usuario ya no existe :(", "success");
        }
      });
    },
    deleteUser() {
      let self = this;
      axios
        .delete("http://localhost:3001/users/" + self.$route.params.id)
        .then(function(response) {})
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    checkLogged() {
      if (getIsAdmin() === "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
    info() {
      this.userID = localStorage.getItem("userID");
    },
  },
  created() {
    this.getProfile();
    this.checkLogged();
  },
};
</script>
<style scoped>
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}
.footer {
  margin-top: 8rem;
}
.usuariosPerfil {
  min-height: 100vh;
  color: #436f8a;
  background: url("../assets/backgroundProfile.jpeg") no-repeat fixed;
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
button {
  width: 120px;
  cursor: pointer;
  text-align: center;
  color: #474e51;
  background: #f3bc46;
  border: 2px solid #a7a398;
  border-radius: 10px;
  padding: 0.35rem;
  margin: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #6077ca;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 10rem;
  margin-bottom: 20rem;
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
