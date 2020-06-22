<template>
  <div class="login">
    <vue-headful title="Login" description="Login page" />
    <h1>Welcome!</h1>
    <h2>Login</h2>
    <form>
      <p v-show="required">{{message}}</p>
      <input
        minlength="3"
        maxlength="60"
        required
        type="email"
        placeholder="Email..."
        v-model.trim="email"
      />
      <input
        type="password"
        minlength="6"
        maxlength="100"
        placeholder="Passsword..."
        v-model.trim="password"
        required
      />
      <button type="#" @click="login()">LOGIN</button>
      <router-link :to="{name:'Register'}">Register</router-link>
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
      password: "",
      message: "Error",
      required: false
    };
  },
  methods: {
    async login() {
      try {
        if (this.email === "" || this.password === "")
          throw Error("Empty fields");
        this.required = false;
        await loginUser(this.email, this.password);

        //GUARDAR EL EMAIL EN LOCALSTORAGE
        localStorage.setItem("Usuario", this.email);

        //LLEVAR A LA PAGINA DE PRODUCTOS
        this.$router.push("/");
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
p {
  color: red;
}
</style>