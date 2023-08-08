<template>
  <HeaderComponent />

  <RouterView />

  <FooterCompVue />
</template>

<script setup>
import { RouterView } from "vue-router";

import HeaderComponent from "./components/hedaer/HeaderComponent.vue";
import FooterCompVue from "./components/footer/FooterComp.vue";
</script>
