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
        class="aspect-ratio-16/9 flex flex-1 m-h-64 items-stretch relative overflow-hidden"
        v-bind:style="bgStyles"
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

    <layer-container class="mt-4 p-4 rounded border border-gray-400"
      ><bg-layer v-on:stylechange="changeBgStyles"></bg-layer>
    </layer-container>

    <layer-container
      v-for="layer in layers"
      :key="layer.id"
      class="mt-4 p-4 rounded border border-gray-400"
      :layer="layer"
    >
    </layer-container>

    <p class="pt-16 pb-8 text-lg text-center">
      Open Graph Image Builder
      <a
        href="https://github.com/Uninen/og-image-builder/releases"
        class="underline"
        >v{{ version }}</a
      >
      &copy; <strong> Ville Säävuori</strong> (<strong
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

import LayerContainer from './LayerContainer'
import BgLayer from './BgLayer'

export default {
  components: {
    BgLayer,
    LayerContainer,
  },
  data: function() {
    return {
      version: '0.2.0',
      bgURL: '',
      bgStyles: {},
      layers: [
        {
          id: 0,
          visible: true,
          name: 'Text layer 1',
          html: 'OG:Image Builder',
          css:
            'flex items-center justify-center text-5.5xl h-full font-raleway font-black text-white uppercase -m-8',
        },
        {
          id: 1,
          visible: true,
          name: 'Text layer 2',
          html:
            'Add background from <b>Unsplash</b>,<br>style with <b>Tailwind</b> CSS 🎉',
          css:
            'absolute inset-x-0 bottom-0 text-3xl font-opensans font-bold text-center text-white mb-20',
        },
        {
          id: 2,
          visible: false,
          name: 'Text layer 3',
          html: '<i class="fab fa-vuejs fa-10x"></i>',
          css:
            'text-green-500 flex items-center justify-center h-full text-2xl',
        },
      ],
    }
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

    changeBgStyles(styleObj) {
      this.bgStyles = styleObj
    },
  },
}
</script>
