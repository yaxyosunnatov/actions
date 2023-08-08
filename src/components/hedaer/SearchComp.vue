<template>
  <div class="search">
    <form class="w-full flex">
      <input
        type="text"
        name="search"
        id="searchHeader"
        class="py-1 lg:py-1 w-[90%] lg:w-[28rem] outline-none px-2"
        :placeholder="$t('search')"
        v-model="handleSearch"
      />
      <button
        @click.prevent="(val) => handleForm(val)"
        class="bg-black rounded-r text-white px-4 py-1"
      >
        {{ $t("search2") }}
      </button>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "@/plugins/axios";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";

const store = useSearchStore();
const router = useRouter();

const handleSearch = ref("");

function handleForm() {
  const search = handleSearch.value;
  axios.get(`product-app/all-products/?search=${search}`).then((res) => {
    store.prosucts = res.data.results;
  });

  router.push("/category/0");
}

watch(handleSearch, (key) => {
  if (!key) {
    handleForm();
  }
});

onMounted(() => {});
</script>
