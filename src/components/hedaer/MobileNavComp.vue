<template>
  <nav
    class="lg:hidden fixed z-50 bottom-0 left-0 right-0 bg-white border-t border-black py-3 || flex items-end justify-center gap-6 sm:gap-8 md:gap-10"
  >
    <!-- <div class="flex flex-col items-center" @click="(isShow2 = !isShow2)">
      <i class="fa-solid fa-bars text-2xl md:text-3xl text-[#746B6B]"></i>
      <p class="text-lg md:text-2xl text-[#746B6B]">Menu</p>
    </div> -->
    <div
      class="flex flex-col items-center cursor-pointer"
      @click="isShow1 = !isShow1"
    >
      <i class="fa-solid fa-list text-2xl md:text-3xl text-[#746B6B]"></i>
      <p class="text-lg md:text-2xl text-[#746B6B]">{{ $t("category") }}</p>
    </div>
    <RouterLink class="flex flex-col items-center" to="/category/0">
      <i
        class="fa-solid fa-magnifying-glass text-2xl md:text-3xl text-[#746B6B]"
      ></i>
      <p class="text-lg md:text-2xl text-[#746B6B]">{{ $t("search2") }}</p>
    </RouterLink>
    <RouterLink class="flex flex-col items-center" to="/shoppingCart">
      <i
        class="fa-solid fa-bag-shopping text-2xl md:text-3xl text-[#746B6B]"
      ></i>
      <p class="text-lg md:text-2xl text-[#746B6B]">{{ $t("cart") }}</p>
    </RouterLink>
  </nav>
  <div v-if="isShow1" class="fixed z-50 inset-0 bg-white">
    <div class="bg-[#0D985D] py-4 text-center relative">
      <p class="text-white text-2xl">{{ $t("category") }}</p>
      <span
        class="absolute top-1/2 -translate-y-1/2 right-6 p-2"
        @click="isShow1 = !isShow1"
      >
        <i class="fa-solid fa-xmark text-xl"></i>
      </span>
    </div>
    <div class="p-4 bg-white rounded-lg md:p-8">
      <div v-for="(val, id) in store.category" :key="id">
        <!-- <pre>{{ val.sub_category }}</pre> -->
        <h2
          @click="() => handleAccardion(id)"
          id="accordion-flush-heading-1"
          class="duration-300 hover:bg-blue-50 px-4"
        >
          <button
            type="button"
            class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <span :class="ansverAccardion === id ? 'text-blue-500' : ''">{{
              val.title
            }}</span>
            <svg
              data-accordion-icon
              class="w-6 h-6 rotate-180 shrink-0 duration-300"
              :class="
                ansverAccardion === id ? 'rotate-[360deg] text-blue-500' : ''
              "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              v-if="val.sub_category.length"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </h2>
        <div v-if="ansverAccardion === id">
          <h2
            v-for="(value, id) in val.sub_category"
            :key="id"
            id="accordion-flush-heading-1"
            class="duration-300 hover:bg-gray-50 px-6"
          >
            <router-link
              :to="'/category/' + value.id"
              @click="isShow1 = !isShow1"
            >
              <button
                type="button"
                class="flex items-center justify-between w-full py-4 font-medium text-left text-gray-500 hover:bg-blue-50"
              >
                <span>{{ value.title }}</span>

                <svg
                  data-accordion-icon
                  class="w-6 h-6 rotate-180 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  v-if="false"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </router-link>
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isShow2" class="fixed z-50 inset-0 bg-white">
    <div class="bg-[#0D985D] py-4 text-center relative">
      <p class="text-white text-2xl">Categories</p>
      <span
        class="absolute top-1/2 -translate-y-1/2 right-6 p-2"
        @click="isShow2 = !isShow2"
      >
        <i class="fa-solid fa-xmark text-xl cursor-pointer"></i>
      </span>
    </div>
    <!-- <div class="bg-white rounded-lg">
      <div v-for="(val, id) in categoriesRef" :key="id">
        <h2 @click="() => handleAccardion(id)" id="accordion-flush-heading-1" class="duration-300 hover:-translate-x-4">
          <button type="button"
            class="flex items-center justify-between w-full py-4 px-6 font-medium text-left text-gray-700 border-b">
            <RouterLink :to="val.link" :class="ansverAccardion === id ? 'text-blue-500' : ''">{{ val.name }}
            </RouterLink>
            <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0 duration-300" :class="
              ansverAccardion === id ? 'rotate-[360deg] text-blue-500' : ''
            " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" v-if="val.subTitle.length">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </h2>
        <div v-if="ansverAccardion === id">
          <h2 v-for="(value, id) in val.subTitle" :key="id" id="accordion-flush-heading-1"
            class="duration-300 hover:bg-gray-50 px-6">
            <button type="button"
              class="flex items-center justify-between w-full py-4 font-medium text-left text-gray-500">
              <span>{{ value.title }}</span>
              <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" v-if="value.subTitle.length">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </h2>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useCategoryStore } from "../../stores/categoryStore";

const store = useCategoryStore();

const ansverAccardion = ref(-1);
function handleAccardion(val) {
  ansverAccardion.value === val
    ? (ansverAccardion.value = -1)
    : (ansverAccardion.value = val);
}

const isShow1 = ref(false);
const dropdown = ref([
  {
    title: "Home",
    sub_category: [
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
    ],
  },
  {
    title: "Shop",
    sub_category: [
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
    ],
  },
  {
    title: "Pages",
    sub_category: [
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
    ],
  },
  {
    title: "Glogs",
    sub_category: [
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
      { title: "MarketPlace Full Width", link: "/", sub_category: [] },
    ],
  },
]);

const isShow2 = ref(false);
const categoriesRef = ref([
  { name: "Clothing & Apparel", link: "/categoryShop", subTitle: [] },
  { name: "Clothing & Apparel", link: "/categoryShop", subTitle: [] },
  { name: "Clothing & Apparel", link: "/categoryShop", subTitle: [] },
  { name: "Clothing & Apparel", link: "/categoryShop", subTitle: [] },
]);
</script>
