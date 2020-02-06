// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: https://gridsome.org/docs/client-api

import DefaultLayout from './layouts/Default.vue'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = { lang: 'en' }
  head.bodyAttrs = { class: 'antialiased font-body font-sans' }

  // Styles
  head.link.push({
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800|Raleway:500,600,700,800,900&display=swap&subset=latin-ext',
  })

  // Scripts
  head.script.push({
    // This is my personal FA5 kit, please don't use this in other projects as it will eat my
    // monthly pageviews and I'll be forced to change the kit, thanks!
    src: 'https://kit.fontawesome.com/092bd4c80e.js',
    crossorigin: 'anonymous',
    body: true,
  })

  // Basic meta tags
  head.meta.push({
    name: 'author',
    content: 'Ville Säävuori',
  })

  head.meta.push({
    name: 'keywords',
    content: 'Gridsome,Vue,Tailwind,Tailwind CSS,opengraph',
  })

  head.meta.push({
    name: 'description',
    content:
      'An Open Graph image builder tool built with JAMstack + serverless.',
  })

  // Open Graph + Twitter meta tags
  head.meta.push({
    property: 'og:description',
    content:
      'An Open Graph image builder tool built with JAMstack + serverless.',
  })

  head.meta.push({
    name: 'twitter:description',
    content:
      'An Open Graph image builder tool built with JAMstack + serverless.',
  })

  head.meta.push({
    property: 'og:type',
    content: 'website',
  })

  head.meta.push({
    property: 'og:title',
    content: 'Open Graph Image Builder',
  })

  head.meta.push({
    name: 'twitter:title',
    content: 'Open Graph Image Builder',
  })

  head.meta.push({
    name: 'twitter:card',
    content: 'summary_large_image',
  })

  head.meta.push({
    name: 'twitter:creator',
    content: '@uninen',
  })

  head.meta.push({
    property: 'og:image',
    content: ' https://cardmaker.uninen.now.sh/img/social-preview.jpg',
  })

  head.meta.push({
    name: 'twitter:image',
    content: 'https://cardmaker.uninen.now.sh/img/social-preview.jpg',
  })
}
