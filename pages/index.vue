<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      <div class="text-2xl font-extrabold text-blue-600 tracking-wide">
        {{ projectName }}
      </div>
      <div>
        <NuxtLink
          to="/login"
          class="px-5 py-2 bg-blue-500 text-white rounded-full mr-4 hover:bg-blue-600 transition duration-300"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          Register
        </NuxtLink>
      </div>
    </nav>

    <!-- Welcome Section -->
    <main class="flex-grow flex flex-col items-center justify-center text-center px-6">
      <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
        Empowering Students with <span class="text-blue-600">{{ projectName }}</span>
      </h1>
      <p class="mt-6 text-lg text-gray-600 max-w-2xl">
        Seamlessly participate in voting for events at UM6P and let your voice
        shape the future. Join our community and make an impact.
      </p>
      <div class="mt-8 flex space-x-4">
        <NuxtLink
          to="/register"
          class="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-green-600 transition duration-300"
        >
          Get Started
        </NuxtLink>
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-gray-200 text-blue-600 text-lg font-medium rounded-md shadow-md hover:bg-gray-300 transition duration-300"
        >
          Learn More
        </NuxtLink>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-white shadow-md py-4 text-center">
      <p class="text-gray-500 text-sm">
        © 2025 {{ projectName }}. Built for UM6P Students.
      </p>
    </footer>
  </div>
</template>

<script setup>
const projectName = "U-Vote";
</script>

<style scoped>
/* Optional styles for smooth visuals */
main {
  background: linear-gradient(120deg, #ebf8ff, #f7fafc);
}
</style>
