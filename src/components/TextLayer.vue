<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TextLayer',
  props: ['layer'],
})
</script>

<template>
  <div>
    <div class="block">
      <div class="mt-2">
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" v-model="layer.visible" />
            <span class="ml-2 text-xl font-bold">{{ layer.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">Text (HTML)</span>
      <input class="block w-full mt-1 form-input" v-model="layer.html" />
    </label>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">CSS</span>
      <input class="block w-full mt-1 form-input" v-model="layer.css" />
    </label>
  </div>
</template>
