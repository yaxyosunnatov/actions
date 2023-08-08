<template>
  <div class="cont w-80 bg-white flex flex-col justify-between relative z-[1000]">
    <div v-if="!store.count" class="h-[300px] mx-auto py-5">
      <p>{{ $t("emptyCard") }}</p>
    </div>

    <div v-else>
      <div class="shoopingItems bg-slate-000 space-y-3 overflow-y-auto min-h-[8rem] max-h-80">
        <div v-for="(item, i) in store.products" :key="i"
          class="cradItem w-full hover:bg-gray-50 p-3 pr-5 flex justify-between items-start gap-3 text-sm">
          <div>
            <img :src="item.img" alt="cardItemImg" class="w-24" />
          </div>
          <div class="content">
            <h3 class="">
              <RouterLink class="text-blue-500 line-clamp-1" :to="'/shop/' + item.id">{{ item.name }}</RouterLink>
            </h3>
            <p>
              <b class="opacity-100">Solid by: </b>
              <span class="opacity-60">Young shop</span>
            </p>
            <div class="cost mt-2">
              {{ item.count }} x {{ numberFunction(item.price) }} UZS
            </div>
          </div>
          <div class="close text-lg" @click="deleteProduct(item.id)">
            <i class="fa-solid fa-xmark cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div class="totalAndView w-full flex flex-col p-3">
        <div class="sub_total flex justify-between">
          <h3 class="font-bold text-base">{{ $t("totalSum") }}</h3>
          <h3 class="font-bold text-red-600 text-base">
            {{ numberFunction(store.allSum) }} UZS
          </h3>
        </div>
        <div class="buttons flex justify-between mt-4">
          <ButtonPrimaryVue link="/shoppingCart" class="w-[45%]">
            {{ $t("viewCard") }}
          </ButtonPrimaryVue>
          <ButtonPrimaryVue link="/choosenProducts" class="w-[45%]">{{
              $t("checkout")
          }}</ButtonPrimaryVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ButtonPrimaryVue from "../ButtonPrimary.vue";

import { useCardStore } from "../../stores/cardStore";
import numberFunction from "../../helpers/formatNumber";
const store = useCardStore();

const deleteProduct = (id) => {
  store.products = store.products.filter((item) => item.id !== id);
  store.byProducts = store.byProducts.filter((item) => item.product_id !== id);
};
</script>
<style scoped>

</style>
