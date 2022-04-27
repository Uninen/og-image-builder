<script setup lang="ts">
import { Layer } from '@/types'
import TextLayer from '@/components/TextLayer.vue'

defineProps<{
  layer?: Layer
}>()
</script>

<template>
  <div class="p-4 mt-4 border border-gray-400 rounded">
    <slot>
      <text-layer v-if="layer" :layer="layer"></text-layer>
    </slot>
  </div>
</template>
