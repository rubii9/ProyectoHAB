<template>
  <div class="register">
    <vue-headful
      title="Registro | Coworkings.com"
      description="Register page"
    />

    <form>
      <div class="welcome">
        <h1 class="legend">Bienvenido!</h1>
        <p>
          Regístrate para poder realizar reservas, publicar espacios y explorar
          otros usuarios
        </p>
        <lottie-player
          class="logImg"
          src="https://assets4.lottiefiles.com/private_files/lf30_JhSJFE.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 200px;"
          loop
          autoplay
        ></lottie-player>
      </div>
      <fieldset>
        <h1>Registro</h1>
        <div class="input">
          <input
            minlength="3"
            maxlength="60"
            required
            type="email"
            placeholder="Email..."
            v-model.trim="email"
            @keypress.enter="addUser()"
          />
          <span>
            <i class="fa fa-envelope-o"></i>
          </span>
        </div>

        <div class="input">
          <input
            type="password"
            minlength="6"
            maxlength="100"
            name="password"
            required
            placeholder="Password..."
            v-model.trim="password"
            @keypress.enter="addUser()"
          />
          <span>
            <i class="fa fa-lock"></i>
          </span>
        </div>

        <div class="input">
          <input
            type="text"
            name="name"
            placeholder="Nombre..."
            required
            v-model.trim="name"
            @keypress.enter="addUser()"
          />
          <span>
            <i class="fa fa-user"></i>
          </span>
        </div>

        <div class="input">
          <input
            type="text"
            name="city"
            placeholder="Ciudad..."
            required
            v-model.trim="city"
            @keypress.enter="addUser()"
          />
          <span>
            <i class="fa fa-home"></i>
          </span>
        </div>

        <div class="input">
          <select
            name="community"
            required
            placeholder="Introduce la comunidad"
            v-model="community"
          >
            <option disabled value>Comunidad...</option>
            <option
              v-for="comunidad in comunidades"
              :key="comunidad.id"
              v-bind:value="comunidad.nombre"
              >{{ comunidad.nombre }}</option
            >
          </select>
          <span>
            <i class="fa fa-flag"></i>
          </span>
        </div>

        <p class="error" v-show="required" style="color:red">{{ message }}</p>
        <div class="botones">
          <button class="submit" type="button" @click="addUser()">
            Register
          </button>
          <router-link class="borderRightLeft" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
//IMPORTANDO AXIOS
import axios from "axios";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      name: "",
      city: "",
      community: "",
      correctData: false,
      required: false,
      message: "Error",
      comunidades: [],
    };
  },
  methods: {
    //VALIDAR CAMPOS
    validatingData() {
      if (
        this.email === "" ||
        this.password === "" ||
        this.name === "" ||
        this.city === "" ||
        this.community === ""
      ) {
        this.correctData = false; // NON ENVIAR
        this.required = true; // MOSTRA O MENSAXE
        this.message = "Campos vacios";
      } else {
        this.correctData = true; // ENVIAR
        this.required = false; // NON MOSTRA O MENSAXE
      }
    },
    //FUNCION PARA REGISTRAR USUARIO
    addUser() {
      this.validatingData(); // VALIDANDO DATOS DO FORM
      if (this.correctData === true) {
        let self = this;
        axios
          .post("http://localhost:3001/users", {
            email: self.email,
            password: self.password,
            name: self.name,
            city: self.city,
            community: self.community,
          })
          .then(function(response) {
            self.emptyFields();
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      } else {
        console.log("Empty fields");
      }
    },
    //VACIAR CAMPOS
    emptyFields() {
      this.email = "";
      this.password = "";
      this.name = "";
      this.city = "";
      this.community = "";
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "Comprueba el email para validar tu cuenta",
        confirmButtonText: "Ok",
      });
      this.$router.push("/login");
    },
    //GET COMUNIDADES
    async getCommunity() {
      try {
        this.comunidades = await this.getCom();
      } catch (error) {
        console.log(error);
      }
    },
    //GET COMUNINADES
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
  },

  mounted() {
    this.getCommunity();
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

* {
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
.welcome {
  width: 50%;
}

.input {
  position: relative;
  width: 90%;
  margin: 15px auto;
}

.botones {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.legend {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logImg {
  margin: 0 auto;
}
.borderRightLeft {
  display: inline-block;
  color: #474e51;
  position: relative;
}

.borderRightLeft::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(1);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #f3bc46;
  transform-origin: bottom left;
  transition: transform 0.3s ease-in-out;
}

.borderRightLeft:hover::after {
  transform: scaleX(0);
  transform-origin: bottom right;
}
form {
  box-shadow: 5px 5px 5px rgba(228, 174, 25, 0.5);
  border: 2px solid white;
  border-radius: 30px;
  padding: 1rem;
  width: 40%;
  margin: 0 auto;
  height: 60%;
  background: white;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
}

p.error {
  color: red;
  font-size: 0.85rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
a {
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  min-width: 40px;
  margin: 0 auto;
}
p {
  color: #2c3e50;
  width: 70%;
  margin: 0 auto;
}
div .register {
  width: 100%;
  height: 100vh;
  padding: 5rem;
  background: url("../assets/fondologinregister.jpeg") no-repeat fixed;
  background-size: cover;
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  position: absolute;
  display: block;
  color: darken(#ededed, 10%);
  left: 10px;
  top: 8px;
  font-size: 20px;
}
input {
  width: 100%;
  padding: 10px 5px 10px 40px;
  display: block;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  transition: 0.2s ease-out;
  color: darken(#ededed, 30%);
}
select {
  width: 100%;
  color: grey;
  padding: 10px 5px 10px 40px;
  display: block;
  background: white;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  transition: 0.2s ease-out;
}
option {
  color: black;
}

input:focus,
select:focus {
  outline: 0;
  border-color: #f3bc46;
}
fieldset h1 {
  margin-bottom: 2rem;
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
</style>
