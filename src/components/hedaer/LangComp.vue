<template>
  <div class="lang_bar relative group">
    <ul v-for="item in props.loop" :key="item.name">
      <button
        @click="showSelect()"
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        class="flex-shrink-0 z-10 inline-flex items-center py-1 px-4 text-sm text-center text-white font-normal outline-none bg-transparent transition-all duration-300 hover:text-black"
        type="button"
        v-if="item.isActive"
      >
        <img
          v-if="item.flag"
          :src="activeArr[index].flag"
          class="w-4 mr-1"
          alt="flag"
        />
        <span class="">{{ activeArr[index].name }}</span>
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </ul>

    <div
      id="dropdown-states"
      class="absolute z-10 right-0 bg-gray-200 rounded shadow w-44"
      :class="isVisible ? 'block' : 'hidden'"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="states-button"
      >
        <li v-for="(item, index) in props.loop" :key="index">
          <button
            type="button"
            class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="() => isActive(index)"
          >
            <div class="inline-flex items-center">
              <img
                v-if="item.flag"
                class="w-4 mr-2"
                :src="item.flag"
                alt="flag"
              />
              {{ item.name }}
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import $i18n from "@/plugins/i18n.js";

import ruFlag from "../../assets/img/flags/russian.png";
import uzFlag from "../../assets/img/flags/uzbekistan.png";
const isVisible = ref(false);

const activeArr = reactive([
  { flag: uzFlag, name: "UZ", isActive: true, locale: "uz" },
  { flag: ruFlag, name: "RU", isActive: false, locale: "ru" },
]);

const index = ref(localStorage.getItem("index") || 0);

const props = defineProps({
  loop: { required: true },
});

function showSelect() {
  isVisible.value = !isVisible.value;
}
function isActive(pro) {
  isVisible.value = !isVisible.value;
  props.loop.map((val, index) => {
    if (index === pro) {
      val.isActive = true;
      $i18n.global.locale.value = localStorage.getItem("locale");
      if (val.locale == "uz") {
        localStorage.setItem("index", 0);
      } else {
        localStorage.setItem("index", 1);
      }
      localStorage.setItem("locale", val.locale);
      window.location.reload();
    } else val.isActive = false;
  });
}
onMounted(() => {
  // localStorage.setItem("index", 0);
});
</script>
