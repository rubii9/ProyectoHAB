<template>
  <div class="myprofile">
    <vue-headful
      title="Mi perfil | Coworkings.com"
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
    <div class="Profile" v-show="!loading">
      <ProfileComponent :profile="profile"></ProfileComponent>
      <div>
        <button @click="openModal()">Editar</button>
        <button class="eliminar" @click="message()">Eliminar</button>
      </div>
    </div>

    <!-- MODAL PARA EDITAR -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h2>Editar tu perfil</h2>

        <label for="newName">Nombre:</label>
        <input
          v-model="newName"
          placeholder="Text appears here"
          @keypress.enter="edite()"
        />

        <label for="newCity">Ciudad:</label>
        <input
          v-model="newCity"
          placeholder="Text appears here"
          @keypress.enter="edite()"
        />

        <label for="newCommunity">Comunidad:</label>

        <select
          name="community"
          required
          placeholder="Introduce la comunidad"
          v-model="newCommunity"
        >
          <option disabled value>Comunidad...</option>
          <option
            v-for="comunidad in comunidades"
            :key="comunidad.id"
            v-bind:value="comunidad.nombre"
            >{{ comunidad.nombre }}</option
          >
        </select>

        <label for="newPhone">Telefono:</label>
        <input
          type="number"
          v-model="newPhone"
          placeholder="Text appears here"
          @keypress.enter="edite()"
        />

        <label class="imagen" for="imgmeeting">Imagen:</label>
        <input
          class="imagen"
          type="file"
          id="file"
          ref="file"
          @change="handleFileUpload"
        />

        <div>
          <button @click="closeModal()">Cancelar</button>
          <button @click="edite()">Aceptar</button>
          <br />
          <p>¿Cambiar la contraseña?</p>
          <button @click="openPassModal()">Contraseña</button>
        </div>
      </div>
    </div>

    <!-- MODAL PARA CONTRASEÑA -->
    <div class="modal" v-show="modalpassword">
      <div class="modalBox">
        <h3>Cambio de contraseña:</h3>

        <p v-show="required" style="color:red">{{ errorMsg }}</p>

        <label for="oldpassword">Contraseña actual:</label>
        <input
          type="text"
          v-model="oldPassword"
          placeholder="Password..."
          @keypress.enter="edite()"
        />

        <label for="newCity">Nueva contraseña:</label>
        <input
          type="text"
          v-model="newPassword"
          placeholder="Nueva password"
          @keypress.enter="edite()"
        />

        <div>
          <button @click="closePassModal()">Cancelar</button>
          <button @click="changePass()">Cambiar</button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO COMPONENTE DE PERFIL USUARIOS
import ProfileComponent from "@/components/ProfileComponent.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
//IMPORTANDO AXIOS
import axios from "axios";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";
//IMPORTANDO FUNCION DE UTILS
import { clearLogin } from "../api/utils";

