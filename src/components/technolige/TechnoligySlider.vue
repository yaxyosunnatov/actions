<template>
  <div class="mt-[60px]"></div>
  <div class="container">
    <div class="">
      <router-link to="/category/0" class="flex justify-end">
        <p
          class="cursor-pointer text-right pb-1 border-b border-black inline-block mb-4 hover:text-[orange] transition-all duration-300 hover:border-orange-500">

          {{ $t('viewAll') }}
        </p>
      </router-link>
      <hr class="bg-[#8e8b8bb7]" />
    </div>
    <SwiperComponets :data="data" class="mt-[20px]" />
  </div>
</template>

<script setup>
import SwiperComponets from "../SwiperComponets.vue";
const data = [];
</script>
