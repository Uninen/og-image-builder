<template>
  <Layout class="mb-8">
    <!-- Replace everything inside this Layout with your own content -->
    <!-- The main container CSS classes are in `src/layouts/Default.vue` -->
    <builder-app v-if="loadApp"></builder-app>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  components: {
    // We load this asynchronously so Gridsome wont try to render it build time
    BuilderApp: () => import('@/components/BuilderApp'),
  },
  data: function() {
    return {
      loadApp: false,
    }
  },
  metaInfo: {
    title: 'Open Graph Image Builder',
  },
  mounted() {
    this.loadApp = true
  },
}
</script>
