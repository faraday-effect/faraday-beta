import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import apolloProvider from "./plugins/apollo";

Vue.config.productionTip = false;

import io from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected");

  socket.emit("events", { test: "test" });
  socket.emit("identity", 42, (response: any) =>
    console.log("Identity:", response)
  );
  socket.emit(
    "log-in",
    {
      first: "Tom",
      last: "Nurkkala",
    },
    (response: number) => console.log("RESPONSE", response)
  );
});

socket.on("disconnect", (reason: string) =>
  console.log(`disconnect (${reason})`)
);

socket.on("events", function (data: any) {
  console.log("event", data);
});

socket.on("exception", function (data: any) {
  console.log("exception", data);
});

socket.on("now", (now: string) => console.log("AT THE TONE", now));

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
