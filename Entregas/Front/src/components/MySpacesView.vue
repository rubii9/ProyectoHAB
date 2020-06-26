<template>
  <div>
    <div class="space" v-for=" space in spaces" :key="space.id">
      <img :src="space.photo1 ?  path + space.photo1 : ''" alt />
      <p>Nombre: {{ space.name }}</p>
      <p>ID espacio: {{space.id}}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}, {{ space.community }}</p>
      <p>Precio: {{space.price}}€</p>
      <p v-show="space.is_clean != null ">Limpio: {{space.is_clean ? "Limpio" : "Pendiente"}}</p>
      <p v-show="space.is_clean != null ">Pago: {{space.is_paid ? "Realizado" : "Pendiente"}}</p>
      <h3>Incidencias:</h3>
      <p v-show="incidents.length < 1 ? true : false">No hay incidencias</p>
      <div
        v-for="incident in incidents"
        :key="incident.id"
        v-show="incident.space_id == space.id ? true: false"
      >
        <p>{{incident.comment}}</p>
        <p>{{incident.space_id}}</p>
        <p>Estado: {{incident.state === "open" ? "Abierta" : "Cerrado"}}</p>
      </div>
      <button @click="cleanEvent(space.id)">Limpieza</button>
      <button
        @click="closeEvent(space.id)"
        v-show="incidents.length < 1 ? false : true"
      >Cerrar incidencias</button>
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
    info() {
      this.userID = localStorage.getItem("userID");
    },
    cleanEvent(data) {
      this.$emit("clean", data);
    },
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
img {
  height: 400px;
  width: 400px;
}
</style>
