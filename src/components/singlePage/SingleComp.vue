<template>
  <LoadingVueVue v-if="isLoading" />
  <div class="bg-gray-200 mb-6 mt-[120px]">
    <div class="container">
      <RouteLink :route="brackkrumb" />
    </div>
  </div>
  <!-- <pre>{{ data }}</pre> -->
  <div class="container mx-auto grid grid-cols-12 gap-8">
    <div class="swiper col-span-12 mmd:col-span-5">
      <TheSwiperVue :bannerImg="data.banner" :bottomImg="data.gallery" />
    </div>
    <div class="charakter col-span-12 mmd:col-span-7 space-y-2">
      <h1 class="text-3xl">{{ data.title }}</h1>
      <div class="review flex gap-4">
        <div class="brand">
          {{ $t("band") }}:
          <RouterLink class="text-blue-500" to="" v-if="data.brand">{{
              data?.brand[0]?.title
          }}</RouterLink>
        </div>
        |
        <!-- <div class="starReview flex gap-4">
          <div class="space-x-1">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <i class="fa-solid fa-star text-yellow-400"></i>
            <i class="fa-solid fa-star text-yellow-400"></i>
            <i class="fa-solid fa-star text-yellow-400"></i>
            <i class="fa-regular fa-star text-gray-400"></i>
          </div>
          <div class="text-gray-500">(1 review)</div>
        </div> -->
      </div>
      <hr class="pb-4" />
      <div class="costs space-x-3">
        <span class="text-gray-400"><del>{{ numberFunction(data.price) }} UZS</del></span>
        <span class="text-2xl text-red-600 font-semibold">{{ numberFunction(data.discount) }} UZS</span>
      </div>
      <div class="solidBy">
        <p>
          {{ $t("solid") }}:
          <span class="text-blue-400 font-semibold text-lg">{{
              data.sold_amount
          }}</span>
        </p>
      </div>
      <div class="character">
        <ul class="list-disc text-gray-400 space-y-1">
          <li>{{ data.sub_title }}</li>
          <li>{{ data.description }}</li>

        </ul>
      </div>
      <hr />
      <div class="" v-if="data.size">
        <div class="flex gap-4">
          <p class="mb-1 mt-3">
            <span class="font-semibold">{{ $t("price") }}:</span>{{ " " }}
            <span class="">{{
                numberFunction(data.size[sizeIsActive].price)
            }}</span>
            UZS
          </p>
          <p class="mb-1 mt-3">
            <span class="font-semibold">{{ $t("size") }}:</span>{{ " " }}
            <span class="">{{ data.size[sizeIsActive].title }}</span> sm
          </p>
        </div>
        <div class="mt-2">
          <button v-for="(val, i) in data.size" :key="i" @click="() => sizeBtn(i)"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white outline-none">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
              :class="
                sizeIsActive === i ? 'bg-transparent text-white' : 'bg-white'
              ">
              {{ val.title }}{{ $t("sm") }}
            </span>
          </button>
        </div>
      </div>
      <div class="buttonsComp flex flex-col mmd:flex-row items-stretch mmd:items-end gap-3 mmd:gap-6 py-4">
        <div class="quantity">
          <p class="mb-1">{{ $t("qty") }}</p>
          <div class="border border-gray-400 flex justify-between items-center">
            <i @click="() => funcQuan(0)" class="fa-solid fa-minus text-gray-400 mmd:py-2 py-3 px-3 cursor-pointer"></i>
            <span class="text-xs w-2">{{ quantProd }}</span>
            <i @click="() => funcQuan(1)" class="fa-solid fa-plus text-gray-400 mmd:py-2 py-3 px-3 cursor-pointer"></i>
          </div>
        </div>
        <ButtonPrimaryVue link="" class="bg-black text-white hover:bg-[#000d] py-3 mmd:py-2 px-6" @click="addCard">
          {{ $t("addCard") }}
        </ButtonPrimaryVue>
        <router-link :to="{
          path: '/choosenProducts',
          query: {
            id: id,
            name: data.title,
            count: quantProd,
          },
        }"
          class="px-6 bg-yellow-500 transition-all mmd:py-2 py-3 duration-200 text-black rounded-sm flex items-center justify-center font-bold hover:bg-yellow-400">
          {{ $t("byNow") }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "@/plugins/axios";

import RouteLink from "../RouteLink.vue";
import TheSwiperVue from "./TheSwiper.vue";
import ButtonPrimaryVue from "../ButtonPrimary.vue";
import { useCardStore } from "@/stores/cardStore";
import numberFunction from "../../helpers/formatNumber";

import { useToast } from "vue-toastification";
import LoadingVueVue from "../LoadingVue.vue";
const toast = useToast();

const isLoading = ref(false);
const store = useCardStore();
const router = useRoute();
const id = ref(router.params.id);
console.log(id.value, "id");
const data = ref([]);
const title = ref("");
const quantProd = ref(1);
const sizes = reactive([45, 65, 85]);
const sizeIsActive = ref(0);

function funcQuan(val) {
  if (val) {
    quantProd.value++;
  } else if (quantProd.value > 0) {
    quantProd.value--;
  }
}

const brackkrumb = reactive([
  { name: "home", link: "/" },
  { name: title.value ? title : "branding" },
]);

const singleItem = reactive({
  id: id.value,
  img: "",
  name: "",
  price: "",
  count: "",
});

const fetchSingleData = () => {
  isLoading.value = true;
  axios
    .get(`/product-app/single-product/${id.value}/detail`)
    .then((res) => {
      data.value = res.data;
      title.value = res.data.title;
      singleItem.img = res.data.banner;
      singleItem.name = res.data.title;
      singleItem.price = res.data.discount ? res.data.discount : res.data.price;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const sizeBtn = (val) => {
  sizeIsActive.value = val;
};

// watch(route, (newId) => {
//   console.log(route.params.id);
//   id.value = route.params.id
//   fetchSingleData()
// });

const addCard = () => {
  console.log(singleItem, "singleItem");
  singleItem.count = quantProd.value;
  store.products = store.products.filter((item) => item.id !== singleItem.id);
  store.products.push(singleItem);

  // backendga ketadigabn mahsulatlar
  const newByProduct = {
    product_id: singleItem.id,
    product_title: singleItem.name,
    ordered_amount: singleItem.count,
  };
  store.byProducts = store.byProducts.filter((item) => item.id !== product_id.id);
  store.byProducts.push(newByProduct);

  toast.success("Cardga qo'shildi");
};

onMounted(() => {
  fetchSingleData();
});
</script>
