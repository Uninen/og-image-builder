<template>
  <div class="absolute inset-0 px-8 py-2 bg-gray-100">
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
      <a
        href=""
        class="text-blue-700 underline"
        @click.prevent="searchFor('dark background')"
        >dark background</a
      >
      or
      <a
        href=""
        class="text-blue-700 underline"
        @click.prevent="searchFor('wallpaper')"
        >wallpaper</a
      >.
    </p>

    <label class="inline-flex items-center block w-1/2 mt-4">
      <input
        id="searchinput"
        class="w-full form-input"
        @keyup="triggerSearch"
        @keyup.esc="closeWindow"
        v-model="searchTerm"
      />
      <button
        v-if="status === 'idle'"
        @click="searchUnsplash"
        class="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
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
      <h4 class="mt-6 text-2xl font-bold">
        Results ({{ searchResults.total }})
      </h4>

      <div class="w-full">
        <button
          @click="decrPage"
          class="px-4 py-2 mt-4 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
        >
          &larr; previous
        </button>

        <input class="inline-block w-32 form-input" v-model="currentPage" />

        <button
          @click="incrPage"
          class="px-4 py-2 mt-4 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
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
          @click="selectPhoto(result)"
          class="inline-block w-1/5 p-1"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es'

export default defineComponent({
  data() {
    return {
      searchTerm: '',
      searchResults: null,
      status: 'idle',
      currentPage: 1,
    }
  },

  methods: {
    triggerSearch() {
      if (this.searchTerm.length > 2) {
        this.debouncedSearch()
      }
    },
    searchUnsplash() {
      // @ts-ignore
      let me = this
      me.status = 'searching'
      axios
        .get('/api/search', {
          params: {
            query: me.searchTerm,
            page: me.currentPage,
          },
        })
        .then(function(response) {
          me.searchResults = response.data
          me.status = 'idle'
        })
    },

    searchFor(term) {
      this.searchTerm = term
      this.searchUnsplash()
    },

    incrPage() {
      this.currentPage += 1
      this.searchUnsplash()
    },

    decrPage() {
      this.currentPage -= 1
      this.searchUnsplash()
    },

    selectPhoto(photo) {
      this.$emit('photo-selected', photo)

      // As per Unsplash API guides, we need to ping them for each
      // "download" to let them keep tabs on what photos are being used.
      // As we can't track browser screenshots, we'll send the ping here.
      axios.get('/api/track', {
        params: {
          photo: photo.id,
        },
      })
    },

    closeWindow() {
      this.$emit('close-window')
    },
  },

  created() {
    // @ts-ignore
    let me = this

    this.debouncedSearch = debounce(this.searchUnsplash, 500, {
      leading: true,
      trailing: true,
    })

    document.onkeyup = function(evt) {
      evt = evt || window.event
      let isEscape = false
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc'
      } else {
        isEscape = evt.keyCode === 27
      }
      if (isEscape) {
        me.closeWindow()
      }
    }
  },
})
</script>
