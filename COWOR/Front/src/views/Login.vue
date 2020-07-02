<template>
  <div class="login">
    <vue-headful title="Login | Coworkings.com" description="Login page" />

    <form>
      <div>
        <h1 class="legend">Hola! 👋</h1>

        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_u8o7BL.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 250px;"
          loop
          autoplay
        ></lottie-player>
      </div>

      <fieldset>
        <h1>Login</h1>

        <div class="input">
          <input
            minlength="3"
            maxlength="60"
            required
            type="email"
            placeholder="Email..."
            v-model.trim="email"
            @keypress.enter="login()"
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
            placeholder="Passsword..."
            v-model.trim="password"
            required
            @keypress.enter="login()"
          />
          <span>
            <i class="fa fa-lock"></i>
          </span>
        </div>

        <p class="error" v-show="required">{{ message }}</p>

        <div class="botones">
          <button class="submit" type="button" @click="login()">Login</button>

          <router-link class="borderRightLeft" :to="{ name: 'Register' }">Regístrate aquí</router-link>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
//IMPORTANDO AXIOS
import axios from "axios";
//IMPORTANDO FUNCION DE UTILS
import { loginUser } from "@/api/utils.js";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      message: "Error",
      required: false
    };
  },
  methods: {
    //FUNCION DE LOGIN
    async login() {
      try {
        if (this.email === "" || this.password === "")
          throw Error("Campos vacios");
        this.required = false;
        await loginUser(this.email, this.password);

        //GUARDAR EL EMAIL EN LOCALSTORAGE
        localStorage.setItem("Usuario", this.email);

        //LLEVAR A LA PAGINA DE PRODUCTOS
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.message = error.message;
        this.required = true;
        if (error.response) {
          alert(error);
        }
      }
    }
  }
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
}
form {
  box-shadow: 5px 5px 5px rgba(228, 174, 25, 0.5);
  border: 2px solid white;
  border-radius: 30px;
  padding: 1rem;
  width: 40%;
  margin: 0 auto;
  height: 40%;
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
  min-width: 90px;
  margin: 0 auto;
}
div .login {
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
input:focus {
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
</style>
