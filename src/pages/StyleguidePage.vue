<template>
  <div class="mt-6 mb-8">
    <h1 class="block text-4xl font-bold"> <i class="far fa-book"></i> Style Guide </h1>

    <p class="mt-8">
      Here's a short documentation of extended Tailwind properties and used fonts in this project.
    </p>

    <h3 class="mt-8 text-xl font-bold">Extended Tailwind properties</h3>

    <ul class="mt-4 list-disc list-inside">
      <li>Added margin values: 28 (eg. mt-28)</li>
      <li>Added font sizes: 5.5xl, 7xl, 8xl, 9xl, 10xl</li>
      <li>
        Added fonts: <code>font-raleway</code> and <code>font-opensans</code> for
        <a class="text-blue-700 underline" href="https://fonts.google.com/specimen/Raleway"
          >Raleway</a
        >
        and
        <a class="text-blue-700 underline" href="https://fonts.google.com/specimen/Open+Sans"
          >Open Sans</a
        >
        respectively
      </li>
    </ul>

    <h3 class="mt-8 mb-4 text-xl font-bold"> Font samples (first Open Sans, second Raleway) </h3>

    <p class="mb-8 text-2xl">
      <span class="font-opensans">Normal fox jumps over Open Sans And Raleway</span><br /><span
        class="font-raleway"
        >Normal fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-semibold">
      <span class="font-opensans">Semibold fox jumps over Open Sans And Raleway</span><br /><span
        class="font-raleway"
        >Semibold fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-bold">
      <span class="font-opensans">Bold fox jumps over Open Sans And Raleway</span><br /><span
        class="font-raleway"
        >Bold fox jumps over Open Sans And Raleway</span
      >
    </p>
    <p class="mb-8 text-2xl font-black">
      <span class="font-opensans">Black fox jumps over Open Sans And Raleway</span><br /><span
        class="font-raleway"
        >Black fox jumps over Open Sans And Raleway</span
      >
    </p>

    <router-link to="/" class="text-blue-700 underline">&larr; Back Home</router-link>
  </div>
</template>
