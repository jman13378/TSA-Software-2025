<template>
    <nav style="margin-bottom: 1%">
      <div class="nav-wrapper indigo">
        <img style="height: auto; width: auto; max-height: -webkit-fill-available" src="https://firebasestorage.googleapis.com/v0/b/twetzel-a07f2.appspot.com/o/logo.png?alt=media&token=03163384-242a-4530-9d14-3409521b721a" class="center brand-logo" />
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/chat">Chat</router-link></li>
          <li><router-link to="/archive">Archive</router-link></li>
  
  
          <li><a :onclick="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <router-view />
  </template>
  <script>
  import { socket, CredentialManager } from "../globals";
  
  export default {
    async mounted() {
      // if (await CredentialManager.Validate()) {
      //   this.$router.push("/chat")
      // } else {
      //   this.$router.push("/login")
      // }
    },
    methods: {
      logout() {window.location.href= `http://localhost/socket/logout/${socket.id}`},
    },
  };
  </script>
  