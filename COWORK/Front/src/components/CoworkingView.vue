<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <router-link :to=" {name:'Space', params:{id:space.id}} ">
        <img class="foto" :src="space.photo1 ? path + space.photo1 : ''" alt />
      </router-link>

      <div class="info">
        <h1>{{ space.name }}</h1>

        <p>{{space.type}}</p>
        <p>{{ space.city }}, {{ space.community }}</p>
        <p>
          <strong>Precio:</strong>
          {{space.price}}€
        </p>
        <p>
          <strong>Propietario:</strong>
          <router-link
            :to="{ name:  'Profile', params:{ id: space.owner_id }}"
          >{{ space.propietario }}</router-link>
        </p>
        <p>
          <strong>Fecha inicio:</strong>
          {{space.start_date ? space.start_date.substr(0,10) : ""}}
        </p>
        <p>
          <strong>Fecha fin:</strong>
          {{ space.end_date ? space.end_date.substr(0,10) : ""}}
        </p>

        <p>
          <strong>Pago:</strong>
          {{space.is_paid ? "Realizado" : "Pendiente"}}
        </p>
        <p>
          <strong>Limpieza:</strong>
          {{space.is_clean ? "Limpio" : "Pendiente"}}
        </p>
        <button v-show="!space.is_paid" @click="payReserve(space.space_id)">Pagar</button>
      </div>
      <div class="incidencias">
        <h3>Incidencias:</h3>
        <div
          v-for="comment in incidents"
          :key="comment.id"
          v-show="comment.space_id == space.space_id ? true: false"
        >
          <p>{{comment.comment}} ({{comment.state === "open" ? "Pendiente" : "Cerrado"}})</p>
        </div>
        <button @click="openModal(space.space_id)">Incidencia</button>
      </div>
    </div>

    <!-- MODAL PARA INCIDENCIAS -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h3>Crear incidencia</h3>
        <label for="commentary">Comentario:</label>
        <textarea
          name="comentary"
          placeholder="Comentario..."
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
//IMPORTANDO AXIOS
import axios from "axios";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

export default {
  name: "CoworkingView",

  data() {
    return {
      path: "http://localhost:3001/uploads/",
      modal: false,
      comentary: "",
      spaceID: 0,
      userID: 0
    };
  },
  props: {
    spaces: Array,
    incidents: Array
  },
  methods: {
    //COGER ID USUARIO DEL LOCALSTORAGE
    info() {
      this.userID = localStorage.getItem("userID");
    },
    //ABRIR MODAL PARA INCIDENCIA
    openModal(data) {
      this.modal = true;
      this.spaceID = data;
    },
    //FUNCION QUE CIERRA EL POP UP PARA INCIDENCIA
    closeModal() {
      this.modal = false;
      this.comentary = "";
    },
    //FUNCION CREAR INCIDENCIA
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
    //FUNCION PAGAR RESERVA
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
a {
  color: #436f8a;
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
  background: #f7fbe1;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.space {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 1px 1px;
  grid-template-areas: "foto info incidencias";
  margin: 5rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(67, 111, 138, 0.7);
  box-shadow: 5px 5px 5px rgba(67, 111, 138, 0.7);
  color: #436f8a;
  background: #f7fbe1;
}

.foto {
  grid-area: foto;
}

.info {
  grid-area: info;
}

.incidencias {
  grid-area: incidencias;
}
div.info {
  margin: auto 0;
}
div.incidencias {
  margin: auto 0;
}
img {
  height: 400px;
  width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid rgba(67, 111, 138, 0.7);
}

textarea {
  margin: 1rem auto;
  width: 50%;
  border: 2px solid #aca7a7;
  border-radius: 4px;
  transition: 0.2s ease-out;
  color: darken(#ededed, 30%);
  padding: 0.5rem;
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
  margin: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #6077ca;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
</style>
