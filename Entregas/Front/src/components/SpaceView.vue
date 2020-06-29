<template>
  <div class="spaceview">
    <div class="space">
      <h1 class="nombre">{{ space.name }}</h1>
      <img class="foto" :src="space.photo1 ?  path + space.photo1 : ''" alt />
      <div class="description">
        <div class="textinfo">
          <p>
            <strong>Tipo:</strong>
            {{ space.type }}
          </p>
          <p>
            <strong>Ubicación:</strong>
            {{ space.city }}, {{ space.community }}
          </p>
          <p>
            <strong>Dirección:</strong>
            {{ space.adress }}
          </p>
          <p>
            <strong>Descripción:</strong>
            {{ space.description }}
          </p>
          <p>
            <Strong>Equipamiento:</Strong>
            {{ space.equipment }}
          </p>
          <p>
            <strong>Precio:</strong>
            : {{space.price}}€
          </p>
        </div>
      </div>

      <div class="comments">
        <h2>Comentarios</h2>
        <div v-for="comment in comments" :key="comment.id">
          <p class="comentario">
            <router-link
              :to="{ name:  (comment.user_id == userID) ? 'MyProfile':'Profile', params:{ id: comment.user_id }}"
            >{{ comment.name }}:</router-link>
            {{ comment.comment }}. {{ comment.score }} ⭐
          </p>
        </div>
        <star-rating
          class="estrellas"
          :inline="inline"
          :star-size="startSize"
          :read-only="onTrue"
          :rating="Number(space.score)"
          :fixed-points="fixedPoints"
          :increment="increment"
        ></star-rating>

        <p class="total">Votos totales: {{totalvotes}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "SpaceView",
  components: {
    StarRating
  },
  data() {
    return {
      path: "http://localhost:3001/uploads/",
      inline: true,
      startSize: 30,
      onTrue: true,
      onFalse: false,
      increment: 0.01,
      fixedPoints: 2,
      userID: 0
    };
  },
  props: {
    space: Object,
    comments: Array,
    totalvotes: Number
  },
  methods: {
    info() {
      this.userID = localStorage.getItem("userID");
    }
  },
  created() {
    this.info();
  }
};
</script>

<style scoped>
.space {
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 30px 1px;
  grid-template-areas: "nombre nombre" "foto foto" "description comments" "precio precio";
}

.nombre {
  grid-area: nombre;
}

.foto {
  grid-area: foto;
  margin: 0 auto;
}

.desciption {
  grid-area: desciption;
}

.comments {
  grid-area: comments;
}

.equipment {
  grid-area: equipment;
}

.rating {
  grid-area: rating;
}

.precio {
  grid-area: precio;
}

.comentario {
  margin: 0.5rem;
}

.estrellas {
  margin-top: 1rem;
}

div.textinfo {
  margin: auto 2rem;
}

h1 {
  font-size: 3rem;
  margin: 0.5rem;
  margin-top: 1.5rem;
}

img {
  height: 600px;
  width: 800px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(67, 111, 138, 0.7);
}

a {
  color: #436f8a;
  font-weight: bold;
}
p.total {
  font-size: 0.85rem;
}
</style>
