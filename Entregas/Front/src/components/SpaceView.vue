<template>
  <div>
    <div class="space">
      <img :src="path + space.photo1" alt />
      <p>ID: {{ space.id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}</p>
      <p>Comunidad: {{ space.community }}</p>
      <p>Descripción: {{ space.description }}</p>
      <p>Dirección: {{ space.adress }}</p>
      <p>Equipamiento: {{ space.equipment }}</p>
      <p>Score: {{ Number(space.score).toFixed([2]) }}</p>
      <div v-for="comment in comments" :key="comment.id">
        <p>
          <router-link :to="{ name: 'Profile', params:{ id: comment.user_id }}">{{ comment.name }}:</router-link>
          {{ comment.comment }}, Score: {{ comment.score }} ⭐
        </p>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "SpaceView",

  data() {
    return {
      path: "http://localhost:3001/uploads/"
    };
  },
  props: {
    space: Object,
    comments: Array
  },
  methods: {
    capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }
};
</script>

<style scoped>
img {
  height: 400px;
  width: 400px;
}
</style>
