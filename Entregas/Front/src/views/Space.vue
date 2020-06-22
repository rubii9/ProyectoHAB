<template>
  <div class="SpaceID">
    <vue-headful title="Space View" description="Space page" />

    <!-- MENU -->
    <menucustom></menucustom>

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
    <spaceview
      :space="space"
      :comments="comments"
      v-show="!loading"
    ></spaceview>

    <button v-show="!loading" @click="openModal()">Votar</button>
    <button v-show="!loading" @click="reservar()">Reservar</button>
    <!-- MODAL PARA VOTAR -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h3>Votar espacio</h3>
        <label for="commentary">Commentary:</label>
        <textarea
          name="comentary"
          placeholder="Commentary..."
          v-model.trim="comentary"
          rows="10"
          cols="50"
        />
        <label for="rating">Score:</label>
        <star-rating v-model="rating" class="vote"></star-rating>
        <div>
          <button @click="closeModal()">Cancel</button>
          <button @click="vote()">Enviar</button>
        </div>
      </div>
    </div>
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

export default {
  name: "Space",
  components: { menucustom, spaceview, StarRating },
  props: ["id"],
  data() {
    return {
      space: {},
      comments: [],
      loading: true,
      modal: false,
      rating: 0,
      comentary: "",
    };
  },
  methods: {
    //FUNCION QUE ABRE EL POP UP PARA EDITAR
    openModal(data) {
      this.modal = true;
    },
    //FUNCION QUE CIERRA EL POP UP PARA EDITAR
    closeModal() {
      this.modal = false;
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
            comment: self.comentary,
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
    reservar() {},
    emptyFields() {
      this.rating = 0;
      this.comentary = "";
      this.closeModal();
      Swal.fire({
        icon: "success",
        title: "Voto enviado",
        text: "Gracias",
        confirmButtonText: "Ok",
      });
      setTimeout(function() {
        location.reload();
      }, 1500);
    },
  },

  created() {
    this.getSpaces();
    this.getVotes();
  },
};
</script>

<style scoped>
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

.vote {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
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
