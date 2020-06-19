<template>
  <div class="login">
    <h1>HACK A MARKET</h1>
    <h2>Login:</h2>
    <form>
      <input
        minlength="3"
        maxlength="60"
        required
        type="email"
        placeholder="Email..."
        v-model="email"
      />
      <input
        type="password"
        minlength="6"
        maxlength="100"
        placeholder="Passsword..."
        v-model="password"
      />
      <button @click="login()">LOGIN</button>
    </form>
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
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
</style>