<template>
  <header class="bg-[#0D985D] fixed z-[9999] top-0 left-0 right-0">
    <div class="border-b-[0.1px] border-[#00000035] py-3">
      <div class="container mx-auto">
        <div class="haeder_comp flex justify-between items-center">
          <div class="logo_container">
            <router-link to="/">
              <h1
                class="text-[20px] ms:text-[24px] lg:text-[30px] font-bold text-black"
              >
                HOME<span class="text-white">SHOP</span>
              </h1>
              <!-- <img
                src="../../assets/img/logo/logo_light.png"
                alt="haeder_logo_img"
                class="w-24 sm:w-30 lg:w-full cursor-pointer"
              /> -->
            </router-link>
          </div>

          <div class="search_bar hidden lg:block">
            <SearchCompVue />
          </div>

          <div class="right_bar flex gap-3 xl:gap-6 items-center">
            <LangComp :loop="loop" />
            <div class="card">
              <CardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar class="hidden lg:block" />
    <MobileNavCompVue />
  </header>
</template>

<script setup>
import { reactive } from "vue";
// import { RouterLink } from "vue-router";

import CardComponent from "./CardComponent.vue";
import Navbar from "./NavbarComp.vue";
import LangComp from "./LangComp.vue";
import SearchCompVue from "./SearchComp.vue";
import MobileNavCompVue from "./MobileNavComp.vue";

import ruFlag from "../../assets/img/flags/russian.png";
import uzFlag from "../../assets/img/flags/uzbekistan.png";

const loop = reactive([
  { flag: uzFlag, name: "UZ", isActive: true, locale: "uz" },
  { flag: ruFlag, name: "RU", isActive: false, locale: "ru" },
]);
</script>

<style></style>
