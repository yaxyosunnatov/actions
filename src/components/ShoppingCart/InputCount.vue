<template>
  <div class="border border-gray-400 flex justify-between items-center">
    <i
      @click="() => funcQuan(0)"
      class="fa-solid fa-minus text-gray-400 py-2 px-3"
    ></i>
    <span class="text-xs w-2">{{ quantProd }}</span>
    <i
      @click="() => funcQuan(1)"
      class="fa-solid fa-plus text-gray-400 py-2 px-3"
    ></i>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["on-change"]);

const quantProd = ref(props.modelValue);

function funcQuan(val) {
  if (val) {
    quantProd.value++;
  } else if (quantProd.value > 1) {
    quantProd.value--;
  }
  emit("update:modelValue", quantProd.value);
}
</script>
