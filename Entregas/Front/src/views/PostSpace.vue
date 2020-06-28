
<template>
  <div class="PostSpace">
    <!--APLICAMOS EL CAMBIO DE NOMBRE DINAMICO-->
    <vue-headful title="Nueva entrada | Coworkings.com" description="Posting page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <h2 id="titulo">Añade una nueva entrada! 👇</h2>

    <form class="posting">
      <fieldset>
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
        ></textarea>

        <label for="commentary">Añade una descripción</label>
        <textarea
          name="commentary"
          rows="10"
          cols="50"
          v-model="description"
          @keypress.enter="uploadEvent()"
        ></textarea>
        <button @click="uploadEvent()">Post</button>
      </fieldset>
    </form>
  </div>
</template>
<script>
import menucustom from "@/components/MenuCustom";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "PostSpace",
  components: {
    menucustom
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
      this.$router.push("/");
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

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
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
.posting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
input,
label {
  margin: 0 auto;
  width: 20%;
}
textarea {
  margin: 0 auto;
  width: 30%;
}
</style>