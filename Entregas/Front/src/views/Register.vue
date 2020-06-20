<template>
  <div class="register">
    <!-- FORMULARIO -->
    <div class="registerform">
      <p v-show="required">{{message}}</p>
      <form>
        <label for="email">Email:</label>
        <input
          minlength="3"
          maxlength="60"
          required
          type="email"
          placeholder="Email..."
          v-model="email"
        />
        <br />
        <label for="password">Password:</label>
        <input
          type="password"
          minlength="6"
          maxlength="100"
          name="password"
          required
          placeholder="Password..."
          v-model="password"
        />
        <br />
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="Name..." required v-model="name" />
        <br />
        <label for="city">City:</label>
        <input type="text" name="city" placeholder="City..." required v-model="city" />
        <br />
        <label for="community">Community:</label>
        <input type="text" name="commuity" placeholder="Community..." required v-model="community" />
        <br />
        <button type="#" @click="addUser()">CREAR</button>
        <router-link :to="{name:'Login'}">Login</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      message: "Error"
    };
  },
  methods: {
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
        this.message = "Empty fields";
      } else {
        this.correctData = true; // ENVIAR
        this.required = false; // NON MOSTRA O MENSAXE
      }
    },
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
            community: self.community
          })
          .then(function(response) {
            console.log(response);
            this.emptyFields();
            self.$router.push("/login");
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
    emptyFields() {
      this.email === "";
      this.password === "";
      this.name === "";
      this.city === "";
      this.community === "";
    }
  }
};
</script>

<style scoped>
</style>