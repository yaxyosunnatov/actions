<template>
  <div class="flex flex-col gap-4 items-center w-full">
    <swiper
      :loop="true"
      :navigation="true"
      :spaceBetween="10"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="singleSwiper h-96 w-96 mmd:w-72 lg:w-80"
    >
      <swiper-slide><img class="w-full" :src="bannerImg" /></swiper-slide>
      <swiper-slide v-for="item in bottomImg" :key="item"
        ><img :src="item.image"
      /></swiper-slide>
    </swiper>

    <swiper
      @swiper="setThumbsSwiper"
      :loop="true"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiperThumb hidden lg:block w-96 opacity-80"
    >
      <swiper-slide><img :src="bannerImg" /></swiper-slide>
      <swiper-slide v-for="item in bottomImg" :key="item"
        ><img :src="item.image"
      /></swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Thumbs, Navigation } from "swiper";
const modules = reactive([FreeMode, Navigation, Thumbs]);

let thumbsSwiper = ref(null);

function setThumbsSwiper(swiper) {
  thumbsSwiper.value = swiper;
}

defineProps({
  bannerImg: {
    type: String,
    required: true,
  },
  bottomImg: {
    type: Array,
    required: true,
  },
});
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  transition-duration: 300ms;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover,
.swiper-button-next:active,
.swiper-button-prev:active {
  background-color: #0d985d;
  color: #fff;
}

.swiper-pagination-bullet-active {
  background-color: #0d985d;
}

.swiper-slide-thumb-active {
  border: 2px solid yellow;
}

@media (min-width: 800px) {
  .singleSwiper .swiper-button-next,
  .singleSwiper .swiper-button-prev {
    display: none;
  }
}
</style>
