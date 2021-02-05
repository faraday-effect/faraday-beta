import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import store from "../store";

const socket = io("http://localhost:3000");

socket.on("connect", function () {
  store.commit("socketConnected", socket.id);
  if (store.getters.isLoggedIn) {
    const claims = store.state.claims;
    socket.emit("log-in", {
      id: claims.id,
      firstName: claims.firstName,
      lastName: claims.lastName,
      email: claims.email,
    });
  }
});

socket.on("disconnect", function () {
  store.commit("socketDisconnected");
});

Vue.use(VueSocketIOExt, socket);
