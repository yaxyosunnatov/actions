import { defineStore } from "pinia";

export const useSearchStore = defineStore("SearchStore", {
  state: () => {
    const prosucts = [];
    const allProducts = [];

    return { prosucts, allProducts };
  },
});
