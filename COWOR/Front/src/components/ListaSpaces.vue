<template>
  <div class="lista">
    <div class="space" v-for="space in spaces" :key="space.id">
      <div>
        <router-link :to=" {name:'Space', params:{id:space.id}} ">
          <img :src="space.photo1 ? path + space.photo1 : ''" alt />
        </router-link>
      </div>
      <div class="info">
        <router-link :to=" {name:'Space', params:{id:space.id}} ">
          <h1>{{ space.name }}</h1>
        </router-link>

        <p>{{ space.city }}, {{ space.community }}</p>
        <p>{{ space.type }}</p>

        <p>
          Equipamiento:
          <br />
          {{space.equipment}}
        </p>
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
  margin: 0 auto;
}
.space {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 1rem auto;
  padding: 2rem;
  box-shadow: 5px 5px 5px rgba(228, 174, 25, 0.5);
  border: 2px solid white;
  border-radius: 30px;
  background: white;
  min-width: 650px;
  max-width: 650px;
}
.info {
  margin: auto 1rem;
  min-width: 220px;
  max-width: 220px;
}
img {
  height: 400px;
  width: 400px;
  border-radius: 10px;
}
a {
  text-decoration: none;
  color: #436f8a;
}
</style>