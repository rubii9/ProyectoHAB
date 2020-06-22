<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <img :src="path + space.photo1" alt />
      <p>Nombre: {{ space.name }}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}</p>
      <p>Comunidad: {{ space.community }}</p>
      <router-link :to=" {name:'Space', params:{id:space.id}} ">VER</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaSpaces",
  data() {
    return {
      path: "http://localhost:3001/uploads/"
    };
  },
  props: {
    spaces: Array
  }
};
</script>