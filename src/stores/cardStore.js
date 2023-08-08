import { defineStore } from "pinia";
export const useCardStore = defineStore("CardStore", {
  state: () => {
    const products = [];
    const byProducts = [];
    return { products, byProducts };
  },

  getters: {
    count() {
      return this.products.length;
    },
    allSum() {
      let sum = 0;
      for (let i = 0; i < this.products.length; i++) {
        sum += this.products[i].count * this.products[i].price;
      }
      return sum;
    },
  },
  actions: {
    addProduct(obj) {
      console.log(obj, "object");
      // this.products.push(obj);

      // const newByProduct = {
      //   id: obj.id,
      //   product_title: obj.name,
      //   ordered_amount: obj.count,
      // };
      // this.byProducts = this.byProducts.filter((item) => item.id !== obj.id);
      // this.byProducts.push(newByProduct);
    },
  },
  persist: true,
});
