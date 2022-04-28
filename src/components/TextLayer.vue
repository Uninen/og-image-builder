<script setup lang="ts">
const props = defineProps<{
  layerId: number
}>()

const store = useStore()
const layer = computed(() => store.getLayerById(props.layerId))
</script>

<template>
  <div v-if="layer">
    <div class="block">
      <div class="mt-2">
        <div>
          <label class="inline-flex items-center">
            <input v-model="layer.visible" type="checkbox" class="form-checkbox" />
            <span class="ml-2 text-xl font-bold">{{ layer.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">Text (HTML)</span>
      <input v-model="layer.html" class="block w-full mt-1 form-input" />
    </label>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">CSS</span>
      <input v-model="layer.css" class="block w-full mt-1 form-input" />
    </label>
  </div>
</template>
