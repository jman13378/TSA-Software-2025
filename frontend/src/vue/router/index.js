import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import chat from "../views/Chat.vue";
import mf from "../views/mf.vue";
import { CredentialManager, socket } from "../../globals";
import ArchivePage from "../views/componenets/ArchivePage.vue"
import Map from "../views/components/Map.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/chat",
      name: "Chat",
      component: chat,
    },
    {
      path: "/archive",
      name: "Archive",
      component: ArchivePage,
    },
    {
      path: "/map",
      name: "Map",
      component: Map,
    },
    {
      path: "/logout",
      name: "Logout",
      beforeEnter: (to, from, next) => {
        socket.emit("logout");
      },
    },
    {
      path: "/sessionid/:token",
      name: "Session Id",
      component: mf,
      beforeEnter: (to, from, next) => {
        let token = to.params.token;
        if (token) {
          let cred = atob(token).split(".");

          CredentialManager.AddCheck(cred[0], cred[1], undefined, (res) => {});
        }
        if (to.params.id === "123") {
          next();
        } else {
          next({ name: "Home" });
        }
      },
    },
  ],
});

export default router;
