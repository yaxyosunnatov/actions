<template>
  <div class="py-2">
    <span class="font-bold text-xs" v-for="(val, index) in props.route" :key="index">
      <span class="text-blue-800" v-if="val.link">
        <RouterLink exact :to="val.link">{{ $t(val.name) }} / </RouterLink>
      </span>
      <span v-else>
        {{ $t(val.name) }}
      </span>
    </span>
  </div>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

const props = defineProps({
  route: { required: true },
});
</script>
