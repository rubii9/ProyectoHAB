<template>
  <div>
    <div class="profile">
      <img :src="profile.avatar ?  path + profile.avatar : defaultAvatar " />
      <p>Nombre: {{ profile.realName }}</p>
      <p>Email: {{ profile.email }}</p>
      <p>Miembro desde: {{ profile.registrationDate}}</p>
      <p>Contact: {{profile.phone}}</p>
      <p>{{ profile.city }}, {{profile.community}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
  data() {
    return {
      defaultAvatar: "http://localhost:3001/uploads/defaultavatar.png",
      path: "http://localhost:3001/uploads/"
    };
  },
  props: {
    profile: Object
  }
};
</script>

<style scoped>
img {
  height: 400px;
  width: 400px;
}
</style>