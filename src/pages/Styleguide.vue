<template>
  <Layout class="mb-8 mt-6">
    <!-- Replace everything inside this Layout with your own content -->
    <!-- The main container CSS classes are in `src/layouts/Default.vue` -->
    <h1 class="block text-4xl font-bold">
      <i class="far fa-book"></i> Style Guide
    </h1>

    <p class="mt-8">
      Here's a short documentation of extended Tailwind properties and used
      fonts in this project.
    </p>

    <h3 class="text-xl font-bold mt-8">Extended Tailwind properties</h3>

    <ul class="list-disc list-inside mt-4">
      <li>Added margin values: 28 (eg. mt-28)</li>
      <li>Added font sizes: 5.5xl, 7xl, 8xl, 9xl, 10xl</li>
      <li>
        Added fonts: <code>font-raleway</code> and
        <code>font-opensans</code> for
        <a
          class="text-blue-700 underline"
          href="https://fonts.google.com/specimen/Raleway"
          >Raleway</a
        >
        and
        <a
          class="text-blue-700 underline"
          href="https://fonts.google.com/specimen/Open+Sans"
          >Open Sans</a
        >
        respectively
      </li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-4">
      Font samples (first Open Sans, second Raleway)
    </h3>

    <p class="mb-8 text-2xl">
      <span class="font-opensans"
        >Normal fox jumps over Open Sans And Raleway</span
      ><br /><span class="font-raleway"
        >Normal fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-semibold">
      <span class="font-opensans"
        >Semibold fox jumps over Open Sans And Raleway</span
      ><br /><span class="font-raleway"
        >Semibold fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-bold">
      <span class="font-opensans"
        >Bold fox jumps over Open Sans And Raleway</span
      ><br /><span class="font-raleway"
        >Bold fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-black">
      <span class="font-opensans"
        >Black fox jumps over Open Sans And Raleway</span
      ><br /><span class="font-raleway"
        >Black fox jumps over Open Sans And Raleway</span
      >
    </p>

    <g-link to="/" class="text-blue-700 underline">&larr; Back Home</g-link>
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
  metaInfo: {
    title: 'Style Guide'
  }
}
</script>
