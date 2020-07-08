<template>
  <div>
    <div class="profile">
      <header>
        <img :src="profile.avatar ? path + profile.avatar : defaultAvatar" />
      </header>

      <h2>{{ profile.realName }}</h2>
      <p>{{ profile.city }}, {{ profile.community }}</p>
      <p v-show="showInfo">{{ profile.email }}</p>
      <p>Teléfono: {{ profile.phone ? profile.phone : "No añadido" }}</p>
      <p>{{ profile.role === "admin" ? "Administrador" : "Usuario" }}</p>
      <p>
        Registrado desde
        {{
          profile.registrationDate ? profile.registrationDate.substr(0, 10) : ""
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
  data() {
    return {
      defaultAvatar: "http://localhost:3001/uploads/defaultavatar.png",
      path: "http://localhost:3001/uploads/",
      showInfo: true,
      userID: 0,
    };
  },
  props: {
    profile: Object,
  },
  methods: {
    //CONSGUIR ID USUARIO Y COMPROBAR SI ES IGUAL A LA DEL PERFIL MOSTRADO
    checkInfo() {
      this.userID = localStorage.getItem("userID");
      if (this.$route.params.id != this.userID) {
        this.showInfo = false;
      } else {
        this.showInfo = true;
      }
    },
  },
  created() {
    this.checkInfo();
  },
  bedoreCreate() {
    this.checkInfo();
  },
};
</script>

<style scoped>
* {
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}

img {
  width: 200px;
  height: 200px;
  border: 2px solid #436f8a;
  border-radius: 50%;
}

p,
h2,
img {
  margin: 0.5rem auto;
}
</style>
