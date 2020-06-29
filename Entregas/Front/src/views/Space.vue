<template>
  <div class="spaceID">
    <vue-headful title="Spaces | Coworkings.com" description="Space page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <!--  SIMBOLO DE CARGA  -->
    <div v-show="loading" class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- SPACE VIEW -->
    <spaceview :space="space" :comments="comments" :totalvotes="totalvotes" v-show="!loading"></spaceview>
    <hr />
    <div v-show="!loading">
      <button v-show="logged" @click="openVoteModal()">Votar</button>
      <button v-show="logged" @click="openReserveModal()">Reservar</button>
    </div>

    <!-- MODAL PARA VOTAR -->
    <div class="modal" v-show="modalVote">
      <div class="modalBox">
        <h2>Votar espacio</h2>
        <textarea
          name="comentary"
          placeholder="Commentary..."
          v-model.trim="comentary"
          rows="10"
          cols="50"
          @keypress.enter="vote()"
        />
        <star-rating v-model="rating" class="vote"></star-rating>
        <div>
          <button @click="closeVoteModal()">Cancel</button>
          <button @click="vote()">Enviar</button>
        </div>
      </div>
    </div>

    <!-- MODAL PARA RESEVAR -->
    <div class="modal" v-show="modalReserve">
      <div class="modalBox">
        <h2>Reservar espacio</h2>
        <form class="reserva">
          <label for="start_date">Fecha inicio:</label>
          <input
            v-model="fecha_inicio"
            id="start"
            name="start"
            type="date"
            @keypress.enter="reservar()"
          />
          <label for="end_date">Fecha fin:</label>
          <input v-model="fecha_fin" id="end" name="end" type="date" @keypress.enter="reservar()" />
        </form>

        <div>
          <button @click="closeReserveModal()">Cancel</button>
          <button @click="reservar()">Enviar</button>
        </div>
      </div>
    </div>
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import Swal from "sweetalert2";
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO SPACES
import spaceview from "@/components/SpaceView.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";

import { isLoggedIn } from "../api/utils";

export default {
  name: "Space",
  components: { menucustom, spaceview, StarRating, footercustom },
  props: ["id"],
  data() {
    return {
      space: {},
      comments: [],
      loading: true,
      modalVote: false,
      modalReserve: false,
      rating: 0,
      comentary: "",
      logged: false,
      totalvotes: 0,
      fecha_inicio: "",
      fecha_fin: ""
    };
  },
  methods: {
    //FUNCION QUE ABRE EL POP UP PARA EDITAR
    openVoteModal() {
      this.modalVote = true;
    },
    //FUNCION QUE CIERRA EL POP UP PARA EDITAR
    closeVoteModal() {
      this.modalVote = false;
      this.rating = 0;
      this.comentary = "";
    },
    //FUNCION QUE ABRE EL POP UP PARA RESERVA
    openReserveModal() {
      this.modalReserve = true;
    },
    //FUNCION QUE CIERRA EL POP UP PARA RESERVA
    closeReserveModal() {
      this.modalReserve = false;
      this.fecha_inicio = "";
      this.fecha_fin = "";
    },
    getSpaces() {
      let self = this;
      axios
        .get("http://localhost:3001/spaces/" + self.$route.params.id)
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.space = response.data.data;
          }, 1000);
        })
        .catch(function(error) {
          if (error.response) {
            self.$router.push({ path: "/error" });
            alert(error.response.data.message);
          }
        });
    },
    getVotes() {
      let self = this;
      axios
        .get("http://localhost:3001/spaces/" + self.$route.params.id + "/votes")
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.comments = response.data.data;
            self.totalvotes = response.data.info[0].totalvotes;
          }, 1000);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    vote() {
      let self = this;
      axios
        .post(
          "http://localhost:3001/spaces/" + self.$route.params.id + "/votes",
          {
            score: self.rating,
            comment: self.comentary
          }
        )
        .then(function(response) {
          console.log(response);
          self.emptyFields();
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    reservar() {
      let self = this;
      axios
        .post(
          "http://localhost:3001/spaces/" + self.$route.params.id + "/reserve",
          {
            start: self.fecha_inicio,
            end: self.fecha_fin
          }
        )
        .then(function(response) {
          Swal.fire({
            icon: "success",
            title: "Reserva solicitada",
            text: "Comprueba el email para confirmar",
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
    emptyFields() {
      this.rating = 0;
      this.comentary = "";
      this.closeVoteModal();
      Swal.fire({
        icon: "success",
        title: "Voto enviado",
        text: "Gracias",
        confirmButtonText: "Ok"
      });
      setTimeout(function() {
        location.reload();
      }, 1500);
    },
    checkLogged() {
      if (isLoggedIn()) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    }
  },

  created() {
    this.getSpaces();
    this.getVotes();
    this.checkLogged();
  }
};
</script>

<style scoped>
.spaceID {
  min-height: 100vh;
  color: #436f8a;
  background: #f7fbe1;
}

.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}

.footer {
  margin-top: 2rem;
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
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.vote {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
hr {
  width: 80%;
  margin-bottom: 1.5rem;
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
button:focus,
input:focus {
  outline: none;
}
input {
  border: 2px solid #aca7a7;
  width: 20rem;
  padding: 0.35rem;
  margin: 0.5rem;
  border-radius: 20px;
  color: darken(#ededed, 30%);
}
input[type="date"] {
  text-align: center;
  padding: 0.25rem;
  margin: 0.5rem auto;
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

form.reserva {
  display: flex;
  flex-direction: column;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 10rem;
  margin-bottom: 100vh;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: cadetblue;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
