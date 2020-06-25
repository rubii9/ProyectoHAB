<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <router-link :to=" {name:'Space', params:{id:space.id}} ">
        <img :src="space.photo1 ? path + space.photo1 : ''" alt />
      </router-link>
      <p>ID: {{ space.id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Precio: {{space.price}}€</p>
      <p>Inicio de reserva: {{space.start_date.substr(0,10)}}</p>
      <p>Fin de reserva: {{space.end_date.substr(0,10)}}</p>
      <div
        v-for="comment in incidents"
        :key="comment.id"
        v-show="comment.space_id == space.id ? true: false"
      >
        <h3>incidents:</h3>
        <p>{{comment.comment}}</p>
        <p>{{comment.space_id}}</p>
        <p>Estado: {{comment.state === "open" ? "Pendiente" : "Cerrado"}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoworkingView",

  data() {
    return {
      path: "http://localhost:3001/uploads/",
      userID: 0
    };
  },
  props: {
    spaces: Array,
    incidents: Array
  },
  methods: {
    info() {
      this.userID = localStorage.getItem("userID");
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
