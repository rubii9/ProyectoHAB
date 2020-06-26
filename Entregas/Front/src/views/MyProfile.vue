<template>
  <div class="Profile">
    <vue-headful title="Mi perfil" description="Profile page" />

    <!-- MENU -->
    <menucustom></menucustom>

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
    <ProfileComponent :profile="profile" v-show="!loading"></ProfileComponent>

    <!-- MODAL PARA EDITAR -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h3>Editar meeting:</h3>
        <div>
          <label for="newName">Nombre:</label>
          <input v-model="newName" placeholder="Text appears here" @keypress.enter="edite()" />
        </div>

        <div>
          <label for="newCity">Ciudad:</label>
          <input v-model="newCity" placeholder="Text appears here" @keypress.enter="edite()" />
        </div>

        <div>
          <label for="newCommunity">Comunidad:</label>
          <input v-model="newCommunity" placeholder="Text appears here" @keypress.enter="edite()" />
        </div>

        <div>
          <label for="newPhone">Telefono:</label>
          <input v-model="newPhone" placeholder="Text appears here" @keypress.enter="edite()" />
        </div>

        <div>
          <button @click="closeModal()">Cancel</button>
          <button @click="edite()">Enviar</button>
        </div>
      </div>
    </div>
    <button v-show="!loading" @click="openModal()">Editar</button>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "MyProfile",
  components: {
    menucustom,
    ProfileComponent
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
    edite() {
      let self = this;

      axios
        .put(`http://localhost:3001/users/${self.$route.params.id}`, {
          name: this.newName,
          city: this.newCity,
          community: this.newCommunity,
          phone: this.newPhone
        })
        .then(function(response) {
          self.closeModal();
          Swal.fire({
            icon: "success",
            title: "Perfil modificado",
            confirmButtonText: "Ok"
          });
          setTimeout(function() {
            location.reload();
          }, 1500);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            /*   self.$router.push({ path: "/error" }); */
          }
        });
    },
    showEditText() {
      this.newName = this.profile.realName;
      this.newCity = this.profile.city;
      this.newCommunity = this.profile.community;
      this.newPhone = this.profile.phone;
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  color: black;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
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