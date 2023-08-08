<template>
  <div class="shoppingCart flex justify-center">
    <div class="flex flex-col items-center ">
      <h2 class="py-2 mb-8 text-3xl font-bold">{{ $t("shopCart") }}</h2>
      <div class="table  mt-14">
        <TableVue />
      </div>
      <div class="totalCost mt-4 self-end m-2">
        <div class="totalContent border border-[#00000033] p-4 flex justify-between bg-slate-200">
          <h3 class="font-bold">{{ $t("total2") }}</h3>
          <div class="cost text-red-600 font-bold">
            {{ numberFunction(store.allSum) }} UZS
          </div>
        </div>
        <ButtonPrimaryVue class="px-16 mt-3" link="/choosenProducts">
          {{ $t("procedChec") }}
        </ButtonPrimaryVue>
      </div>
    </div>
  </div>
</template>
<script setup>
import numberFunction from "../../helpers/formatNumber";
import ButtonPrimaryVue from "../ButtonPrimary.vue";
import TableVue from "./Table.vue";

import { useCardStore } from "../../stores/cardStore";
const store = useCardStore();
</script>
