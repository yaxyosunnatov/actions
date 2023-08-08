<template>
  <div class="searchBar pt-12 sm:pt-16 md:pt-20 lg:pt-28 bg-[#0D985D]">
    <div class="flex lg:hidden justify-between items-center mb-10 py-3 pt-4 px-6">
      <div @click="isFilterOpen = !isFilterOpen"
        class="bg-white border-r duration-200 active:bg-gray-200 hover:bg-gray-200 border-gray-300 rounded-l text-white px-4 py-1">
        <i class="fa-solid fa-bars text-gray-800"></i>
      </div>
      <div class="w-full">
        <SearchComp />
      </div>
    </div>
  </div>

  <div v-if="isFilterOpen" class="lg:hidden absolute z-30 top-6 left-0 w-1/2 md:w-1/3" id="modal">
    <div class="h-[100vh] fixed overflow-y-auto pb-[100px]">
      <div class="absolute top-8 right-1 p-2 text-lg" @click="isFilterOpen = !isFilterOpen">
        <i class="fa-solid fa-xmark"></i>
      </div>

      <div class="bg-[#F5F5F5] px-[20px] py-5 mt-[30px] pt-[40px] h-[100vh]">
        <p class="text-[18px] text-[#000] font-medium mb-1 pb-[10px] border-b border-[#e1e1e1]">
          {{ $t("byBrand") }}
        </p>
        <div class="mt-[12px]" v-for="(item, index) in brand" :key="index">
          <div class="flex gap-3 flex-row-reverse justify-end">
            <label :for="item.id" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
            <input type="checkbox" :value="item.title" v-model="brandVal" :id="item.id" class="block w-4"
              @change="getBrandName" />
          </div>
        </div>

        <div class="floor mt-[30px]">
          <p class="text-[18px] text-[#000] font-medium mb-1 pb-[10px] border-b border-[#e1e1e1]">
            {{ $t("byFloor") }}
          </p>
          <div class="flex flex-wrap gap-x-5 mt-3">
            <div class="mt-[1px]" v-for="(item, index) in floor" :key="index">
              <div class="flex gap-2 flex-row-reverse justify-end">
                <label :for="item.id" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
                <input type="checkbox" :value="item.title" v-model="floorVal" :id="item.id" class="block w-4"
                  @change="getBrandName()" />
              </div>
            </div>
          </div>
        </div>

        <div class="size mt-[30px]">
          <p class="text-[18px] text-[#000] font-medium mb-1 pb-[10px] border-b border-[#e1e1e1]">
            {{ $t("bySize") }}
          </p>
          <div class="flex flex-wrap gap-x-5 mt-3">
            <div class="mt-[1px]" v-for="(item, index) in size" :key="index">
              <div class="flex gap-3 flex-row-reverse justify-end">
                <label :for="index" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
                <input type="checkbox" :value="item.title" v-model="sizeVal" :id="index" class="block w-4"
                  @change="getBrandName()" />
              </div>
            </div>
          </div>
        </div>

        <div class="rangeSliderComp my-6">
          <div class="pb-6">{{ $t("byPrice") }}</div>
          <div class="rangeInp">
            <div class="slider">
              <div class="progress" :style="{
                left: rangeMinVal[0] + '%',
                right: rangeMinVal[1] + '%',
              }"></div>
            </div>
            <div class="range-input">
              <input type="range" id="range-min" :min="priceMinMax.min" :max="priceMinMax.max" step="100"
                v-model.number="rangeInput[0]" @input="setChangeSlider" />
              <input type="range" class="range-max" :min="priceMinMax.min" :max="priceMinMax.max" step="100"
                v-model.number="rangeInput[1]" @input="setChangeSlider" />
            </div>
          </div>
          <div class="flex mt-4 text-sm text-gray-500">
            <span class="pr-2">
              {{ $t("price") }}:</span>
            <span>{{ rangeInput[0] }}k UZS</span>
            <span class="px-1">-</span>
            <span>{{ rangeInput[1] }}k UZS</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="grid lg:grid-cols-[1fr,3fr] gap-[20px] justify-between mt-[60px]">
      <div class="hidden lg:block">
        <div class="loading text-black text-[50px]" v-if="isLoading">
          Loading...
        </div>
        <div class="bg-[#F5F5F5] px-[20px] py-5 mt-[30px]">
          <p class="text-[18px] text-[#000] font-medium mb-1">{{ $t("byBrand") }}</p>
          <div class="mt-[12px]" v-for="(item, index) in brand" :key="index">
            <div class="flex gap-3 flex-row-reverse justify-end">
              <label :for="item.id" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
              <input type="checkbox" :value="item.title" v-model="brandVal" :id="item.id" class="block w-4"
                @change="getBrandName" />
            </div>
          </div>

          <div class="floor mt-[30px]">
            <p class="text-[18px] text-[#000] font-medium mb-1">{{ $t("byFloor") }}</p>
            <div class="mt-[12px]" v-for="(item, index) in floor" :key="index">
              <div class="flex gap-3 flex-row-reverse justify-end">
                <label :for="item.id" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
                <input type="checkbox" :value="item.title" v-model="floorVal" :id="item.id" class="block w-4"
                  @change="getBrandName()" />
              </div>
            </div>
          </div>

          <div class="size mt-[30px]">
            <p class="text-[18px] text-[#000] font-medium mb-1">{{ $t("bySize") }}</p>
            <div class="mt-[12px]" v-for="(item, index) in size" :key="index">
              <div class="flex gap-3 flex-row-reverse justify-end">
                <label :for="index" class="text-[#00000099] text-[16px] my-1 cursor-pointer">{{ item.title }}</label>
                <input type="checkbox" :value="item.title" v-model="sizeVal" :id="index" class="block w-4"
                  @change="getBrandName()" />
              </div>
            </div>
          </div>

          <div class="rangeSliderComp my-6">
            <div class="pb-6">{{ $t("byPrice") }}</div>
            <div class="rangeInp">
              <div class="slider">
                <div class="progress" :style="{
                  left: rangeMinVal[0] + '%',
                  right: rangeMinVal[1] + '%',
                }"></div>
              </div>
              <div class="range-input">
                <input type="range" id="range-min" :min="priceMinMax.min" :max="priceMinMax.max" step="100"
                  v-model.number="rangeInput[0]" @input="setChangeSlider" />
                <input type="range" class="range-max" :min="priceMinMax.min" :max="priceMinMax.max" step="100"
                  v-model.number="rangeInput[1]" @input="setChangeSlider" />
              </div>
            </div>
            <div class="flex mt-4 text-sm text-gray-500">
              <span class="pr-2">{{ $t("price") }}:</span>
              <span>{{ rangeInput[0] }}k UZS</span>
              <span class="px-1">-</span>
              <span>{{ rangeInput[1] }}k UZS</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-2 msm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 content-start">
        </div>
        <div class="grid grid-cols-2 msm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 content-start">
          <CategoryCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryCard from "../components/CategoryCard.vue";
