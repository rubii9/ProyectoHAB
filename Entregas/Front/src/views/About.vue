<template>
  <div class="about">
    <vue-headful title="Contacto | Coworkings.com" description="About page" />
    <menucustom class="menu"></menucustom>
    <h1>Contacta con nosotros</h1>
    <h5>Envianos tus sugerencias para mejorar nuestro servicio.</h5>
    <form>
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_OZnTKS.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
      <fieldset>
        <p v-show="required" style="color:red">Campos vacios</p>

        <label for="asunto">Concepto</label>
        <input
          type="text"
          v-model="asunto"
          required
          placeholder="Concepto..."
          @keypress.enter="sendEmail()"
        />

        <label for="commentary">Comentario</label>
        <textarea
          name="comentary"
          placeholder="Escribe tu sugerencia..."
          v-model.trim="comentary"
          rows="10"
          cols="50"
          required
          @keypress.enter="sendEmail()"
        />

        <button @click="sendEmail()">Enviar</button>
      </fieldset>
      <lottie-player
        src="https://assets7.lottiefiles.com/datafiles/6WfDdm3ooQTEs1L/data.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
    </form>
    <footercustom class="footer"></footercustom>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "About",
  components: { menucustom, footercustom },
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
<style scoped>
* {
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}

.about {
  background: #f7fbe1;
  color: #436f8a;
}

h1,
h5 {
  margin-bottom: 2rem;
}

form {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 15rem;
}
fieldset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 50%;
}

textarea,
label,
input,
p,
button {
  margin: 0.5rem auto;
}

textarea,
input {
  width: 50%;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  transition: 0.2s ease-out;
  color: darken(#ededed, 30%);
  padding: 0.5rem;
}

input {
  width: 20%;
}

input:focus,
textarea:focus {
  outline: 0;
  border-color: #f3bc46;
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
  margin: 0.5rem auto;
  margin-bottom: 1rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #436f8a;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
</style>