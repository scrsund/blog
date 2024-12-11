<template>
  <header class="mb-10">
    <div class="flex flex-col items-center justify-center bg-sky-700 pb-8">
      <RouterLink to="/home" class="text-5xl mt-4 py-4 px-6 logo">tiny traveler</RouterLink>
      <p class="lowercase text-sm text-white">The go-to guide for families moving to sweden</p>
    </div>
    <div class="flex justify-center h-16 py-6 px-6 border-b shadow-sm">
        <nav class="hidden md:block md:list-none md:flex md:space-x-8 md:text-xs cursor-pointer">
          <li>Guides</li>
          <li>Life in Sweden</li>
          <li>Reviews and Recos</li>
          <li>Work and Finance</li>
          <li>Travel</li>
          <li>Life Hacks</li>
          <li>Culture</li>
          <li>News</li>
            <!-- Calendar, Events, Tours, Attractions, Local businesses -->
          <li>Resources</li>
        </nav>
        <!-- <div class="hidden md:block font-sans text-sm">Subscribe</div> -->
    </div>
  </header>

</template>