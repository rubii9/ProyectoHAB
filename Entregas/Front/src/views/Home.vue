<template>
  <div class="home">
    <vue-headful title="Home | Coworkings.com" description="Home page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <!-- BUSQUEDA -->
    <div class="searchProduct" v-show="!loading">
      <select v-model="filter">
        <option disabled value>Filtrado por...</option>
        <option value="name">Nombre</option>
        <option value="location">Ubicación</option>
        <option value="type">Tipo</option>
        <option value="equipment">Equipmiento</option>
        <option value="date">Fecha incio libre</option>
      </select>
      <div class="buscador">
        <input
          v-model.trim="search"
          id="search"
          name="bySearch"
          placeholder="Búsqueda..."
          v-show="normalInput"
          class="buscar"
        />

        <img v-show="normalInput" src="../assets/buscar.svg" alt class="icono" />
      </div>

      <input
        v-model.trim="search"
        id="search"
        name="bySearch"
        type="date"
        placeholder="Write..."
        v-show="dateInput"
      />

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
      <button @click="clearInput()">Clean</button>
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

    <!-- COMPONENTE SPACES -->
    <spaceslist v-show="!loading" :spaces="spaces"></spaceslist>
    <!-- NO RESULTS -->
    <p v-show="noResults" style="color:red">No results</p>

    <!-- COMPONENTE SOME USERS -->
    <h2 v-show="!loading">Usuarios recientes:</h2>
    <someusers v-show="!loading" class="some" :users="users"></someusers>

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
  background: #f7fbe1;
  color: #436f8a;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}
.footer {
  margin-top: 1rem;
}
.searchProduct {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.buscador {
  display: flex;
  justify-content: center;
  align-content: center;
}
.buscar {
  position: absolute;
}

.icono {
  height: 18px;
  display: block;
  margin: 0 0.5rem;
  position: relative;
  left: 80px;
  top: 2px;
}

.some {
  height: 230px;
  width: 200px;
  border: 1px solid #ddd;
  background: #fff;
  margin: 0 auto;
  padding: 0.5rem;
}

select {
  margin-right: 4.7rem;
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