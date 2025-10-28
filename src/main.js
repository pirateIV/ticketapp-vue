import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./styles/index.css"

import Landing from "./pages/Landing.vue"
import Login from "./pages/Login.vue"
import Signup from "./pages/Signup.vue"
import Dashboard from "./pages/Dashboard.vue"
import Tickets from "./pages/Tickets.vue"
import { useSession } from "./composables/useSession"

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useSession()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/auth/login")
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount("#app")
