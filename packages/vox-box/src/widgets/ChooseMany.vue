<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-format-list-checkbox</v-icon>
      {{ prompt }}
    </v-card-title>
    <v-card-subtitle>
      Choose {{ allowNone ? "zero" : "one" }} or more
    </v-card-subtitle>
    <v-card-text>
      <v-checkbox
        v-for="choice in choices"
        :key="choice.key"
        v-model="response"
        :label="choice.value"
        :value="choice.key"
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
import Vue, { PropType } from "vue";
import { OneChoice } from "shared";

export default Vue.extend({
  name: "ChooseMany",

  props: {
    prompt: { type: String, required: true },
    choices: { type: Array as PropType<OneChoice[]>, required: true },
    allowNone: { type: Boolean, default: false },
  },

  data() {
    return {
      response: [],
    };
  },

  computed: {
    canSubmit(): boolean {
      return this.allowNone || this.response.length > 0;
    },
  },

  methods: {
    clear() {
      this.response = [];
    },
    submit() {
      this.$emit("submit", this.response);
    },
  },
});
</script>
