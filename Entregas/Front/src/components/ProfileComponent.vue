<template>
  <div>
    <div class="profile">
      <img :src="profile.avatar ?  path + profile.avatar : defaultAvatar " />
      <p>Nombre: {{ profile.realName }}</p>
      <p v-show="showInfo">Email: {{ profile.email }}</p>
      <p>Miembro desde: {{ profile.registrationDate.substr(0,10)}}</p>
      <p v-show="showInfo">Teléfono: {{profile.phone}}</p>
      <p>{{ profile.city }}, {{profile.community}}</p>
      <p v-show="showInfo">Rol: {{profile.role}}</p>
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
      userID: 0
    };
  },
  props: {
    profile: Object
  },
  methods: {
    checkInfo() {
      this.userID = localStorage.getItem("userID");
      if (this.$route.params.id != this.userID) {
        this.showInfo = false;
      } else {
        this.showInfo = true;
      }
    }
  },
  created() {
    this.checkInfo();
  },
  bedoreCreate() {
    this.checkInfo();
  }
};
</script>

<style scoped>
img {
  height: 400px;
  width: 400px;
}
</style>