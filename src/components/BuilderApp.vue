<template>
  <div>
    <div class="flex flex-wrap items-center w-full justify-between mt-6 mb-4">
      <h1 class="block text-4xl font-bold">
        <i class="far fa-sliders-v-square"></i> Open Graph Image Builder
      </h1>
      <div>
        <span class="text-right">
          <g-link
            class="text-blue-800 text-md hover:underline"
            to="/styleguide/"
            >Style Guide <i class="fab fa-css3"></i
          ></g-link>
        </span>
        &nbsp;

        <span class="text-right"
          ><a
            href="https://tailwindcss.com/docs/utility-first"
            class="text-blue-800 text-md hover:underline"
            target="_blank"
            >Tailwind <i class="far fa-external-link-alt"></i></a
        ></span>
        &nbsp;

        <span class="text-right"
          ><a
            href="https://fontawesome.com/icons?d=gallery"
            class="text-blue-800 text-md hover:underline"
            target="_blank"
            >FA5 <i class="far fa-external-link-alt"></i></a
        ></span>
        &nbsp;

        <span class="text-right"
          ><a
            href="#"
            class="text-blue-800 text-md hover:text-red-700"
            target="_blank"
            title="Experimental"
            @click.prevent="downloadPng"
            ><i class="far fa-download"></i></a
        ></span>
      </div>
    </div>

    <p class="mb-4">
      This is
      <span class="font-semibold">an experimental demo project</span> for making
      Open Graph images for your blog or a Web site with a
      <span class="font-semibold">serverless backend and JAMstack front</span>.
      <a
        href="https://hoyci.unessa.net/2020/01/og-image-builder-part-1/"
        class="text-blue-800 underline"
        >Read more about it</a
      >.
    </p>

    <p class="mb-8">
      Currently the best way to export the image is to use browser Developer
      Tools. (On Firefox right-click the image, select Take a screenshot, then
      select the preview div and save the image. Other browsers have similar
      tools.) There is also an experimental JavaScript export link top right but
      the quality is not very good.
    </p>

    <p class="sm:hidden bg-red-300 p-4">
      <strong>Dear mobile user:</strong> please note that while this app
      technically scales and works with mobile devices, it doesn't quite work
      with smallest screens. YMMV.
    </p>

    <div class="border border-gray-600 max-w-2xl mx-auto mt-4 mb-4">
      <div
        id="cardholder"
        class="aspect-ratio-16/9 flex flex-1 m-h-64 items-stretch relative overflow-hidden bg-indigo-300"
        v-bind:style="computedStyles"
      >
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="absolute w-full h-full"
        >
          <div
            v-if="layer.visible"
            v-html="layer.html"
            :class="layer.css"
          ></div>
        </div>
      </div>
    </div>

    <button
      class="mt-8 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-8 mx-auto inline-block flex"
      @click="openSearchWindow"
    >
      Search Background Image
    </button>

    <div
      v-for="layer in layers"
      :key="layer.id"
      class="mt-4 p-4 rounded border border-gray-400"
    >
      <div class="block">
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox"
                v-model="layers[layer.id].visible"
              />
              <span class="ml-2 text-xl font-bold">{{ layer.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <label class="block mt-4">
        <span class="font-bold text-gray-700">Text (HTML)</span>
        <input
          class="form-input mt-1 block w-full"
          v-model="layers[layer.id].html"
        />
      </label>

      <label class="block mt-4">
        <span class="font-bold text-gray-700">CSS</span>
        <input
          class="form-input mt-1 block w-full"
          v-model="layers[layer.id].css"
        />
      </label>
    </div>

    <unsplash-search
      v-if="searchOpen"
      v-on:photo-selected="selectPhoto"
      v-on:close-window="closeSearchWindow"
    ></unsplash-search>

    <p class="pt-16 pb-8 text-lg text-center">
      Open Graph Image Builder &copy; <strong> Ville Säävuori</strong> (<strong
        ><a href="https://twitter.com/uninen" class="text-blue-700 underline"
          >@uninen</a
        ></strong
      >), 2020.
      <a
        href="https://github.com/Uninen/og-image-builder"
        class="text-blue-700 underline"
        >Source available on GitHub</a
      >.
    </p>
  </div>
</template>
<script>
import Vue from 'vue'
import clone from 'lodash-es/clone'
import html2canvas from 'html2canvas'

import UnsplashSearch from './UnsplashSearch'

export default {
  components: {
    UnsplashSearch,
  },
  data: function() {
    return {
      bgURL:
        'https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzEyNH0&auto=format&fit=crop&w=1280&h=720&q=85',
      searchOpen: false,
      bgStyles: {},
      layers: [
        {
          id: 0,
          visible: true,
          name: 'Layer 1',
          html: 'OG:Image Builder',
          css:
            'flex items-center justify-center text-5.5xl h-full font-raleway font-black text-white uppercase -m-8',
        },
        {
          id: 1,
          visible: true,
          name: 'Layer 2',
          html:
            'Add background from <b>Unsplash</b>,<br>style with <b>Tailwind</b> CSS 🎉',
          css:
            'absolute inset-x-0 bottom-0 text-3xl font-opensans font-bold text-center text-white mb-20',
        },
        {
          id: 2,
          visible: false,
          name: 'Layer 3',
          html: '<i class="fab fa-vuejs fa-10x"></i>',
          css:
            'text-green-500 flex items-center justify-center h-full text-2xl',
        },
      ],
    }
  },
  computed: {
    computedStyles() {
      let obj = clone(this.bgStyles)
      if (this.bgURL !== '') {
        obj.backgroundImage = `url(${this.bgURL})`
        obj.backgroundSize = 'cover'
      }
      return obj
    },
  },

  methods: {
    downloadPng() {
      // Note: html2canvas has some serious limitations in rendering and it should not
      // be used as a main rendering tool. It does, however, work in basic situations.
      html2canvas(document.getElementById('cardholder'), {
        allowTaint: true,
        useCORS: true,
      }).then(function(canvas) {
        let image = canvas
          .toDataURL('image/png', 1.0)
          .replace('image/png', 'image/octet-stream')
        var link = document.createElement('a')
        link.download = 'social-card.png'
        link.href = image
        link.click()
      })
    },

    selectPhoto(payload) {
      this.bgURL = payload.urls.raw + '&auto=format&fit=crop&w=1280&h=720&q=85'
      this.closeSearchWindow()
    },

    closeSearchWindow() {
      this.searchOpen = false
    },

    openSearchWindow() {
      this.searchOpen = true
      Vue.nextTick(function() {
        document.getElementById('searchinput').focus()
      })
    },
  },
}
</script>
