<template>
  <div class="menu">
    <div id="nav">
      <div class="logo">
        <router-link :to="{name:'Home'}">
          <img src="../assets/logo.png" alt />
        </router-link>
      </div>
      <div class="enlaces">
        <router-link :to="{name:'Home'}">Home</router-link>
        <span>|</span>
        <router-link
          :to="{ name: 'MyProfile', params:{ id: this.userID }}"
          v-show="logged"
        >Mi perfil</router-link>
        <span v-show="logged">|</span>
        <router-link :to="{name:'PostSpace'}" v-show="logged">Nuevo post</router-link>
        <span v-show="logged">|</span>
        <router-link :to="{name:'MyCoworking'}" v-show="logged">Mi coworking</router-link>
        <span v-show="logged">|</span>
        <router-link :to="{name:'MySpaces'}" v-show="logged">Mis publicaciones</router-link>
        <span v-show="logged">|</span>
        <router-link :to="{name:'About'}">Contacto</router-link>
      </div>
      <div class="user">
        <p>{{nombreUsuario}}</p>
        <button v-show="!logged" @click="goLogin()">Login</button>
        <button v-show="!logged" @click="goRegister()">Register</button>
        <button v-show="logged" @click="logoutUser()">Logout</button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { clearLogin, isLoggedIn } from "../api/utils";
export default {
  name: "MenuCustom",
  data() {
    return {
      nombreUsuario: "",
      userID: 0,
      logged: false
    };
  },
  methods: {
    logoutUser() {
      this.nombreUsuario = "";
      this.userID = 0;
      this.logged = false;
      this.$router.push("/");
      return clearLogin();
    },
    getUserName() {
      this.nombreUsuario = localStorage.getItem("Usuario");
      if (localStorage.getItem("userID")) {
        this.userID = localStorage.getItem("userID");
      } else {
        this.userID = 0;
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    }
  },
  created() {
    this.getUserName();
    if (isLoggedIn()) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }
};
</script>
<style scoped>
hr {
  height: 1px;
  background: black;
  margin: 0;
}
.menu {
  background: #436f8a;
}
.logo {
  width: 340px;
}
.logo img {
  max-height: 70px;
  max-width: 100px;
  display: block;
}
.user {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 340px;
}
.user p {
  color: #bac964;
  display: block;
  align-self: center;
  justify-self: center;
}

#nav {
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  margin: auto 0.5rem;
  color: #f7fbe1;
  text-decoration: none;
}

#nav a:hover {
  color: #f3bc46;
}

#nav a.router-link-exact-active {
  color: #bac964;
  text-decoration: underline;
  font-size: 1.15rem;
}
div .user {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
div .enlaces {
  color: #f7fbe1;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-self: center;
}
button {
  width: 120px;
  cursor: pointer;
  text-align: center;
  color: #474e51;
  background: #f3bc46;
  border: 2px solid #a7a398;
  border-radius: 10px;
  padding: 0.35rem;
  margin: 1rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #693662;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
@media (max-width: 700px) {
  #nav {
    font-size: 0.75rem;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  button {
    padding: 0.2rem;
    width: 60px;
  }
}
</style>
