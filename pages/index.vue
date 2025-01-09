<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Navbar -->
      <nav class="bg-white shadow p-4 flex justify-between items-center">
        <div class="text-xl font-bold">
          {{ projectName }}
        </div>
        <div>
          <NuxtLink
            to="/login"
            class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Register
          </NuxtLink>
        </div>
      </nav>
  
      <!-- Welcome Section -->
      <main class="flex-grow flex items-center justify-center">
        <h1 class="text-4xl font-semibold text-gray-800">
          Welcome to Your Project!
        </h1>
      </main>
    </div>
</template>

<script setup>
    const projectName = "My Project";
</script>
  