<template>
  <div>
    <div class="block">
      <div class="mt-2">
        <div class="text-xl font-bold">Background</div>
      </div>
    </div>

    <button
      class="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-4 inline-block flex"
      @click="openSearchWindow"
    >
      Search image from Unsplash
    </button>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">Image URL</span>
      <div class="text-sm text-gray-600" v-if="imageIsUnsplash">
        Currently selected photo by
        <a
          class="underline text-gray-700"
          :href="unsplashImage.authorUrl"
          target="_blank"
          >{{ unsplashImage.author }} <i class="far fa-external-link-alt"></i
        ></a>
        on
        <a
          class="underline text-gray-700"
          :href="unsplashImage.unsplashUrl"
          target="_blank"
          >Unsplash <i class="far fa-external-link-alt"></i></a
        >.
      </div>
      <input class="form-input mt-1 block w-full" v-model="url" />
    </label>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">BG Color</span>
      <input
        type="color"
        class="form-input mt-1 block w-full"
        v-model="color"
      />
    </label>

    <unsplash-search
      v-if="searchOpen"
      v-on:photo-selected="selectPhoto"
      v-on:close-window="closeSearchWindow"
    ></unsplash-search>
  </div>
</template>
<script>
import Vue from 'vue'
import UnsplashSearch from './UnsplashSearch'

const UTM_PARAMS =
  '?utm_source=Open%20Graph%20Image%20Builder&utm_medium=referral'

export default {
  name: 'BgLayer',
  components: {
    UnsplashSearch,
  },
  data: function() {
    return {
      useImage: true,
      url:
        'https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzEyNH0&auto=format&fit=crop&w=1280&h=720&q=85',
      styles: '',
      color: '#FFFFFF',
      searchOpen: false,
      unsplashImage: {
        author: 'Melanie Magdalena',
        authorUrl: 'https://unsplash.com/@m2creates' + UTM_PARAMS,
        unsplashUrl: 'https://unsplash.com/' + UTM_PARAMS,
      },
    }
  },
  computed: {
    imageIsUnsplash() {
      return this.url.startsWith('https://images.unsplash.com/')
    },
  },
  methods: {
    selectPhoto(payload) {
      this.unsplashImage = {
        author: payload.user.name,
        authorUrl: payload.user.links.html + UTM_PARAMS,
        unsplashUrl: 'https://unsplash.com/' + UTM_PARAMS,
      }
      this.url = payload.urls.raw + '&auto=format&fit=crop&w=1280&h=720&q=85'
      this.closeSearchWindow()
    },

    closeSearchWindow() {
      this.searchOpen = false
      let body = document.body
      body.classList.remove('overflow-hidden')
    },

    openSearchWindow() {
      this.searchOpen = true
      // Prevent underlying page scroll when the search window is open
      window.scrollTo({ top: 0 })
      let body = document.body
      body.classList.add('overflow-hidden')

      Vue.nextTick(function() {
        document.getElementById('searchinput').focus()
      })
    },

    calculateStyles() {
      let obj = {}
      obj.background = this.color
      if (this.url !== '' && this.useImage) {
        obj.backgroundImage = `url(${this.url})`
        obj.backgroundSize = 'cover'
      }
      this.styles = obj
      this.$emit('stylechange', obj)
    },
  },
  watch: {
    url(val) {
      this.calculateStyles()
    },

    color(val) {
      this.calculateStyles()
    },
  },

  mounted() {
    this.calculateStyles()
  },
}
</script>
