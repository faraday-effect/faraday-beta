import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $weirdRef: string;
  }
}

type DefaultMethods<V> = { [key: string]: (this: V, ...args: any[]) => any };

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    weirdOption?: { [k: string]: any };
    socketThing?: DefaultMethods<V>;
  }
}
