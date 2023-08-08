<template>
  <swiper
    :navigation="true"
    :loop="true"
    :modules="modules"
    :autoplay="{
      delay: 2500,
    }"
    class="mySwiper h-full"
  >
    <swiper-slide v-for="i in data" :key="i">
      <img class="h-full w-full object-cover" :src="i.image" alt="swiper-img" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css/navigation";
import "swiper/css";

import { Navigation, Autoplay } from "swiper";
const modules = [Navigation, Autoplay];

defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.heroSwiper .swiper-button-prev,
.heroSwiper .swiper-button-next {
  background-color: #0d985d;
  padding: 5px;
}

.heroSwiper .swiper-button-prev::after {
  font-size: 10px;
}
</style>
