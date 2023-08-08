<template>
  <LoadingVue v-if="isLoading" />
  <HeroCompVue />
  <SupportCompVue />
  <ElectronicsCategories :data="slider1" />
  <TheCategoriesVue />
  <ClothingSlider :data="slider2" />
  <GardenSlider :data="slider3" />
  <VannaSliderVue :data="slider4" />
</template>

<script setup>
import axios from "@/plugins/axios";
import HeroCompVue from "../components/hero/HeroComp.vue";
import SupportCompVue from "../components/support/SupportComp.vue";
import TheCategoriesVue from "../components/categories/TheCategories.vue";
import ElectronicsCategories from "../components/electronics/ElectronicsCategories.vue";
import ClothingSlider from "../components/clothings/ClothingSlider.vue";
import GardenSlider from "../components/garden/GardenSlider.vue";
import VannaSliderVue from "../components/vanna/VannaSlider.vue";
import { onMounted, ref } from "vue";
import LoadingVue from "../components/LoadingVue.vue";

import { useSearchStore } from "@/stores/searchStore";

const store = useSearchStore();
const isLoading = ref(false);
const categoriesSlider = ref([]);
const slider1 = ref([]);
const slider2 = ref([]);
const slider3 = ref([]);
const slider4 = ref([]);

const fetchProductAll = () => {
  isLoading.value = true;
  axios
    .get("/product-app/all-products/")
    .then((res) => {
      categoriesSlider.value = res.data.results;
      store.prosucts = res.data.results;
      store.allProducts = res.data.results;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const fetchProduct1 = () => {
  axios.get("/product-app/all-products/?ordering=-sold_amount").then((res) => {
    slider1.value = res.data.results;
  });
};
const fetchProduct2 = () => {
  axios.get("product-app/slider-products/1/").then((res) => {
    slider2.value = res.data.results;
  });
};
const fetchProduct3 = () => {
  axios.get("product-app/slider-products/2/").then((res) => {
    slider3.value = res.data.results;
  });
};
const fetchProduct4 = () => {
  axios.get("product-app/slider-products/3/").then((res) => {
    slider4.value = res.data.results;
  });
};

onMounted(() => {
  fetchProductAll();
  fetchProduct1();
  fetchProduct2();
  fetchProduct3();
  fetchProduct4();
});
</script>