export default {
  name: "MyProfile",
  components: {
    menucustom,
    ProfileComponent,
    footercustom,
  },
  data() {
    return {
      profile: {},
      comunidades: [],
      loading: true,
      modal: false,
      modalpassword: false,
      file: null,
      newName: "",
      newCity: "",
      newCommunity: "",
      newPhone: "",
      oldPassword: "",
      newPassword: "",
      errorMsg: "",
      required: false,
      correctData: false,
    };
  },

  methods: {
    //CONSEGUIR INFO DEL USUARIO
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
    //FUNCION PARA EDITAR EL USUARIO
    edite() {
      let self = this;

      let photoFormData = new FormData();
      // dict of all elements
      photoFormData.append("name", this.newName);
      photoFormData.append("city", this.newCity);
      photoFormData.append("community", this.newCommunity);
      photoFormData.append("phone", this.newPhone);

      if (this.file != null) {
        photoFormData.append("avatar", this.file);
      }

      axios
        .put(
          `http://localhost:3001/users/${self.$route.params.id}`,
          photoFormData
        )
        .then(function(response) {
          self.closeModal();
          Swal.fire({
            icon: "success",
            title: "Perfil modificado",
            confirmButtonText: "Ok",
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
    //GET COMUNINADES
    async getCommunity() {
      try {
        this.comunidades = await this.getCom();
      } catch (error) {
        console.log(error);
      }
    },
    getCom() {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await axios({
            url: `http://localhost:3001/comunidades`, // URL DE LA AUTENTICACIÓN
            method: "GET", // MÉTODO DE LA AUTENTICACIÓN
          });
          resolve(res.data.data);
        } catch (err) {
          console.log("Error consiguiendo los idiomas: ", err);
          reject(err);
        }
      });
    },
    //FUNCION PARA CAMBIAR CONTRASEÑA
    changePass() {
      this.validatingData();
      if (this.correctData) {
        let self = this;
        axios
          .post(
            `http://localhost:3001/users/${self.$route.params.id}/password`,
            {
              oldPassword: self.oldPassword,
              newPassword: self.newPassword,
            }
          )
          .then(function(response) {
            self.closePassModal();
            self.logoutUser();
            self.$router.push("/login");
            Swal.fire({
              icon: "success",
              title: "Contraseña modificada",
              text: "Haz login de nuevo para iniciar sesión",
              confirmButtonText: "Ok",
            });
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
              /*   self.$router.push({ path: "/error" }); */
            }
          });
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    //FUNCION PARA BORRAR USUARIO
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
    //MENSAJE DE BORRAR USUARIO
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
          this.logoutUser();
          this.$router.push("/login");
          Swal.fire("Borrado!", "Tu cuenta ya no existe :(", "success");
        }
      });
    },
    //FUNCION LOGOUT
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    },
    //PASAR EL TEXTO AL MODAL DE EDITAR
    showEditText() {
      this.newName = this.profile.realName;
      this.newCity = this.profile.city;
      this.newCommunity = this.profile.community;
      this.newPhone = this.profile.phone;
    },
    //CERRAR MODAL DE EDITAR
    closeModal() {
      this.modal = false;
      this.newName = "";
      this.newCity = "";
      this.newCommunity = "";
      this.newPhone = "";
    },
    //ABIR MODAL EDITAR
    openModal() {
      this.modal = true;
      this.showEditText();
    },
    //CERRAR MODAL PASSWORD
    closePassModal() {
      this.modalpassword = false;
      this.oldPassword = "";
      this.newPassword = "";
      this.errorMsg = "";
    },
    //ABRIR MODAL PASSWORD
    openPassModal() {
      this.modalpassword = true;
      this.modal = false;
    },
    //COMPROBANDO CAMPOS VACIOS
    validatingData() {
      if (this.newPassword === "" || this.oldPassword === "") {
        this.correctData = false; // NON ENVIAR
        this.required = true; // MOSTRA O MENSAXE
        this.errorMsg = "Campos vacíos";
        return;
      } else if (this.newPassword === this.oldPassword) {
        this.correctData = false; // NON ENVIAR
        this.required = true; // MOSTRA O MENSAXE
        this.errorMsg = "La nueva contraseña debe ser diferente a la anterior";
      } else {
        this.correctData = true; // ENVIAR
        this.required = false; // NON MOSTRA O MENSAXE
      }
    },
  },
  mounted() {
    this.getCommunity();
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
.myprofile {
  min-height: 100vh;
  color: #436f8a;
  background: url("../assets/backgroundProfile.jpeg") no-repeat fixed;
  background-size: cover;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
.footer {
  margin-top: 10rem;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  background: #f7fbe1;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
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

input {
  width: 30%;
  margin: 0.5rem auto;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  padding: 0.5rem;
}

select {
  width: 33%;
  margin: 0.5rem auto;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  padding: 0.5rem;
  background: #fff;
}

input:focus,
select:focus {
  outline: none;
  border: 2px solid #f3bc46;
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
