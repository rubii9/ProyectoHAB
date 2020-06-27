<template>
  <div class="about">
    <vue-headful title="Contacto | Coworkings.com" description="About page" />
    <menucustom></menucustom>
    <h1>Contacta con nosotros:</h1>
    <form>
      <p v-show="required" style="color:red">Campos vacios</p>

      <label for="asunto">Asunto:</label>
      <input
        type="text"
        v-model="asunto"
        required
        placeholder="Asunto..."
        @keypress.enter="sendEmail()"
      />

      <label for="commentary">Commentary:</label>
      <textarea
        name="comentary"
        placeholder="Commentary..."
        v-model.trim="comentary"
        rows="10"
        cols="50"
        required
        @keypress.enter="sendEmail()"
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
      email: "rubenpo167@gmail.com",
      comentary: "",
      asunto: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    sendEmail() {
      this.validatingData();
      if (this.correctData) {
        let self = this;
        axios
          .post(`http://localhost:3001/contact`, {
            email: self.email,
            asunto: self.asunto,
            comentary: self.comentary
          })
          .then(function(response) {
            (self.email = ""), (self.comentary = ""), (self.asunto = "");
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
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      } else {
        console.log("Empty fields");
      }
    },
    validatingData() {
      if (this.comentary === "" || this.asunto === "") {
        this.correctData = false; // NON ENVIAR
        this.required = true; // MOSTRA O MENSAXE

        return;
      } else {
        this.correctData = true; // ENVIAR
        this.required = false; // NON MOSTRA O MENSAXE
      }
    }
  }
};
</script>
