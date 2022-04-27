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

<template>
  <div class="p-4 mt-4 border border-gray-400 rounded">
    <slot>
      <text-layer :layer="layer"></text-layer>
    </slot>
  </div>
</template>
