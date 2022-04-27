<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import UnsplashSearch from './UnsplashSearch.vue'

const UTM_PARAMS = '?utm_source=Open%20Graph%20Image%20Builder&utm_medium=referral'

export default defineComponent({
  components: {
    UnsplashSearch,
  },
  data() {
    return {
      useImage: true,
      url: 'https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzEyNH0&auto=format&fit=crop&w=1280&h=720&q=85',
      styles: '' as string | unknown,
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
      // @ts-ignore
      return this.url.startsWith('https://images.unsplash.com/')
    },
  },
  methods: {
    selectPhoto(payload: any) {
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
      const body = document.body
      body.classList.remove('overflow-hidden')
    },

    openSearchWindow() {
      this.searchOpen = true
      // Prevent underlying page scroll when the search window is open
      window.scrollTo({ top: 0 })
      const body = document.body
      body.classList.add('overflow-hidden')

      nextTick(function () {
        document.getElementById('searchinput')?.focus()
      })
    },

    calculateStyles() {
      const obj = {
        background: '',
        backgroundImage: '',
        backgroundSize: '',
      }
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
    url() {
      this.calculateStyles()
    },

    color() {
      this.calculateStyles()
    },
  },

  mounted() {
    this.calculateStyles()
  },
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
      <div class="text-sm text-gray-600" v-if="imageIsUnsplash">
        Currently selected photo by
        <a class="text-gray-700 underline" :href="unsplashImage.authorUrl" target="_blank"
          >{{ unsplashImage.author }} <i class="far fa-external-link-alt"></i
        ></a>
        on
        <a class="text-gray-700 underline" :href="unsplashImage.unsplashUrl" target="_blank"
          >Unsplash <i class="far fa-external-link-alt"></i></a
        >.
      </div>
      <input class="block w-full mt-1 form-input" v-model="url" />
    </label>

    <label class="block mt-4">
      <span class="font-bold text-gray-700">BG Color</span>
      <input type="color" class="block w-full mt-1 form-input" v-model="color" />
    </label>

    <unsplash-search
      v-if="searchOpen"
      v-on:photo-selected="selectPhoto"
      v-on:close-window="closeSearchWindow"
    ></unsplash-search>
  </div>
</template>
