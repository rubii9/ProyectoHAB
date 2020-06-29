<template>
  <div class="lista">
    <div class="space" v-for="space in spaces" :key="space.id">
      <div>
        <router-link :to=" {name:'Space', params:{id:space.id}} ">
          <img :src="space.photo1 ? path + space.photo1 : ''" alt />
        </router-link>
      </div>
      <div>
        <p>Nombre: {{ space.name }}</p>
        <p>Tipo: {{ space.type }}</p>
        <p>Ubicación: {{ space.city }}, {{ space.community }}</p>
      </div>
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
.lista {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  margin: 2rem;
  padding: 2rem;
  width: 50%;
  margin: 0 auto;
}
.space {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 2rem;
}
img {
  height: 400px;
  width: 400px;
}
</style>