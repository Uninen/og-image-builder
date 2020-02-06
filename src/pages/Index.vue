<template>
  <Layout class="mb-8">
    <ClientOnly>
      <builder-app></builder-app>
    </ClientOnly>
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
  metaInfo: {
    title: 'Open Graph Image Builder',
  },
}
</script>
