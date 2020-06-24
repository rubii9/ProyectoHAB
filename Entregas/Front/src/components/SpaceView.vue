<template>
  <div>
    <div class="space">
      <img :src="space.photo1 ?  path + space.photo1 : ''" alt />
      <p>ID: {{ space.id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}</p>
      <p>Comunidad: {{ space.community }}</p>
      <p>Descripción: {{ space.description }}</p>
      <p>Dirección: {{ space.adress }}</p>
      <p>Equipamiento: {{ space.equipment }}</p>
      <p>Precio: {{space.price}}€</p>

      <p>
        Valoración:
        <star-rating
          :inline="inline"
          :star-size="startSize"
          :read-only="onTrue"
          :rating="Number(space.score)"
          :fixed-points="fixedPoints"
          :increment="increment"
        ></star-rating>
      </p>
      <p>Votos totales: {{totalvotes}}</p>
      <!-- <p>Score: {{ Number(space.score).toFixed([2]) }}</p> -->

      <div v-for="comment in comments" :key="comment.id">
        <p>
          <router-link
            :to="{ name:  (comment.user_id == userID) ? 'MyProfile':'Profile', params:{ id: comment.user_id }}"
          >{{ comment.name }}:</router-link>
          {{ comment.comment }}. Puntuación: {{ comment.score }} ⭐
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "SpaceView",
  components: {
    StarRating
  },
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
    space: Object,
    comments: Array,
    totalvotes: Number
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
