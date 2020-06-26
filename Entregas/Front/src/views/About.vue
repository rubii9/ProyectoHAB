<template>
  <div class="about">
    <vue-headful title="Contacto" description="About page" />
    <menucustom></menucustom>
    <h1>Contacta con nosotros:</h1>
    <form>
      <label for="email">Email:</label>
      <input type="email" required v-model="email" />

      <label for="asunto">Asunto</label>
      <input type="text" v-model="asunto" required />

      <label for="commentary">Commentary:</label>
      <textarea
        name="comentary"
        placeholder="Commentary..."
        v-model.trim="comentary"
        rows="10"
        cols="50"
        required
      />
    </form>
    <button @click="sendEmail()">Enviar</button>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "About",
  components: { menucustom },
  data() {
    return {
      email: "",
      comentary: "",
      asunto: ""
    };
  },
  methods: {
    sendEmail() {
      let self = this;
      axios
        .post(`http://localhost:3001/contact`, {
          email: self.email,
          asunto: self.asunto,
          comentary: self.comentary
        })
        .then(function(response) {
          (this.email = ""), (this.comentary = ""), (this.asunto = "");
          Swal.fire({
            icon: "success",
            title: "Email enviado",
            text: "Te responderemos al email cuando sea posible, gracias",
            confirmButtonText: "Ok"
          });
          setTimeout(function() {
            location.reload();
          }, 1500);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
