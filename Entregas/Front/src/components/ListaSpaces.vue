<template>
  <div>
    <div class="space" v-for="space in spaces" :key="space.id">
      <p>ID: {{ space.id }}</p>
      <p>Nombre: {{ space.name }}</p>
      <p>Apellido: {{ space.type }}</p>
      <p>Ciudad: {{ space.city }}</p>
      <p>Empresa: {{ space.community }}</p>
      <p>Desciption: {{space.description}}</p>
      <p>Adress: {{space.adress}}</p>
      <p>Equipment: {{space.equipment}}</p>
      <p>Score: {{Number(space.score).toFixed([2])}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaSpaces",
  props: {
    spaces: Array
  }
};
</script>