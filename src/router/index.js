import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import PostsViews from "../views/PostsViews.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsViews,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
