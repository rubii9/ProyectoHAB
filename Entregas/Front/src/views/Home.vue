<template>
  <div class="home">
    <vue-headful title="Home" description="Home page" />

    <!-- MENU -->
    <menucustom></menucustom>

    <!-- BUSQUEDA -->
    <div class="searchProduct">
      <select v-model="filter">
        <option disabled value>Filtrado por...</option>
        <option value="name">Nombre</option>
        <option value="location">Ubicación</option>
        <option value="type">Tipo</option>
        <option value="equipment">Equipmiento</option>
        <option value="date">Fecha</option>
      </select>
      <input
        v-model.trim="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="Búsqueda..."
        v-show="!dateInput"
      />
      <input
        v-model.trim="search"
        id="search"
        name="bySearch"
        type="date"
        placeholder="Write..."
        v-show="dateInput"
      />
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
    <spaceslist :spaces="spaces"></spaceslist>

    <!-- NO RESULTS -->
    <p v-show="noResults" style="color:red">No results</p>
  </div>
</template>

<script>
import axios from "axios";
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO SPACES
import spaceslist from "@/components/ListaSpaces.vue";

export default {
  name: "Home",
  components: { menucustom, spaceslist },
  data() {
    return {
      spaces: [],
      loading: true,
      search: "",
      filter: "",
      dateInput: false,
      noResults: false
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
    clearInput() {
      (this.search = ""), (this.filter = "");
      this.getSpaces();
    }
  },
  watch: {
    // cada vez que la pregunta cambie, esta función será ejecutada
    filter: function() {
      if (this.filter === "date") {
        this.dateInput = true;
      } else {
        this.dateInput = false;
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
  }
};
</script>

<style scoped>
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