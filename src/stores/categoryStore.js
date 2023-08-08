import { defineStore } from "pinia";
export const useCategoryStore = defineStore("CategoryStore", {
  state: () => {
    const category = [];
    return { category };
  },
});
