<script setup lang="ts">
import { nextTick } from 'vue'
import UnsplashSearch from './UnsplashSearch.vue'
import { BgStyle, UnsplashImage } from '@/types'

const emit = defineEmits(['stylechange'])

const UTM_PARAMS = '?utm_source=Open%20Graph%20Image%20Builder&utm_medium=referral'
const useImage = ref(true)
const styles = ref<BgStyle>({
  background: '',
  backgroundImage: '',
  backgroundSize: '',
})
const url = ref(
  'https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzEyNH0&auto=format&fit=crop&w=1280&h=720&q=85'
)
const color = ref('#FFFFFF')
const searchOpen = ref(false)
const unsplashImage = ref<UnsplashImage>({
  author: 'Melanie Magdalena',
  authorUrl: 'https://unsplash.com/@m2creates' + UTM_PARAMS,
  unsplashUrl: 'https://unsplash.com/' + UTM_PARAMS,
})

const imageIsUnsplash = computed(() => {
  return url.value.startsWith('https://images.unsplash.com/')
})

function selectPhoto(payload: any) {
  unsplashImage.value = {
    author: payload.user.name,
    authorUrl: payload.user.links.html + UTM_PARAMS,
    unsplashUrl: 'https://unsplash.com/' + UTM_PARAMS,
  }
  url.value = payload.urls.raw + '&auto=format&fit=crop&w=1280&h=720&q=85'
  closeSearchWindow()
}

function closeSearchWindow() {
  searchOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

function openSearchWindow() {
  searchOpen.value = true
  // Prevent underlying page scroll when the search window is open
  window.scrollTo({ top: 0 })
  document.body.classList.add('overflow-hidden')

  nextTick(() => {
    document.getElementById('searchinput')?.focus()
  })
}

function calculateStyles() {
  const obj: BgStyle = {
    background: '',
    backgroundImage: '',
    backgroundSize: '',
  }
  obj.background = color.value
  if (url.value !== '' && useImage.value) {
    obj.backgroundImage = `url(${url.value})`
    obj.backgroundSize = 'cover'
  }
  styles.value = obj
  emit('stylechange', obj)
}

watch(url, () => {
  calculateStyles()
})

watch(color, () => {
  calculateStyles()
})

onMounted(() => {
  calculateStyles()
})
</script>

<template>
  <div>
    <div class="block">
      <div class="mt-2">
        <div class="text-xl font-bold">Background</div>
      </div>
    </div>

    <button
      class="inline-block px-4 py-2 mt-4 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
      @click="openSearchWindow"
    >
      Search image from Unsplash
    </button>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">Image URL</span>
      <div v-if="imageIsUnsplash" class="text-sm text-gray-600">
        Currently selected photo by
        <a class="text-gray-700 underline" :href="unsplashImage.authorUrl" target="_blank"
          >{{ unsplashImage.author }} <i class="far fa-external-link-alt"></i
        ></a>
        on
        <a class="text-gray-700 underline" :href="unsplashImage.unsplashUrl" target="_blank"
          >Unsplash <i class="far fa-external-link-alt"></i></a
        >.
      </div>
      <input v-model="url" class="block w-full mt-1 form-input" />
    </label>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">BG Color</span>
      <input v-model="color" type="color" class="block w-full mt-1 form-input" />
    </label>

    <unsplash-search
      v-if="searchOpen"
      @photo-selected="selectPhoto"
      @close-window="closeSearchWindow"
    ></unsplash-search>
  </div>
</template>
