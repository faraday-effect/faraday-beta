<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-thumbs-up-down</v-icon>
      {{ prompt }}
    </v-card-title>
    <v-card-subtitle>Choose one</v-card-subtitle>
    <v-card-actions>
      <v-row>
        <v-col>
          <big-button
            icon-name="mdi-thumb-up"
            :text="upText"
            @click="click(ThumbDirection.Up)"
          />
        </v-col>
        <v-col>
          <big-button
            icon-name="mdi-thumb-down"
            :text="downText"
            @click="click(ThumbDirection.Down)"
          />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import BigButton from "@/widgets/BigButton.vue";
import { ThumbDirection } from "../../../../shared/widgets.types";

export default Vue.extend({
  name: "ThumbsUpDown",
  components: { BigButton },

  props: {
    prompt: { type: String, default: "Vote up or down" },
    upText: { type: String, default: "Agree" },
    downText: { type: String, default: "Disagree" },
  },

  methods: {
    click(which: ThumbDirection) {
      this.$emit("click", which);
    },
  },
});
</script>
