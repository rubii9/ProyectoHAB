<template>
  <div class="Landing">
    <vue-headful title="Cowork!" description="Landing page" />

    <!-- MENU -->
    <menucustom id="menuLanding"></menucustom>

    <section class="flexlanding">
      <router-link :to="{name:'Landing'}">
        <img src="../assets/logo.png" alt />
      </router-link>

      <section class="welcome">
        <h1>Cowork!</h1>
        <h2>La web ideal para encontrar tu espacio de trabajo.</h2>
        <p>¿Necesitas un lugar en el que desarrollar tu trabajo y no lo encuentras?</p>
        <p>¡Entra ahora y descubre el coworking que mejor se adapte a ti!</p>
        <p>Tambien podrás conocer a otros usuarios y publicar tus propios coworkings.</p>
        <br />
        <br />
        <br />
        <router-link class="cta" :to="{ name: 'Login'}">
          <span>Comenzar!</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5" />
            <polyline points="8 1 12 5 8 9" />
          </svg>
        </router-link>
      </section>
    </section>

    <!-- FOOTER -->
    <FooterCustom id="footerLanding"></FooterCustom>
  </div>
</template>

<script>
//IMPORTANDO MENU PARA LANDING (ES != AL GENERAL)
import menucustom from "@/components/MenuLanding.vue";
//IMPORTANDO FOOTER
import FooterCustom from "@/components/FooterCustom.vue";
export default {
  name: "Landing",
  components: {
    menucustom,
    FooterCustom
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
.flexlanding {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
  max-width: 60%;
  min-height: 30vh;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.125);
  border-radius: 30px;
  margin: 5rem;
  padding: 2rem;
  color: #436f8a;
}
#menuLanding {
  min-width: 100vw;
}

.Landing h1 {
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Dancing Script";
  margin: 0.5rem;
}
.Landing h2 {
  text-align: left;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #777984;
}
.Landing p {
  text-align: left;
}
.Landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: url("../assets/fondologinregister.jpeg") no-repeat fixed;
  background-size: cover;
}
#footerLanding {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 300;
}
.cta {
  position: relative;
  margin: auto;
  padding: 19px 22px;
  transition: all 0.2s ease;
}
.cta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 28px;
  background: #f3bc46;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta span {
  position: relative;
  font-size: 16px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
}
.cta svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}
.cta:hover:before {
  width: 100%;
  background: #f3bc46;
}
.cta:hover svg {
  transform: translateX(0);
}
.cta:active {
  transform: scale(0.96);
}
.Landing a {
  text-decoration: none;
  color: inherit;
  margin: 1rem;
}
.Landing span {
  color: black;
}

section {
  margin: 0 2rem;
}
</style>