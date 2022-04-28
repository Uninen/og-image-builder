import { defineStore } from 'pinia'
import { Layer } from '@/types'
import { find } from 'rambda'

const versionString =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_VERSION + '-dev'
    : import.meta.env.VITE_APP_VERSION

export const useStore = defineStore('main', {
  state: () => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    layers: [
      {
        id: 0,
        visible: true,
        name: 'Text layer 1',
        html: 'OG:Image Builder',
        css: 'flex items-center justify-center text-5.5xl h-full font-raleway font-black text-white uppercase -m-8',
      },
      {
        id: 1,
        visible: true,
        name: 'Text layer 2',
        html: 'Add background from <b>Unsplash</b>,<br>style with <b>Tailwind</b> CSS 🎉',
        css: 'absolute inset-x-0 bottom-0 text-3xl font-opensans font-bold text-center text-white mb-20',
      },
      {
        id: 2,
        visible: false,
        name: 'Text layer 3',
        html: '<i class="fab fa-vuejs fa-10x"></i>',
        css: 'text-green-500 flex items-center justify-center h-full text-2xl',
      },
    ] as Layer[],
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      console.log('app initialized!')
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },

    getLayerById: (state) => {
      return (id: number) => {
        const predicate = (item: Layer) => item.id === id
        return find(predicate, state.layers)
      }
    },
  },
})
