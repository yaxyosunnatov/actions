<template>
  <div class="container mx-auto">
    <nav class="">
      <div class="flex justify-between items-center mx-auto">
        <div
          id="mega-menu"
          class="hidden justify-between items-center w-full text-sm md:flex md:w-auto md:order-1 space-x-4"
        >
          <SelectComp v-for="(item, index) in data" :key="index" :loop="item" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios";
import { onMounted, reactive, ref } from "vue";
import { useCategoryStore } from "../../stores/categoryStore";
import SelectComp from "./SelectComp.vue";

const store = useCategoryStore();

const data = ref([]);

const fetchCategory = () => {
  axios.get("/menu/categories/").then((res) => {
    data.value = res.data.results;
    store.category = res.data.results;
  });
};

onMounted(() => {
  fetchCategory();
});
</script>
<style>
#mega-menu ul li:hover > div {
  display: grid;
}
</style>
