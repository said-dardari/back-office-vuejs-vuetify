import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Evenements from "@/components/Evenements";
import Gastronomies from "@/components/Gastronomies";
import Actualites from "@/components/Actualites";
import LieuxVisiter from "@/components/LieuxVisiter";
import Temoignages from "@/components/Temoignages";
import Partages from "@/components/Partages";
import Login from "@/components/Auth/Login";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { authOnly: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/evenements",
    name: "Evenements",
    component: Evenements,
    meta: { authOnly: true },
  },
  {
    path: "/gastronomies",
    name: "Gastronomies",
    component: Gastronomies,
    meta: { authOnly: true },
  },
  {
    path: "/actualites",
    name: "Actualites",
    component: Actualites,
    meta: { authOnly: true },
  },
  {
    path: "/lieux-a-visiter",
    name: "LieuxVisiter",
    component: LieuxVisiter,
    meta: { authOnly: true },
  },
  {
    path: "/temoignages",
    name: "Temoignages",
    component: Temoignages,
    meta: { authOnly: true },
  },
  {
    path: "/partages",
    name: "Partages",
    component: Partages,
    meta: { authOnly: true },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});



/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
*/
export default router

