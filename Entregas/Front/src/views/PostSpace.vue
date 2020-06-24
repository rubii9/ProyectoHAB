
<template>
  <div class="PostSpace">
    <!-- MENU -->
    <MenuCustom></MenuCustom>

    <!--APLICAMOS EL CAMBIO DE NOMBRE DINAMICO-->
    <vue-headful title="Post Space" description="Posting page" />

    <h2 id="titulo">Añade una nueva entrada! 👇</h2>

    <form class="posting">
      <p v-show="required" style="color:red">Campos vacios</p>

      <label for="name">Nombre:</label>
      <input
        required
        minlength="3"
        maxlength="100"
        type="text"
        placeholder="Introduce el nombre"
        v-model="name"
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
      />
      <label for="community">Comunidad:</label>
      <input
        name="community"
        required
        minlength="3"
        maxlength="60"
        type="text"
        placeholder="Introduce tu Comunidad"
        v-model="community"
      />
      <label for="type">Tipo:</label>
      <input
        name="type"
        requPublicar
        espacioength="30"
        type="text"
        placeholder="Introduce el tipo de espacio"
        v-model="type"
      />
      <label for="price">Precio:</label>
      <input
        name="price"
        required
        type="number"
        placeholder="Introduce el tipo de espacio"
        v-model="price"
      />

      <label class="imagen" for="imgmeeting">Imagen:</label>
      <input class="imagen" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      <label for="equipment">Equipamiento:</label>
      <textarea name="equipment" rows="10" cols="50" v-model="equipment"></textarea>

      <label for="commentary">Añade una descripción</label>
      <textarea name="commentary" rows="10" cols="50" v-model="description"></textarea>
    </form>
    <button @click="addSpace()">Post</button>
  </div>
</template>
<script>
import MenuCustom from "@/components/MenuCustom";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "PostSpace",
  components: {
    MenuCustom
  },
  data() {
    return {
      name: "",
      city: "",
      community: "",
      equipment: "",
      adress: "",
      description: "",
      type: "",
      price: 0,
      correctData: false,
      required: false
    };
  },
  methods: {
    validatingData() {
      if (
        this.name === "" ||
        this.city === "" ||
        this.community === "" ||
        this.price === 0 ||
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
      this.price = 0;
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
    addSpace() {
      this.validatingData();

      if (this.correctData) {
        let self = this;
        axios
          .post("http://localhost:3001/spaces", {
            name: self.name,
            city: self.city,
            community: self.community,
            equipment: self.equipment,
            adress: self.adress,
            description: self.description,
            type: self.type,
            price: self.price,
            photo1: self.file
          })
          .then(function(response) {
            console.log(response);
            self.emptyFields();
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      }
    }
  }
};
</script>
<style scoped>
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