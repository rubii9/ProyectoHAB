<template>
  <div class="home">
    <vue-headful title="Home | Coworkings.com" description="Home page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <header>
      <img src="../assets/landing2.svg" alt style="width: 300px; height: 300px;" />
      <article>
        <h1>Bienvenido a Coworks!</h1>Aquí podrás encontrar tu lugar de trabajo ideal que estás buscando.
        Puedes buscar por nombre, tipo, ubicacion, o fecha para reservar, y no te olvides de dejar tu votación o comentario.
        Tambien puedes publicar tus propios espacios y controlar las incidencias que los usuarios tengan.
      </article>
      <img src="../assets/landing.svg" alt style="width: 300px; height: 300px;" />
    </header>

    <!-- BUSQUEDA -->
    <div class="searchProduct" v-show="!loading">
      <select v-model="filter">
        <option disabled value>Filtrado por...</option>
        <option value="name">Nombre</option>
        <option value="location">Ubicación</option>
        <option value="type">Tipo espacio</option>
        <option value="equipment">Equipmiento</option>
        <option value="date">Fecha incio reserva</option>
      </select>

      <input v-model.trim="search" placeholder="Búsqueda..." v-show="normalInput" class="buscar" />

      <input v-model.trim="search" type="date" placeholder="Write..." v-show="dateInput" />

      <select
        name="community"
        required
        placeholder="Introduce la comunidad"
        v-model="search"
        v-show="ubicationInput"
      >
        <option disabled value>Comunidad Autónoma...</option>
        <option
          v-for="comunidad in comunidades"
          :key="comunidad.id"
          v-bind:value="comunidad.nombre"
        >{{comunidad.nombre}}</option>
      </select>

      <button @click="clearInput()">Borrar</button>
    </div>

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

    <!-- CUERPO LANDING -->
    <main v-show="!loading">
      <section class="productos">
        <!-- COMPONENTE SPACES -->
        <spaceslist :spaces="spaces"></spaceslist>
        <!-- NO RESULTS -->
        <p v-show="noResults" style="color:red">No results</p>
      </section>

      <section>
        <!-- COMPONENTE SOME USERS -->
        <h2>Usuarios recientes:</h2>
        <someusers v class="some" :users="users"></someusers>
      </section>
    </main>

    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
import axios from "axios";
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO SPACES
import spaceslist from "@/components/ListaSpaces.vue";
//IMPORTANDO SOMEUSERS
import someusers from "@/components/SomeUsers.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Home",
  components: { menucustom, spaceslist, someusers, footercustom },
  data() {
    return {
      spaces: [],
      users: [],
      loading: true,
      search: "",
      filter: "",
      dateInput: false,
      normalInput: true,
      ubicationInput: false,
      noResults: false,
      comunidades: []
    };
  },
  methods: {
    getSpaces() {
      let self = this;
      axios
        .get(
          `http://localhost:3001/spaces?search=${self.search}&filter=${self.filter}`
        )
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.spaces = response.data.data;
          }, 1000);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUsers() {
      let self = this;
      axios
        .get(`http://localhost:3001/someusers`)
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.users = response.data.data;
          }, 1000);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clearInput() {
      (this.search = ""), (this.filter = "");
      this.getSpaces();
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
  },

  watch: {
    // cada vez que la pregunta cambie, esta función será ejecutada
    filter: function() {
      if (this.filter === "date") {
        this.dateInput = true;
        this.normalInput = false;
        this.ubicationInput = false;
        this.search = "";
      }

      if (this.filter === "location") {
        this.dateInput = false;
        this.normalInput = false;
        this.ubicationInput = true;
        this.search = "";
      }

      if (this.filter != "date" && this.filter != "location") {
        this.dateInput = false;
        this.normalInput = true;
        this.ubicationInput = false;
        this.search = "";
      }
    },
    spaces: function() {
      if (this.spaces.length < 1) {
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    },
    search: function() {
      this.getSpaces();
    }
  },
  created() {
    this.getSpaces();
    this.getUsers();
  }
};
</script>

<style scoped>
.home {
  background: url("../assets/fondolanding.jpeg") no-repeat fixed;
  background-size: cover;
  color: #436f8a;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
.footer {
  margin-top: 1rem;
}

.some {
  height: 230px;
  width: 200px;
  border: 1px solid #ddd;
  background: #fff;
  margin: 0 auto;
  padding: 0.5rem;
}
.productos {
  padding: 1rem;
}
header {
  background: #f7fbe1;
  margin: 0;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
}
header article {
  width: 30%;
  margin: auto 4rem;
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
}
select {
  color: grey;
  margin: 0.5rem;
  background: white;
  border: 2px solid #aca7a7;
  border-radius: 20px;
  padding: 0.35rem;
}
option {
  color: black;
}
option:disabled {
  color: gray;
}
input:focus,
select:focus {
  outline: 0;
  border-color: #f3bc46;
}
button {
  width: 60px;
  cursor: pointer;
  text-align: center;
  background: #f3bc46;
  color: #474e51;
  border: 2px solid #a7a398;
  border-radius: 5px;
  padding: 0.35rem;
  margin: 1rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #693662;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
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