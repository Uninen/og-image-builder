<script setup lang="ts">
import axios from 'axios'
import { debounce } from 'lodash-es'
import { UnsplashImage } from '@/types'

const emit = defineEmits(['photo-selected', 'close-window'])

type SearchResult = {
  total: number
  results: UnsplashImage[]
}

const searchTerm = ref('')
const searchResults = ref<SearchResult>()
const status = ref('idle' as 'idle' | 'searching')
const currentPage = ref(1)

function triggerSearch() {
  if (searchTerm.value.length > 2) {
    debouncedSearch()
  }
}
function searchUnsplash() {
  status.value = 'searching'
  axios
    .get('/api/search', {
      params: {
        query: searchTerm.value,
        page: currentPage.value,
      },
    })
    .then(function (response) {
      searchResults.value = response.data
      status.value = 'idle'
    })
}

function searchFor(term: string) {
  searchTerm.value = term
  searchUnsplash()
}

function incrPage() {
  currentPage.value += 1
  searchUnsplash()
}

function decrPage() {
  currentPage.value -= 1
  searchUnsplash()
}

function selectPhoto(photo: UnsplashImage) {
  emit('photo-selected', photo)

  // As per Unsplash API guides, we need to ping them for each
  // "download" to let them keep tabs on what photos are being used.
  // As we can't track browser screenshots, we'll send the ping here.
  axios.get('/api/track', {
    params: {
      photo: photo.id,
    },
  })
}

function closeWindow() {
  emit('close-window')
}

const debouncedSearch = debounce(searchUnsplash, 500, {
  leading: true,
  trailing: true,
})
</script>

<template>
  <div class="absolute inset-0 px-8 py-2 bg-gray-100" @keyup.esc="closeWindow">
    <div class="flex items-start justify-between w-full mt-6">
      <h2 class="inline-block text-2xl font-bold">
        <i class="fas fa-search"></i> Search Unsplash
      </h2>
      <div>
        <span class="text-right"
          ><a
            href="#"
            class="text-xl text-blue-700 hover:text-red-700"
            target="_blank"
            title="Close search"
            @click.prevent="closeWindow"
            ><i class="far fa-times-square"></i></a
        ></span>
      </div>
    </div>

    <p>
      Tip: try for example
      <a href="" class="text-blue-700 underline" @click.prevent="searchFor('dark background')"
        >dark background</a
      >
      or
      <a href="" class="text-blue-700 underline" @click.prevent="searchFor('wallpaper')"
        >wallpaper</a
      >.
    </p>

    <label class="inline-flex items-center w-1/2 mt-4">
      <input
        id="searchinput"
        v-model="searchTerm"
        class="w-full form-input"
        @keyup="triggerSearch"
        @keyup.esc="closeWindow"
      />
      <button
        v-if="status === 'idle'"
        class="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
        @click="searchUnsplash"
      >
        Search&nbsp;Unsplash
      </button>
      <button
        v-else
        class="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
      >
        Searching...
      </button>
    </label>

    <div v-if="searchResults && searchResults.total > 0" class="w-full">
      <h4 class="mt-6 text-2xl font-bold"> Results ({{ searchResults.total }}) </h4>

      <div class="w-full">
        <button
          class="px-4 py-2 mt-4 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
          @click="decrPage"
        >
          &larr; previous
        </button>

        <input v-model="currentPage" class="inline-block w-32 form-input" />

        <button
          class="px-4 py-2 mt-4 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
          @click="incrPage"
        >
          next &rarr;
        </button>
      </div>

      <div class="w-full">
        <img
          v-for="result in searchResults.results"
          :key="result.id"
          :src="result.urls.thumb"
          :alt="result.alt_description"
          :title="result.description"
          class="inline-block w-1/5 p-1"
          @click="selectPhoto(result)"
        />
      </div>
    </div>
  </div>
</template>
