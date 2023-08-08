<template>
  <!-- <pre>{{ loop }}</pre> -->
  <ul class="flex mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
    <li>
      <button
        id="mega-menu-dropdown-button"
        data-dropdown-toggle="mega-menu-dropdown"
        class="flex justify-between items-center py-3 h-full w-full font-medium border-gray-100 md:w-auto group text-white"
      >
        {{ loop.title }}
        <svg
          aria-hidden="true"
          class="ml-1 w-5 h-5 md:w-4 md:h-4 transition-all duration-200 rotate-0 group-hover:rotate-180"
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
      <div
        id="mega-menu-dropdown"
        class="hidden absolute z-10 w-auto text-sm bg-white rounded-lg border border-gray-100 shadow-2xl"
      >
        <div class="p-4 pb-0 text-black md:pb-4">
          <ul class="space-y-4">
            <li v-for="(item, index) in loop.sub_category" :key="index">
              <RouterLink
                :to="'/category/' + item.id"
                class="transition-all duration-200 hover:text-[#0D985D]"
              >
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { RouterLink } from "vue-router";
defineProps({
  loop: {
    type: Object,
    required: true,
  },
});
</script>
