<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-format-list-checkbox</v-icon>
      {{ prompt }}
    </v-card-title>
    <v-card-subtitle>Choose one</v-card-subtitle>
    <v-card-text>
      <v-radio-group v-model="response" row>
        <v-radio
          v-for="choice in choices"
          :key="choice.key"
          :label="choice.value"
          :value="choice.key"
        />
      </v-radio-group>
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
  name: "ChooseOne",

  props: {
    prompt: { type: String, required: true },
    choices: { type: Array as PropType<OneChoice[]>, required: true },
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
