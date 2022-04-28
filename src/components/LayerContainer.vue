<script setup lang="ts">
import TextLayer from '@/components/TextLayer.vue'

defineProps<{
  layerId?: number
}>()
</script>

<template>
  <div class="p-4 mt-4 border border-gray-400 rounded">
    <slot>
      <text-layer v-if="layerId" :layer-id="layerId"></text-layer>
    </slot>
  </div>
</template>
