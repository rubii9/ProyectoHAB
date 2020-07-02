<template>
  <div class="myspacesview">
    <div class="space" v-for=" space in spaces" :key="space.id">
      <img class="foto" :src="space.photo1 ?  path + space.photo1 : ''" alt />
      <div class="info">
        <h1>{{ space.name }}</h1>
        <p>{{space.type}}</p>
        <p>{{ space.city }}, {{ space.community }}</p>

        <p v-show="space.is_clean != null ">
          <strong>Limpio:</strong>
          {{space.is_clean ? "Limpio" : "Pendiente"}}
        </p>
        <p v-show="space.is_paid != null ">
          <strong>Pago:</strong>
          {{space.is_paid ? "Realizado" : "Pendiente"}}
        </p>

        <button @click="cleanEvent(space.id)">Limpieza</button>
      </div>
      <div class="incidencias">
        <h3>Incidencias:</h3>
        <p v-show="incidents.length < 1 ? true : false">No hay incidencias</p>
        <div
          v-for="incident in incidents"
          :key="incident.id"
          v-show="incident.space_id == space.id ? true: false"
        >
          <p>{{incident.comment}}</p>
        </div>
        <button @click="closeEvent(space.id)" v-show="incidents.length < 1 ? false : true">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySpaceView",
  components: {},
  data() {
    return {
      path: "http://localhost:3001/uploads/",
      inline: true,
      startSize: 30,
      onTrue: true,
      onFalse: false,
      increment: 0.01,
      fixedPoints: 2,
      userID: 0
    };
  },
  props: {
    spaces: Array,
    incidents: Array,
    totalvotes: Number
  },
  methods: {
    //CONSGUIR ID USUARIO
    info() {
      this.userID = localStorage.getItem("userID");
    },
    //EMIT DE LIMPIAR ESPACIO
    cleanEvent(data) {
      this.$emit("clean", data);
    },
    //EMIT DE CERRAR INCIDENCIAS
    closeEvent(data) {
      this.$emit("close", data);
    }
  },
  created() {
    this.info();
  }
};
</script>

<style scoped>
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
img {
  height: 400px;
  width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid rgba(67, 111, 138, 0.7);
}

div.info {
  margin: auto 0;
}
div.incidencias {
  margin: auto 0;
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
