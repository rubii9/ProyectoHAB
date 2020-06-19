<template>
  <div class="register">
    <!-- FORMULARIO -->
    <div class="registerform">
      <p v-show="required">Tienes datos aún por rellenar</p>
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
        <button @click="addUser()">CREAR</button>
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
      required: false
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
            self.$router.push("/login");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("No has rellenado todos los campos.");
      }

      this.emptyFields();
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
.registerform {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.registerform input {
  margin: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
}

.registerform button {
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
.registerform button:hover {
  background: #ffaa00;
}
</style>