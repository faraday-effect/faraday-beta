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
      return this.messages.length;
    },
  },

  methods: {
    append(...args: string[]): void {
      this.messages.push(args.join(" "));
    },
  },

  mounted() {
    this.$socket.client.on("currentConnections", (connections: any) =>
      console.log(connections)
    );
  },
});
</script>
