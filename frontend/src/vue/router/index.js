import { createWebHistory, createRouter } from "vue-router";
import chat from "../views/Chat.vue";
import { CredentialManager, socket } from "../../globals";
import ArchivePage from "../views/componenets/ArchivePage.vue"
const router = createRouter({
  history: createWebHistory(),
  routes: [

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
