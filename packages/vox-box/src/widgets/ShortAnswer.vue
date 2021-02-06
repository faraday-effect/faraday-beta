<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-pen</v-icon>
      {{ prompt }}
    </v-card-title>
    <v-card-text>
      <v-textarea
        v-model="response"
        filled
        rows="3"
        placeholder="Enter your response"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="clear">Clear</v-btn>
      <v-btn text color="primary" :disabled="!canSubmit" @click="submit">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ShortAnswer",

  props: {
    prompt: { type: String, required: true },
  },

  data() {
    return {
      response: "",
    };
  },

  computed: {
    canSubmit(): boolean {
      return this.response.length > 0;
    },
  },

  methods: {
    clear() {
      this.response = "";
    },
    submit() {
      this.$emit("submit", this.response);
    },
  },
});
</script>
