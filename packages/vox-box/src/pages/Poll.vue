<template>
  <v-container>
    <v-row>
      <v-col>
        <component :is="details.widgetName" v-bind="details" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ChooseOne from "@/widgets/ChooseOne.vue";
import { WidgetContent } from "shared";

export default Vue.extend({
  name: "Poll",
  components: {
    ChooseOne,
  },

  data() {
    return {
      details: {},
    };
  },

  mounted() {
    this.$socket.client.on("poll", (details: WidgetContent) => {
      console.log("POLL", details);
      this.details = details;
    });
  },
});
</script>
