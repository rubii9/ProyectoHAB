<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <router-link :to=" {name:'Space', params:{id:space.id}} ">
        <img :src="space.photo1 ? path + space.photo1 : ''" alt />
      </router-link>
      <p>ID: {{ space.space_id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Precio: {{space.price}}€</p>
      <p>Inicio de reserva: {{space.start_date.substr(0,10)}}</p>
      <p>Fin de reserva: {{space.end_date.substr(0,10)}}</p>
      <p>Pagado: {{space.is_paid ? "Realizado" : "Pendiente"}}</p>
      <p>Limpio: {{space.is_clean ? "Limpio" : "Pendiente"}}</p>
      <h3>Incidencias:</h3>
      <div
        v-for="comment in incidents"
        :key="comment.id"
        v-show="comment.space_id == space.space_id ? true: false"
      >
        <p>{{comment.comment}}</p>
        <p>{{comment.space_id}}</p>
        <p>Estado: {{comment.state === "open" ? "Pendiente" : "Cerrado"}}</p>
      </div>
      <button @click="openModal(space.space_id)">Incidencia</button>
      <button @click="payReserve(space.space_id)">Pagar</button>
    </div>

    <!-- MODAL PARA INCIDENCIAS -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h3>Crear incidencia</h3>
        <label for="commentary">Comentario:</label>
        <textarea
          name="comentary"
          placeholder="Commentary..."
          v-model.trim="comentary"
          rows="10"
          cols="50"
          @keypress.enter="addIncident()"
        />
        <div>
          <button @click="closeModal()">Cancel</button>
          <button @click="addIncident()">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "CoworkingView",

  data() {
    return {
      path: "http://localhost:3001/uploads/",
      modal: false,
      comentary: "",
      spaceID: 0
    };
  },
  props: {
    spaces: Array,
    incidents: Array
  },
  methods: {
    info() {
      this.userID = localStorage.getItem("userID");
    },

    openModal(data) {
      this.modal = true;
      this.spaceID = data;
    },
    //FUNCION QUE CIERRA EL POP UP PARA EDITAR
    closeModal() {
      this.modal = false;
      this.comentary = "";
    },
    addIncident() {
      let self = this;
      axios
        .post(
          "http://localhost:3001/mycoworking/" + this.spaceID + "/incident",
          {
            comment: self.comentary
          }
        )
        .then(function(response) {
          self.closeModal();
          Swal.fire({
            icon: "success",
            title: "Incidencia creada",
            text: "Gracias por su información",
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
    },
    payReserve(data) {
      let self = this;
      axios
        .post("http://localhost:3001/mycoworking/" + data + "/pay", {
          comment: self.comentary
        })
        .then(function(response) {
          self.closeModal();
          self.pagado = true;
          Swal.fire({
            icon: "success",
            title: "Pago pendiente de validación",
            text: "Comprueba el correo para verificar",
            confirmButtonText: "Ok"
          });
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
  },
  created() {
    this.info();
  }
};
</script>

<style scoped>
img {
  height: 400px;
  width: 400px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  color: black;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
</style>
