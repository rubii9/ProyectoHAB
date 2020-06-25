<template>
  <div class="about">
    <vue-headful title="About" description="About page" />
    <menucustom></menucustom>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";

export default {
  name: "About",
  components: { menucustom },
};
</script>
