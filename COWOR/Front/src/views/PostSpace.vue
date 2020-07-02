
<template>
  <div class="PostSpace">
    <!--APLICAMOS EL CAMBIO DE NOMBRE DINAMICO-->
    <vue-headful title="Nueva entrada | Coworkings.com" description="Posting page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <form class="posting">
      <div class="title">
        <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_HpFqiS.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
          class="animation"
        ></lottie-player>
        <article>
          Este es el lugar perfecto para añadir tus espacios de coworking.
          Rellena el formulario para completar el post, a continuacion podrás ver tu publicación en
          <router-link :to="{name:'MySpaces'}">Mis publicaciones</router-link>
        </article>
      </div>

      <fieldset>
        <h2 id="titulo">Añade una nueva entrada! 👇</h2>

        <p v-show="required" style="color:red">Campos vacios</p>

        <label for="name">Nombre:</label>
        <input
          required
          minlength="3"
          maxlength="100"
          type="text"
          placeholder="Introduce el nombre"
          v-model="name"
          @keypress.enter="uploadEvent()"
        />

        <label for="adress">Direccion:</label>
        <input
          name="adress"
          required
          minlength="3"
          maxlength="255"
          type="text"
          placeholder="Introduce la dirección"
          v-model="adress"
          @keypress.enter="uploadEvent()"
        />

        <label for="city">Ciudad:</label>
        <input
          name="city"
          required
          minlength="3"
          maxlength="60"
          type="text"
          placeholder="Introduce tu ciudad"
          v-model="city"
          @keypress.enter="uploadEvent()"
        />

        <label for="community">Comunidad:</label>
        <select name="community" required placeholder="Introduce la comunidad" v-model="community">
          <option disabled value>Comunidad Autónoma...</option>
          <option
            v-for="comunidad in comunidades"
            :key="comunidad.id"
            v-bind:value="comunidad.nombre"
          >{{comunidad.nombre}}</option>
        </select>

        <label for="type">Tipo:</label>
        <input
          name="type"
          requPublicar
          espacioength="30"
          type="text"
          placeholder="Introduce el tipo de espacio"
          v-model="type"
          @keypress.enter="uploadEvent()"
        />

        <label for="price">Precio:</label>
        <input
          name="price"
          required
          type="number"
          placeholder="Introduce el precio €"
          v-model="price"
          @keypress.enter="uploadEvent()"
        />

        <label class="imagen" for="imgmeeting">Imagen:</label>
        <input class="imagen" type="file" id="file" ref="file" @change="handleFileUpload" />

        <label for="equipment">Equipamiento:</label>
        <textarea
          name="equipment"
          rows="10"
          cols="50"
          v-model="equipment"
          @keypress.enter="uploadEvent()"
          placeholder="Escribe el equipamiento de tu espacio..."
        ></textarea>

        <label for="commentary">Añade una descripción</label>
        <textarea
          name="commentary"
          rows="10"
          cols="50"
          v-model="description"
          @keypress.enter="uploadEvent()"
          placeholder="Escribe el una pequeña descripción de tu espacio..."
        ></textarea>
        <button type="button" @click="uploadEvent()">Post</button>
      </fieldset>
    </form>

    <!-- FOOTER -->
    <footercustom class="footer"></footercustom>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";
//IMPORTANDO AXIOS
import axios from "axios";
export default {
  name: "PostSpace",
  components: {
    menucustom,
    footercustom
  },
  data() {
    return {
      file: null,
      name: "",
      city: "",
      community: "",
      equipment: "",
      adress: "",
      description: "",
      type: "",
      price: "",
      correctData: false,
      required: false,
      comunidades: []
    };
  },
  methods: {
    //VALIDAR CAMPOS
    validatingData() {
      if (
        this.type === "" ||
        this.name === "" ||
        this.city === "" ||
        this.community === "" ||
        this.price === "" ||
        this.adress === "" ||
        this.description === "" ||
        this.equipment === ""
      ) {
        this.correctData = false; // NON ENVIAR
        this.required = true; // MOSTRA O MENSAXE

        return;
      } else {
        this.correctData = true; // ENVIAR
        this.required = false; // NON MOSTRA O MENSAXE
      }
    },
    //VACIAR CAMPOS
    emptyFields() {
      this.name = "";
      this.city = "";
      this.community = "";
      this.type = "";
      this.price = "";
      this.adress = "";
      this.description = "";
      this.equipment = "";
      Swal.fire({
        icon: "success",
        title: "Has subido tu post!",
        text: "Puedes comprobarlo en my Spaces"
      });
      this.$router.push("/home");
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    //FUNCION PARA SUBIR EVENTO
    uploadEvent() {
      this.validatingData();
      if (this.correctData) {
        let photoFormData = new FormData();
        // dict of all elements
        photoFormData.append("name", this.name);
        photoFormData.append("city", this.city);
        photoFormData.append("community", this.community);
        photoFormData.append("equipment", this.equipment);
        photoFormData.append("adress", this.adress);
        photoFormData.append("description", this.description);
        photoFormData.append("price", this.price);
        photoFormData.append("type", this.type);
        photoFormData.append("photo1", this.file);

        let self = this;
        axios
          .post("http://localhost:3001/spaces", photoFormData)
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
            method: "GET" // MÉTODO DE LA AUTENTICACIÓN
          });
          resolve(res.data.data);
        } catch (err) {
          console.log("Error consiguiendo los idiomas: ", err);
          reject(err);
        }
      });
    }
  },

  mounted() {
    this.getCommunity();
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
.PostSpace {
  background: #f7fbe1;
  color: #436f8a;
}
.title {
  width: 20%;
}

.animation {
  margin: 0 auto;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
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
button,
select {
  margin: 0.5rem auto;
}

textarea,
input {
  background: rgb(255, 255, 255);
  width: 50%;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  transition: 0.2s ease-out;
  color: darken(#ededed, 30%);
  padding: 0.5rem;
}

select {
  width: 50%;
  padding: 0.5rem;
  color: gray;
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
}
button:hover {
  background-color: #6077ca;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}

a {
  font-weight: bold;
  margin: auto 0.25rem;
  color: #436f8a;
}
</style>