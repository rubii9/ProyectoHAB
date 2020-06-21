import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error from "../views/Error.vue";
import axios from "axios";

Vue.use(VueRouter);

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authToken"
);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
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
