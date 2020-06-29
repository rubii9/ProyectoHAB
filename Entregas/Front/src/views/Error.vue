<template>
  <div class="error">
    <vue-headful title="Error | Coworkings.com" description="Error page of web" />
    <section>
      <img src="../assets/error.svg" alt />
      <p>😱 ¿Dónde vas?, esa página no existe</p>
      <p>
        Puedes volver atrás haciendo click aqui:
        <router-link :to="{name:'Home'}">Volver a Home 🔙</router-link>
      </p>
    </section>
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
  background: url("../assets/fondologinregister.jpeg") no-repeat fixed;
  background-size: cover;
  height: 100vh;
  background-size: cover;
  color: #436f8a;
}
.animation {
  margin: 0 auto;
}

section {
  background: #fff;
  box-shadow: 5px 5px 5px rgba(228, 174, 25, 0.5);
  border: 2px solid white;
  border-radius: 30px;
  padding: 1rem;
  width: 40%;
  margin: 0 auto;
  height: 60%;
  background: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-evenly;
}

img {
  height: 200px;
}

a {
  color: #436f8a;
  font-weight: bold;
}
</style>