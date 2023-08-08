<template>
  <div class="main-page-section">
    <!-- <pre>{{ data }} data</pre> -->
    <swiper :slidesPerView="6" :spaceBetween="30" :slidesPerGroup="1" :autoplay="{
      delay: 2500,
    }" :loop="true" :loopFillGroupWithBlank="true" :pagination="{ clickable: true }" :navigation="true"
      :modules="modules" :breakpoints="{
        '375': {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        '480': {
          slidesPerView: 3,
          spaceBetween: 28,
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 28,
        },
        '1020': {
          slidesPerView: 5,
          spaceBetween: 28,
        },
        '1370': {
          slidesPerView: 6,
          spaceBetween: 28,
        },
      }" class="mySwiper pb-6">
      <swiper-slide v-for="item in data" :key="item">
        <div
          class="swiper-card text-left relative border-b-none border border-transparent border-solid pt-[20px] pr-[20px] pb-0 max-w-[250px]">
          <div class="relative overflow-hidden">
            <router-link :to="'shop/' + item.id" class="cursor-pointer">
              <img :src="item.banner" alt="swiper images" class="w-full" />
            </router-link>
            <div
              class="position-text absolute top-0 right-0 text-white text-[14px] font-semibold leading-5 px-[10px] py-[5px] rounded bg-[#f14705]"
              v-if="item.sold_out">
              {{ $t("sale") }}
            </div>
          </div>
          <div class="pt-[10px]">
            <router-link :to="'shop/' + item.id"
              class="block pb-[8px] mb-[13px] leading-[12px] text-[12px] text-black border-b border-[#e1e1e1] border-solid cursor-pointer">
              Homeshop
            </router-link>
            <div class="font-[400]">
              <div class="text-[#690] text-[16px] font-semibold mb-[10px]">
                {{ numberFunction(item.discount) }} UZS <br />
                <div class="mt-[-4px]" :class="
                  item.price != item.discount ? 'opacity-1' : 'opacity-0'
                ">
                  <del class="text-[12px] text-[red]">{{ numberFunction(item.price) }} UZS</del>
                  <small class="ml-[4px] text-[red]" v-if="false">{{ callPrice(item.discount, item.price) }}%
                    off</small>
                </div>
              </div>
              <router-link :to="'shop/' + item.id"
                class="product__title cursor-pointer m-0 block text-[14px] leading-[1.2em] pb-[5px] pl-0 text-[#06c] pr-[1rem] overflow-hidden hover:text-[#fcb800] line-clamp-3 lg:line-clamp-2">
                {{ item.sub_title }}
              </router-link>
              <!-- <div class="block my-[6px]">
                <span class="ml-0 flex gap-[10px] items-center">
                  <i
                    class="fa fa-star text-[#fcb800] mr-[2px] w-[10px] text-[14px]"
                    v-for="item in 4"
                    :key="item"
                  ></i
                  ><i
                    class="fa-regular fa-star text-[#999] mr-0 w-[10px] text-[14px]"
                  ></i
                ></span>
                <span></span>
              </div> -->
              <div class="block w-full mt-[10px]">
                <div class="mb-[5px] relative block h-[11px] bg-[#e4e4e4]">
                  <span style="width: 80%; transform: translateY(-50%)"
                    class="absolute top-1/2 left-0 h-full bg-[#0D985D]"></span>
                </div>
                <p class="mb-0 text-[#666] text-[14px] font-[400]">
                  {{ $t("sold") }}: {{ item.sold_amount }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper";
import numberFunction from "../helpers/formatNumber";

const modules = [Pagination, Navigation, Autoplay];

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const callPrice = (old, now) => {
  return Math.floor((old / now) * 100 - 100);
};
</script>

<style scoped>
@import "swiper/swiper-bundle.css";

.swiper {
  width: 100%;
  height: 100%;
  padding-bottom: 2rem;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev {
  width: 50px !important;
  background-color: black;
}

.swiper-button-prev {
  color: #746b6b !important;
}

.swiper-button-next {
  width: 50px;
  background-color: black;
}

/* slider item */

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
