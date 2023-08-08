<template>
  <div class="hero py-4 mt-12 sm:mt-16 md:mt-20 lg:mt-28">
    <div class="container mx-auto">
      <div class="grid gap-4 grid-cols-12 grid-rows-2">
        <div class="swiper-module col-span-12 sm:col-span-8 row-span-2">
          <TheSwipersVue :data="dataBanner" />
        </div>
        <div
          class="col-span-6 sm:col-span-4"
          v-for="(item, index) in dataLeftBanner"
          :key="index"
        >
          <img class="object-cover h-full" :src="item.image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios";
import { onMounted, ref } from "vue";

import TheSwipersVue from "./TheSwipers.vue";

const dataBanner = ref([]);
const dataLeftBanner = ref([]);

const fetchBannerData = () => {
  axios.get("/information/banner/").then((res) => {
    dataLeftBanner.value = res.data.slice(0, 2);
  });
};

const fetchBannerSlider = () => {
  axios.get("/information/slider/").then((res) => {
    dataBanner.value = res.data;
  });
};

onMounted(() => {
  fetchBannerData();
  fetchBannerSlider();
});
</script>
