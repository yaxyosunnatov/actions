<template>
  <div class="container">
    <div class="banner-categories mt-[30px] lg:mt-[90px]">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="w-full" v-for="(item, index) in bannerData" :key="index">
          <img :src="item.image" alt="banner-img" class="w-full h-full" />
        </div>
      </div>
    </div>
    <div class="product-categories mt-[50px]">
      <h2 class="font-semibold text-[20px] leading-[1em] text-black mb-[20px]">
        {{ $t("category") }}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xll:grid-cols-8 gap-6" v-if="data">
        <router-link to="/category/0"
          class="categories-section flex flex-col justify-center items-center border border-[#bfbfbf] cursor-pointer px-[10px] py-[20px]"
          v-for="(item, index) in data" :key="index">
          <img :src="item.image" alt="img" class="categories-img" />
          <p class="text-[#6b6b6b] categories-text">{{ item.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "@/plugins/axios";

const bannerData = ref([]);
const data = ref([]);
const productsData = [
  {
    title: "Electronics",
    img: "https://vuestorefronts.com/_nuxt/img/1.2ce1d51.jpg",
  },
  {
    title: "Clothings",
    img: "https://vuestorefronts.com/_nuxt/img/2.c920612.jpg",
  },
  {
    title: "Computers",
    img: "https://vuestorefronts.com/_nuxt/img/3.4dd1f5e.jpg",
  },
  {
    title: "Home & Kitchen",
    img: "https://vuestorefronts.com/_nuxt/img/4.1c054cc.jpg",
  },
  {
    title: "Health & Beauty",
    img: "https://vuestorefronts.com/_nuxt/img/5.cf89506.jpg",
  },
  {
    title: "Health & Beauty",
    img: "https://vuestorefronts.com/_nuxt/img/6.c7fe10e.jpg",
  },
  {
    title: "Jewelry & Watch",
    img: "https://vuestorefronts.com/_nuxt/img/7.8e65d3d.jpg",
  },
  {
    title: "Technology Toys",
    img: "https://vuestorefronts.com/_nuxt/img/8.24a3c9f.jpg",
  },
];

onMounted(() => {
  axios.get("/information/banner/").then((res) => {
    bannerData.value = res.data.slice(2, 5);
  });
  axios.get("/menu/category-images/").then((res) => {
    console.log(res, "banner");
    data.value = res.data.results;
  });
});
</script>

<style scoped>
.categories-section {
  transition: all 0.6s;
}

.categories-section:hover {
  border: 1px solid #fcb800;
}

.categories-section:hover .categories-text {
  color: #1976d2;
}
</style>
