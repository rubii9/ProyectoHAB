<template>
  <div class="footer">
    <hr />
    <footer>
      <div class="logo">
        <img src="../assets/logo.png" alt />

        <p>
          COWORKS!
          <br />Aplicación web gestión de coworking, realizada por Rubén Pérez para Hack a Boss.
        </p>
      </div>

      <nav>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/rub%C3%A9n-p%C3%A9rez-outeiral-8b4b041a0/">
              <i class="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/rubii__9/">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/rubii9">
              <i class="fab fa-github"></i>
            </a>
          </li>
        </ul>
        <blockquote>@Rubén Pérez Outeiral 2020</blockquote>
      </nav>

      <lottie-player
        src="https://assets5.lottiefiles.com/private_files/lf30_dDab5c.json"
        background="transparent"
        speed="1"
        style="width: 350px; height: 100px;"
        loop
        autoplay
        class="animation"
      ></lottie-player>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterCustom"
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
.footer {
  background: #436f8a;
  text-align: center;
}
.logo {
  display: flex;
  width: 350px;
}

p {
  padding: 1rem;
  display: block;
}
hr {
  height: 1px;
  background: black;
}
ul {
  list-style: none;
  margin: 0 auto;
}

li {
  margin: 0.5rem;
}
a {
  font-size: 2rem;
  color: black;
  display: block;
}
img {
  height: 100px;
  width: 100px;
  padding: 1rem;
  margin: 0;
}
nav ul {
  display: flex;
  justify-content: center;
  align-content: center;
}

footer {
  margin: 0 auto;
  padding: 1rem;
  color: #bac964;
  font-weight: 300;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
</style>