import SearchComp from "../components/hedaer/SearchComp.vue";

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@/plugins/axios";
import { useSearchStore } from "../stores/searchStore";
import { watch } from "vue";
const store = useSearchStore();

const rangeInput = reactive([0, 10000]); // 0 uzs dan 10000 gacha
const priceMinMax = reactive({ min: 0, max: 10000 }); // uzgarmas qiymatlar. input bosh va oxirgi qiymatlari
const rangeMinVal = reactive([0, 0]); // left:0% Right:0%
const priceTMP = ref(0);

const setChangeSlider = () => {
  if (rangeInput[0] > rangeInput[1]) {
    priceTMP.value = rangeInput[1];
    rangeInput[1] = rangeInput[0];
    rangeInput[0] = priceTMP.value;
  }

  rangeMinVal[0] = (rangeInput[0] / priceMinMax.max) * 100;
  rangeMinVal[1] = 100 - (rangeInput[1] / priceMinMax.max) * 100;
};

const route = useRoute();

const isLoading = ref(false);

const brandVal = ref([]);
const floorVal = ref([]);
const sizeVal = ref([]);
const brand = ref([]);
const floor = ref([]);
const size = ref([]);
const isFilterOpen = ref(false);

const getBrandName = () => {
  let brandRes = "";
  let floorRes = "";
  let sizeRes = "";
  for (let i = 0; i < brandVal.value.length; i++) {
    brandRes = `${brandVal.value[0]}%2C${brandVal.value[i]}`;
  }
  for (let i = 0; i < floorVal.value.length; i++) {
    floorRes = `${floorVal.value[0]}%2C${floorVal.value[i]}`;
  }
  for (let i = 0; i < sizeVal.value.length; i++) {
    sizeRes = `${sizeVal.value[0]}%2C${sizeVal.value[i]}`;
  }
  axios
    .get(
      `product-app/all-products/?brand__title__in=${brandRes}&sizi__title__in=${sizeRes}&floor__title__in=${floorRes}`
    )
    .then((res) => {
      console.log(res);
      isLoading.value = true;
      store.prosucts = res.data.results;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
const id = ref(route.params.id);
const fetchCategory = () => {
  console.log(id.value);
  if (id.value > 0) {
    axios
      .get(`product-app/all-products/?category__id__in=${id.value}`)
      .then((res) => {
        console.log(res, "category");
        store.prosucts = res.data.results;
      });
  } else {
    store.prosucts = store.allProducts;
  }
};

watch(route, () => {
  id.value = route.params.id;
  fetchCategory();
});

onMounted(() => {
  axios.get("product-app/brand/").then((res) => {
    brand.value = res.data.results;
  });
  axios.get("product-app/floor/").then((res) => {
    floor.value = res.data.results;
  });
  axios.get("product-app/size/").then((res) => {
    size.value = res.data.results;
  });

  // category uchun
  fetchCategory();
});
</script>

<style scoped>
.slider {
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}

.slider .progress {
  height: 100%;
  /* left: 25%; */
  /* right: 25%; */
  position: absolute;
  border-radius: 5px;
  background: #17a2b8;
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

input[type="range"]::-moz-range-thumb {
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
</style>
