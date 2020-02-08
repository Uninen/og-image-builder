<template>
  <div class="mt-4 p-4 rounded border border-gray-400">
    <slot>
      <text-layer :layer="layer"></text-layer>
    </slot>
  </div>
</template>
<script>
import TextLayer from './TextLayer'

export default {
  name: 'ImageLayer',
  props: ['layer'],
  components: {
    TextLayer,
  },
}
</script>
