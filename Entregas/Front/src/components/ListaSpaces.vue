<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <router-link :to=" {name:'Space', params:{id:space.id}} ">
        <img :src="space.photo1 ? path + space.photo1 : ''" alt />
      </router-link>
      <p>Nombre: {{ space.name }}</p>
      <p>Tipo: {{ space.type }}</p>
      <p>Ubicación: {{ space.city }}, {{ space.community }}</p>
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
<style  scoped>
</style>