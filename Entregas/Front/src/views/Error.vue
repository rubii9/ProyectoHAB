<template>
  <div class="error">
    <vue-headful title="Error | Coworkings.com" description="Error page of web" />
    <h1>ERROR</h1>
    <p>😱 ¿Dónde vas?, esa página no existe</p>
    <p>
      Puedes volver atras haciendo click aqui:
      <router-link :to="{name:'Home'}">Volver a Home</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped></style>