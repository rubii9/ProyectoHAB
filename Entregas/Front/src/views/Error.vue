<template>
  <div class="error">
    <vue-headful title="Error | Coworkings.com" description="Error page of web" />
    <h1>ERROR</h1>
    <p>😱 ¿Dónde vas?, esa página no existe</p>
    <p>
      Puedes volver atras haciendo click aqui:
      <router-link :to="{name:'Home'}">Volver a Home</router-link>
    </p>
    <lottie-player
      class="animation"
      src="https://assets5.lottiefiles.com/packages/lf20_njOLli.json"
      background="transparent"
      speed="1"
      style="width: 500px; height: 500px;"
      loop
      autoplay
    ></lottie-player>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.animation {
  margin: 0 auto;
}
</style>