<script setup lang="ts">
import { BgStyle } from '@/types'

import html2canvas from 'html2canvas'
import LayerContainer from './LayerContainer.vue'
import BgLayer from './BgLayer.vue'

import '@/assets/all.css'

const store = useStore()

const thisYear = new Date().getFullYear()
const version = import.meta.env.VITE_APP_VERSION

const bgStyles = ref<BgStyle>()
const layers = computed(() => store.layers)

function downloadPng() {
  // Note: html2canvas has some serious limitations in rendering and it should not
  // be used as a main rendering tool. It does, however, work in basic situations.
  const cardHolder = document.getElementById('cardholder')
  if (cardHolder) {
    html2canvas(cardHolder, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      const image = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream')
      let link = document.createElement('a')
      link.download = 'social-card.png'
      link.href = image
      link.click()
    })
  }
}

function changeBgStyles(styleObj: BgStyle) {
  bgStyles.value = styleObj
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between w-full mt-6 mb-4">
      <h1 class="block text-4xl font-bold">
        <i class="far fa-sliders-v-square"></i> Open Graph Image Builder
      </h1>
      <div>
        <span class="text-right">
          <router-link class="text-blue-800 text-md hover:underline" to="/styleguide/"
            >Style Guide <i class="fab fa-css3"></i
          ></router-link>
        </span>
        &nbsp;

        <span class="text-right"
          ><a
            href="https://tailwindcss.com/docs/customizing-colors"
            class="text-blue-800 text-md hover:underline"
            target="_blank"
            >Tailwind <i class="fas fa-external-link-alt"></i></a
        ></span>
        &nbsp;

        <span class="text-right"
          ><a
            href="https://fontawesome.com/icons?d=gallery"
            class="text-blue-800 text-md hover:underline"
            target="_blank"
            >FA5 <i class="fas fa-external-link-alt"></i></a
        ></span>
        &nbsp;

        <span class="text-right"
          ><a
            href="#"
            class="text-blue-800 text-md hover:text-red-700"
            target="_blank"
            title="Experimental"
            @click.prevent="downloadPng"
            ><i class="fas fa-download"></i></a
        ></span>
      </div>
    </div>

    <p class="mb-4">
      This is
      <span class="font-semibold">an experimental demo project</span> for making Open Graph images
      for your blog or a Web site with a
      <span class="font-semibold">serverless backend and JAMstack front</span>.
      <a href="https://hoyci.unessa.net/2020/01/open-graph-tool/" class="text-blue-800 underline"
        >Read more about it</a
      >.
    </p>

    <p class="mb-8">
      Currently the best way to export the image is to use browser Developer Tools. (On Firefox
      right-click the image, select Take a screenshot, then select the preview div and save the
      image. Other browsers have similar tools.) There is also an experimental JavaScript export
      link top right but the quality is not very good.
    </p>

    <p class="p-4 bg-red-300 sm:hidden">
      <strong>Warning:</strong> this app isn't designed to work with small screens. YMMV.
    </p>

    <div class="max-w-2xl mx-auto mt-4 mb-4 border border-gray-600">
      <div
        id="cardholder"
        class="relative flex items-stretch flex-1 overflow-hidden aspect-w-16 aspect-h-9 min-h-[16rem]"
        :style="bgStyles"
      >
        <div v-for="layer in layers" :key="layer.name" class="absolute w-full h-full">
          <div v-if="layer.visible" :class="layer.css" v-html="layer.html"></div>
        </div>
      </div>
    </div>

    <layer-container class="p-4 mt-4 border border-gray-400 rounded"
      ><bg-layer @stylechange="changeBgStyles"></bg-layer>
    </layer-container>

    <layer-container
      v-for="layer in layers"
      :key="layer.id"
      class="p-4 mt-4 border border-gray-400 rounded"
      :layer-id="layer.id"
    />

    <p class="pt-16 pb-8 text-lg text-center">
      Open Graph Image Builder
      <a href="https://github.com/Uninen/og-image-builder/releases" class="underline"
        >v{{ version }}</a
      >
      &copy; <strong> Ville Säävuori</strong> (<strong
        ><a href="https://twitter.com/uninen" class="text-blue-700 underline">@uninen</a></strong
      >), {{ thisYear }}.
      <a href="https://github.com/Uninen/og-image-builder" class="text-blue-700 underline"
        >Source available on GitHub</a
      >.
    </p>
  </div>
</template>
