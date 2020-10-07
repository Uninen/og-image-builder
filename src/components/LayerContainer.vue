<template>
  <div class="mt-4 p-4 rounded border border-gray-400">
    <slot>
      <text-layer :layer="layer"></text-layer>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TextLayer from './TextLayer.vue'

export default defineComponent({
  name: 'ImageLayer',
  props: ['layer'],
  components: {
    TextLayer,
  },
})
</script>
