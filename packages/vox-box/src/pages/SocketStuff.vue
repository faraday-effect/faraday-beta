<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Socket Stuff</h1>
        <ul>
          <li v-for="(msge, idx) in messages" :key="idx">{{ msge }}</li>
        </ul>
        Count {{ messageCount }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SocketStuff",

  data: function () {
    return {
      messages: [] as string[],
    };
  },

  computed: {
    messageCount(): number {
      console.log("MESSAGE COUNT THIS", this);
      return this.messages.length;
    },

    weirdRef(): string {
      return this.$weirdRef;
    },
  },

  weirdOption: {
    swashbuckler: "Zorro",
    theAnswer: 42,
    weirdBadPerson: "Bat Man",

    riddleMeThis: function () {
      return this.messages;
    },
  },

  methods: {
    append(...args: string[]): void {
      this.messages.push(args.join(" "));
    },
  },

  socketThing: {
    connect: function (): void {
      console.log("SOCKETS CONNECT THIS", this);
      this.append("Connected");
    },
  },

  sockets: {
    connect: function (): void {
      console.log("SOCKETS CONNECT THIS", this);
      this.append("Connected");
      this.$socket.client.emit("events", { test: "test" });
      this.$socket.client.emit("identity", 42, (response: any) =>
        this.messages.push(`Identity: ${response}`)
      );
      this.$socket.client.emit(
        "log-in",
        { first: "Tom", last: "Nurkkala" },
        (response: number) => this.messages.push(`RESPONSE ${response}`)
      );
    },

    disconnect: function (reason: string): void {
      this.messages.push(`disconnect (${reason})`);
    },

    events: function (data: any) {
      this.messages.push(`event ${data}`);
    },

    exception: function (data: any) {
      this.messages.push(`exception ${data}`);
    },

    now: function (now: string) {
      this.messages.push(`AT THE TONE ${now}`);
    },
  },
});
</script>
