<template>
  <div>
    <div class="profile" v-for="profile in users" :key="profile.id">
      <img :src="profile.avatar ?  path + profile.avatar : defaultAvatar " />
      <router-link
        :to="{ name:  (profile.id == userID) ? 'MyProfile':'Profile', params:{ id: profile.id }}"
      >{{ profile.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SomeUsers",
  data() {
    return {
      defaultAvatar: "http://localhost:3001/uploads/defaultavatar.png",
      path: "http://localhost:3001/uploads/",
      userID: 0
    };
  },
  props: {
    users: Array
  },
  methods: {
    checkInfo() {
      this.userID = localStorage.getItem("userID");
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
  height: 30px;
  width: 30px;
  border: 1px solid #436f8a;
  border-radius: 20px;
  display: block;
  margin: 0 0.5rem;
}
a {
  padding: 0.25rem;
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  color: #436f8a;
}

a:hover {
  color: #f3bc46;
  font-weight: bold;
}
.profile {
  display: flex;
  justify-content: baseline;
  margin-bottom: 0.5rem;
}
</style>