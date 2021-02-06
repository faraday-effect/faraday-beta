<template>
  <v-card hover @click="$emit('click')">
    <v-card-title>
      <v-icon class="mr-2">{{ iconName }}</v-icon>
      {{ text }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BigButton",

  props: {
    iconName: { type: String, required: true },
    text: { type: String, required: true },
  },
});
</script>
