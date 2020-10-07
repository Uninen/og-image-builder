<template>
  <div class="mb-8">
    <builder-app></builder-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BuilderApp from '@/components/BuilderApp.vue'

export default defineComponent({
  name: 'Home',
  components: {
    BuilderApp,
  },
})
</script>
