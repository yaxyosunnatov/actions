<template>
  <footer class="py-4 mt-6 sm:p-6 bg-[#0D985D] text-white mb-20 lg:mb-0">
    <div class="container">
      <div class="grid grid-cols-12 gap-6 text-center sm:text-start justify-between">
        <div class="col-span-12 md:col-span-8 text-justify leading-relaxed">
          <div class="pr-4 float-left">
            <RouterLink to="/">
              <h1 @click="scrollTop" class="text-[16px] ms:text-[20px] lg:text-[24px] font-bold text-black">
                HOME<span class="text-white">SHOP</span>
              </h1>
            </RouterLink>
          </div>
          {{ $t("footerTitle") }}
        </div>
        <div class="hidden md:block md:col-span-1"></div>
        <!-- <div class="col-span-6 md:col-span-2">
          <h2 class="mb-6 text-sm font-semibold uppercase">Quick links</h2>
          <ul class="">
            <li class="mb-4">
              <RouterLink
                to="/category/0"
                class="hover:underline"
                @click="scrollTop"
                >Categories</RouterLink
              >
            </li>
            <li class="mb-4">
              <RouterLink
                to="/shoppingCart"
                class="hover:underline"
                @click="scrollTop"
                >Cards</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/" class="hover:underline" @click="scrollTop"
                >FAQs</RouterLink
              >
            </li>
          </ul>
        </div> -->
        <div class="col-span-6 md:col-span-3">
          <h2 class="mb-6 text-sm font-semibold uppercase">{{ $t("contact") }}</h2>
          <ul class="space-y-4">
            <li class="flex flex-wrap justify-center sm:justify-start gap-2" v-if="contactRef.address">
              <i class="fa-solid fa-location-dot"></i>
              <span>
                {{ contactRef.address }}
              </span>
            </li>
            <li class="flex flex-wrap gap-2 justify-center sm:justify-start" v-if="contactRef.email">
              <a :href="'mailto:' + contactRef.email" class="hover:underline space-x-2">
                <i class="fa-solid fa-envelope"></i>
                <span>
                  {{ contactRef.email }}
                </span>
              </a>
            </li>
            <li class="flex flex-wrap gap-2 justify-center sm:justify-start" v-if="contactRef.phone_number">
              <a :href="'tel:' + contactRef.phone_number" class="hover:underline space-x-2">
                <i class="fa-solid fa-phone-volume"></i>
                <span>
                  {{ contactRef.phone_number }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between text-center sm:text-start">
      <span class="text-sm sm:text-center">© 2022
        <RouterLink to="/" class="hover:underline" @click="scrollTop">{{
            $t("footer1")
        }}</RouterLink>
        {{ $t("footer2") }}
      </span>
      <div class="flex mt-4 space-x-6 justify-center sm:mt-0">
        <a v-for="val in socialRef" :key="val.id" :href="val.url"
          class="tranistion-all duration-200 hover:text-gray-900">
          <img class="w-6 h-auto transition-all duration-500 hover:rotate-[360deg]" :src="val.icon" alt="val.url" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import axios from "@/plugins/axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const contactRef = ref({});
const socialRef = ref([]);

const scrollTop = () => {
  window.scrollTo(0, 0);
};

onMounted(() => {
  axios.get("/information/contact").then((res) => {
    contactRef.value = res.data;
  });
  axios.get("information/social-media/").then((res) => {
    socialRef.value = res.data;
  });
});
</script>
