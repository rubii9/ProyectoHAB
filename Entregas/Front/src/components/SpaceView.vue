<template>
  <div>
    <div class="space">
      <p>ID: {{ space.id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}</p>
      <p>Comunidad: {{ space.community }}</p>
      <p>Descripción: {{space.description}}</p>
      <p>Dirección: {{space.adress}}</p>
      <p>Equipamiento: {{space.equipment}}</p>
      <p>Score: {{Number(space.score).toFixed([2])}}</p>
      <br />
      <img :src="path + space.photo1" alt />
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
    space: Object
  },
  methods: {
    capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }
};
</script>

<style>
</style>