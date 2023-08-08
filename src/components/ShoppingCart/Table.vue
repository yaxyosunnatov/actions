<template>
  <div class="shadow-md sm:rounded-lg hidden md:block">
    <table class="w-full text-sm text-left text-gray-500">
      <!-- <pre>{{ store.products }}</pre> -->
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">
            {{ $t("image") }}
          </th>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">
            {{ $t("product") }}
          </th>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">
            {{ $t("price") }}
          </th>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">{{ $t("qty") }}</th>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">
            {{ $t("total") }}
          </th>
          <th scope="col" class="py-2 px-2 md:py-4 md:px-6">
            {{ $t("close") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="bg-white border-b hover:bg-gray-50" v-for="(item, index) in store.products" :key="index">
          <td class="p-2 w-32">
            <img :src="item.img" alt="Apple Watch" />
          </td>
          <td class="py-2 px-2 md:py-4 md:px-6 font-semibold text-gray-900 max-w-sm" v-if="item">
            {{ item.name }}
          </td>
          <td class="py-2 px-2 md:py-4 md:px-6 font-semibold text-gray-900">
            {{ numberFunction(item.price) }} UZS
          </td>
          <td class="py-2 px-2 md:py-4 md:px-6">
            <InputCount v-model="item.count" />
          </td>
          <td class="py-2 px-2 md:py-4 md:px-6 font-semibold text-gray-900">
            {{ numberFunction(item.price * item.count) }} UZS
          </td>
          <td class="py-2 px-2 md:py-4 md:px-6">
            <RouterLink to="#" class="font-medium text-red-600 hover:underline" @click="deleteProduct(item.id)">
              <i class="fa-solid fa-xmark"></i>
            </RouterLink>
          </td>
        </tr>
        <tr class="text-center mx-auto h-16 flex justify-center items-center" v-if="store.products.length === 0">
          <p class="text-center">{{ $t("emptyCard") }}</p>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-for="(item, index) in store.products" :key="index"
    class="mobileTable md:hidden border border-gray-300 divide-y m-2">
    <div class="flex justify-between items-start gap-8 px-2 py-4">
      <p class="font-bold text-gray-700 text-lg">Product:</p>
      <div class="flex flex-col gap-2">
        <img class="w-20" :src="item.img" alt="product Img" />
        <p class="text-gray-500">{{ item.name }}</p>
      </div>
    </div>
    <div class="flex justify-between items-start gap-8 px-2 py-4">
      <p class="font-bold text-gray-700 text-lg">Price:</p>
      <p class="text-gray-500">{{ numberFunction(item.price) }} UZS</p>
    </div>
    <div class="flex justify-between items-start gap-8 px-2 py-4">
      <p class="font-bold text-gray-700 text-lg">Quantity:</p>
      <InputCount v-model="item.count" />
    </div>
    <div class="flex justify-between items-start gap-8 px-2 py-4">
      <p class="font-bold text-gray-700 text-lg">Total:</p>
      <p class="text-gray-500">
        {{ numberFunction(item.price * item.count) }} UZS
      </p>
    </div>
    <div class="flex justify-between items-start gap-8 px-2 py-4">
      <p class="font-bold text-gray-700 text-lg">Action:</p>
      <button class="font-medium text-red-600 hover:underline p-2">
        <i class="fa-solid fa-xmark" @click="deleteProduct(item.id)"></i>
      </button>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import numberFunction from "@/helpers/formatNumber";
// import { onMounted, ref } from "vue";
import { useCardStore } from "../../stores/cardStore";
import InputCount from "./InputCount.vue";

const store = useCardStore();

const deleteProduct = (id) => {
  store.products = store.products.filter((item) => item.id !== id);
  store.byProducts = store.byProducts.filter((item) => item.id !== id);
};
</script>
