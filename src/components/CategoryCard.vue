<template>
  <div v-for="(item, index) in store.prosucts" :key="index">
    <div
      class="swiper-card text-left relative border-b-none border border-transparent border-solid pt-[20px] pr-[20px] pb-0 max-w-[250px]">
      <div class="relative overflow-hidden">
        <router-link :to="'/shop/' + item.id" class="cursor-pointer">
          <img :src="item.banner" alt="swiper images" class="w-full" />
        </router-link>
        <div
          class="position-text absolute top-0 right-0 text-white text-[14px] font-semibold leading-5 px-[10px] py-[5px] rounded bg-[#f14705]"
          v-if="item.sold_out">
          {{ $t("sale") }}
        </div>
      </div>
      <div class="pt-[10px]">
        <router-link :to="'/shop/' + item.id"
          class="block pb-[8px] mb-[8px] leading-[12px] text-[12px] text-black border-b border-[#e1e1e1] border-solid cursor-pointer">
          Homeshop
        </router-link>
        <div class="font-[400]">
          <div class="text-[#690] text-[16px] font-semibold mb-[8px]">
            {{ numberFunction(item.discount) }} UZS <br />
            <div class="mt-[-4px]" :class="item.price != item.discount ? 'opacity-1' : 'opacity-0'">
              <del class="text-[12px] text-[red]">{{ numberFunction(item.price) }} UZS</del>
            </div>
          </div>
          <router-link :to="'/shop/' + item.id"
            class="product__title cursor-pointer m-0 block text-[14px] leading-[1.2em] pb-[5px] pl-0 text-[#06c] pr-[1rem] overflow-hidden hover:text-[#fcb800]">
            {{ item.description }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "../stores/searchStore";
import numberFunction from "../helpers/formatNumber";
const store = useSearchStore();
</script>

<style scoped>
.product__title {
  --max-lines: 2;
  max-height: calc(1.2em * var(--max-lines));
  transition: all 0.6s;
}

.swiper-card {
  transition: all 0.6s;
}

.position-text {
  transition: all 0.6s;
}

.swiper-card:hover .position-text {
  background-color: #0D985D;
}

.swiper-card:hover .product__title {
  color: #0D985D;
}
</style>
