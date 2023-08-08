<template>
  <RouterLink
    :to="link"
    class="bg-yellow-500 transition-all duration-200 text-black py-2 rounded-sm flex items-center justify-center font-bold hover:bg-yellow-400"
  >
    <slot></slot>
  </RouterLink>
</template>
<script setup>
defineProps({
  link: { type: String, required: true },
});
</script>
