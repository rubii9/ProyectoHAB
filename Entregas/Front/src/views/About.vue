<template>
  <div class="about">
    <vue-headful title="Contacto" description="About page" />
    <menucustom></menucustom>
    <h1>Contacta con nosotros:</h1>
    <form>
      <label for="email">Email:</label>
      <input type="email" required v-model="email" />
      <label for="commentary">Commentary:</label>
      <textarea
        name="comentary"
        placeholder="Commentary..."
        v-model.trim="comentary"
        rows="10"
        cols="50"
      />
    </form>
    <button>Enviar</button>
  </div>
</template>
<script>
//IMPORTANDO MENU
import menucustom from "@/components/MenuCustom.vue";

export default {
  name: "About",
  components: { menucustom },
  data() {
    return {
      email: "",
      commentary: ""
    };
  }
};
</script>
