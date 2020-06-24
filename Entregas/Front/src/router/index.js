import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error from "../views/Error.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { isLoggedIn } from "../api/utils";

Vue.use(VueRouter);

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authToken"
);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (isLoggedIn() === true) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Pero si ya estas logeado!",
        });
        next({
          path: "/home",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (isLoggedIn() === true) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Pero si ya estas logeado!",
        });
        next({
          path: "/home",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/spaceview/:id",
    name: "Space",
    component: () => import("../views/Space.vue"),
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      // RUTA PRIVADA
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/myprofile/:id",
    name: "MyProfile",
    component: () => import("../views/MyProfile.vue"),
    meta: {
      // RUTA PRIVADA
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/postSpace",
    name: "PostSpace",

    component: () => import("../views/PostSpace.vue"),
    meta: {
      // RUTA PRIVADA
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    name: Error,
    component: Error,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
