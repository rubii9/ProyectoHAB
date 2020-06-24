<template>
  <div class="menu">
    <div id="nav">
      <div class="enlaces">
        <router-link :to="{name:'Home'}">Home</router-link>
        <router-link :to="{ name: 'Profile', params:{ id: this.userID }}" v-show="logged">Mi perfil</router-link>
        <router-link :to="{name:'About'}">About</router-link>
      </div>

      <div class="user">
        <p>{{nombreUsuario}}</p>
        <button v-show="!logged" @click="goLogin()">Login</button>

        <button v-show="logged" @click="logoutUser()">Logout</button>
      </div>
    </div>
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
.user {
  display: flex;
  justify-content: center;
  align-content: center;
}
.user p {
  margin: 0 1rem;
  padding: 1rem;
}

#nav {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  margin: auto 0.25rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
div .user {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
div .enlaces {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
button {
  width: 80px;
  cursor: pointer;
  text-align: center;
  color: white;
  background: #42b983;
  border: 2px solid #d6cdb6;
  border-radius: 20px;
  padding: 0.5rem;
  margin: 0.667rem;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}
button:hover {
  background-color: #008cba;
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
