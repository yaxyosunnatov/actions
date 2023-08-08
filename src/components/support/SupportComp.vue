<template>
  <div class="support my-4">
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border border-[#0000004f] p-4 px-8 gap-4"
      >
        <div
          v-for="val in ServiceRef"
          :key="val.id"
          class="col-span-1 flex sm:block xl:flex gap-2"
        >
          <div>
            <img class="w-12 h-12" :src="val.icon" :alt="val.title" />
          </div>
          <div>
            <div class="font-bold">{{ val.title }}</div>
            <div class="text-sm text-black opacity-60">
              {{ val.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios";
import { onMounted, ref } from "vue";

const ServiceRef = ref([]);

onMounted(() => {
  axios.get("/information/service/").then((res) => {
    ServiceRef.value = res.data;
  });
});
</script>
