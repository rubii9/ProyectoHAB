<template>
  <div class="login">
    <h1>HACK A MARKET</h1>
    <h2>Login:</h2>
    <input type="text" placeholder="Email..." v-model="email" />
    <input type="password" placeholder="Passsword..." v-model="password" />
    <button @click="login()">LOGIN</button>
  </div>
</template>

<script>
import axios from "axios";
import { loginUser } from "@/api/utils.js";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        if (this.email === "" || this.password === "")
          throw Error("Datos vacios");
        await loginUser(this.email, this.password);

        //GUARDAR EL EMAIL EN LOCALSTORAGE
        localStorage.setItem("Usuario", this.email);

        //LLEVAR A LA PAGINA DE PRODUCTOS
        this.$router.push("/");
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 1rem;
  padding: 1rem;
}
.login {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
h1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin-top: 0.5rem;
  color: #ff6d00;
}
input {
  margin: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
}
button {
  width: 10rem;
  cursor: pointer;
  text-align: center;
  color: white;
  background: #ff6d00;
  padding: 0.5rem;
  margin: 0.667rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}

button:hover {
  background: #ffaa00;
}

.register a {
  color: white;
  text-decoration: none;
}
</style>