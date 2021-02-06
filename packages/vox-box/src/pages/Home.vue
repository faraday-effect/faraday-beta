<template>
  <v-container>
    <v-row>
      <v-col>
        <big-button
          icon-name="mdi-hand"
          text="Raise your hand to ask a question"
        />
      </v-col>
      <v-col>
        <thumbs-up-down prompt="Is that right?!" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <short-answer prompt="What is your quest?" />
      </v-col>
      <v-col>
        <choose-one
          prompt="What is your favorite color?"
          :choices="colorChoices"
        />
      </v-col>
      <v-col>
        <choose-many prompt="What's for dinner?" :choices="mealChoices" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BigButton from "@/widgets/BigButton.vue";
import ShortAnswer from "@/widgets/ShortAnswer.vue";
import { OneChoice } from "../../../../shared/widgets.types";
import ChooseOne from "@/widgets/ChooseOne.vue";
import ChooseMany from "@/widgets/ChooseMany.vue";
import ThumbsUpDown from "@/widgets/ThumbsUpDown.vue";

export default Vue.extend({
  name: "Home",
  components: {
    ThumbsUpDown,
    ChooseOne,
    ChooseMany,
    ShortAnswer,
    BigButton,
  },

  data() {
    return {
      colorChoices: [
        { key: "r", value: "Red" },
        { key: "g", value: "Green" },
        { key: "b", value: "Blue" },
      ] as OneChoice[],
      mealChoices: [
        { key: "burger", value: "Hamburger" },
        { key: "chicken", value: "Chicken Sandwich" },
        { key: "soda", value: "Diet Coke" },
        { key: "trout", value: "Lake Trout" },
      ],
    };
  },
});
</script>
