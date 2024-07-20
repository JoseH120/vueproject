import { createRouter, createWebHistory } from "vue-router";
import Admin from "../views/Admin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Admin,
    },
    {
      path: "/signin",
      name: "Signin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Signin.vue"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/Signup.vue"),
    },

    {
      path: "/post/:id",
      name: "Post",
      component: () => import("../views/Post.vue"),
    },
  ],
});

export default router;
