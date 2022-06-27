import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login/Login.vue";
import Main from "@/views/Main/Main.vue";
import Home from "@/views/Main/Home/Home.vue";
import Users from "@/views/Main/Users/Users.vue";
import NotFound from "@/views/NotFound/NotFound.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    redirect: {
      name: "Home",
    },
    children: [
      {
        alias: "",
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  // },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
