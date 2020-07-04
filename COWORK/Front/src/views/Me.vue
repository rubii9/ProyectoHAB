<template>
  <div class="me">
    <vue-headful title="About | Coworkings.com" description="About page" />

    <!-- MENU -->
    <menucustom class="menu"></menucustom>

    <div class="info">
      <div class="header">
        <h1>¡Hey!👋</h1>
        <img src="../assets/me.jpeg" alt />
        <section class="contactos">
          <ul>
            <li>
              <i class="fa fa-envelope-o"></i> rubenpo167@gmail.com
            </li>
            <li>
              <i class="fab fa-whatsapp"></i> 639 063 381
            </li>
          </ul>
        </section>
      </div>

      <section class="welcome">
        Me llamo
        <a
          href="https://www.linkedin.com/in/rub%C3%A9n-p%C3%A9rez-outeiral-8b4b041a0/"
          target="_blank"
          alt="link a mi linkedin"
        >Rubén Pérez</a>
        y soy estudiante de programación full-stack, además de técnico en Robótica Industrial y Automatización.
        Soy un apasionado por la tecnología y el deporte, en especial el tenis 🎾. Este es uno de los proyectos que he realizado con
        mis conocimientos de programación web.
        <br />
        <br />Puedes ver el código del proyecto en
        <a
          href="https://github.com/rubii9/ProyectoHAB/tree/master/COWORK"
          target="_blank"
        >
          mi github
          <i class="fab fa-github"></i>
        </a>
      </section>

      <section class="tecnology">
        He usado principalmente Vue.js para el frontend del proyecto y para el backend he usado Node.js junto con mySQL.
        <div class="front">
          <h3>Front 🎨</h3>
          <ul>
            <li>
              <a href="https://vuejs.org/">Vue.js</a>
            </li>
            <li>
              <a href="https://sweetalert2.github.io/" target="_blank">SweetAlert2</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/vue-headful" target="_blank">Vue-Headful</a>
            </li>
            <li>
              <a href="https://loading.io/css/" target="_blank">CSS Loader Spiner</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/axios" target="_blank">Lottiefiles</a>
            </li>
          </ul>
        </div>
        <div class="back">
          <h3>Back ⚙️</h3>
          <ul>
            <li>
              <a href="https://www.mysql.com/">MySQL</a>
            </li>
            <li>
              <a href="https://nodejs.org/es/">Node.js</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/express" target="_blank">Express</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/express" target="_blank">Axios</a>
            </li>
            <li>
              <a href="https://sendgrid.com/" target="_blank">SendGrid</a>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <!--   FOOTER -->
    <footercustom class="footer"></footercustom>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";
//IMPORTANDO FOOTER
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Me",
  components: { menucustom, footercustom }
};
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
* {
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}

.menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
}

.me {
  background: #f7fbe1;
  color: #436f8a;
  background: url("../assets/fondologinregister.jpeg") no-repeat fixed;
  background-size: cover;
}

.info {
  background: #f7fbe1;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 5px 5px 5px rgba(228, 174, 25, 0.5);
  border: 2px solid white;
  border-radius: 30px;
  min-width: 600px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.tecnology {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem auto;
}

.contactos li {
  text-align: left;
  margin-left: 6rem;
}

.header {
  margin: 0.5rem;
}

.welcome {
  margin-top: 0.5rem;
}

i {
  color: black;
}

.info i {
  color: #436f8a;
}
a {
  color: #436f8a;
}
section.welcome a {
  font-weight: bold;
}

div.front,
div.back {
  margin: 1rem auto;
}
img {
  border-radius: 50%;
  max-width: 200px;
  max-height: 200px;
  margin: 1rem auto;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

h3 {
  text-align: center;
  margin: 0.5rem;
}
section {
  width: 70%;
  margin: 0 auto;
}
</style>