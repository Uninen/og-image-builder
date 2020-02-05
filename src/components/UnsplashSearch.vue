<template>
  <div class="absolute inset-0 bg-gray-100 py-2 px-8">
    <div class="flex items-start w-full justify-between mt-6">
      <h2 class="inline-block text-2xl font-bold">
        <i class="fas fa-search"></i> Search Unsplash
      </h2>
      <div>
        <span class="text-right"
          ><a
            href="#"
            class="text-blue-700 text-xl hover:text-red-700"
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

    <label class="block mt-4 inline-flex items-center w-1/2">
      <input
        id="searchinput"
        class="form-input w-full"
        v-on:keyup="triggerSearch"
        v-model="searchTerm"
      />
      <button
        v-if="status === 'idle'"
        @click="searchUnsplash"
        class="ml-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
      >
        Search&nbsp;Unsplash
      </button>
      <button
        v-else
        class="ml-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
      >
        Searching...
      </button>
    </label>

    <div v-if="searchResults && searchResults.total > 0" class="w-full">
      <h4 class="text-2xl font-bold mt-6">
        Results ({{ searchResults.total }})
      </h4>

      <div class="w-full">
        <button
          @click="decrPage"
          class="mr-2 mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          &larr; previous
        </button>

        <input class="form-input inline-block w-32" v-model="currentPage" />

        <button
          @click="incrPage"
          class="ml-2 mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
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
import axios from 'axios'
import debounce from 'lodash-es/debounce'

export default {
  data: function() {
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
          console.log('Response: ', response)
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
      let me = this
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
    this.debouncedSearch = debounce(this.searchUnsplash, 500, {
      leading: true,
      trailing: true,
    })
  },
}
</script>
