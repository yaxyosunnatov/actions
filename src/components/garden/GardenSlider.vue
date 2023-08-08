<template>
  <div class="mt-[60px]"></div>
  <div class="container">
    <div class="flex justify-between items-center">
      <div class="text-[20px] text-black font-semibold">
        {{ $t("slider2") }}
      </div>
      <router-link to="/category/0" class="flex justify-end">
        <p
          class="cursor-pointer text-right pb-1 border-b border-black inline-block mb-4 hover:text-[#0D985D] transition-all duration-300 hover:border-[#0D985D]">
          {{ $t("viewAll") }}
        </p>
        <hr class="bg-[#8e8b8bb7]" />
      </router-link>
    </div>
    <SwiperComponets :data="data" class="mt-[20px]" />
  </div>
</template>

<script setup>
import SwiperComponets from "../SwiperComponets.vue";
defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
