<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Navbar -->
      <nav class="bg-white shadow p-4 flex justify-between items-center">
        <!-- Project Name -->
        <div class="text-xl font-bold">My Project</div>
  
        <!-- Navbar Links (Centered) -->
        <div class="flex space-x-6">
          <NuxtLink
            to="/cards"
            class="text-gray-700 hover:text-gray-900 font-medium"
          >
            Cards
          </NuxtLink>
          <NuxtLink 
            to="/chart" 
            class="text-gray-700 hover:text-gray-900 font-medium"
          >
            Chart
          </NuxtLink>
          <NuxtLink
            to="/profile"
            class="text-gray-700 hover:text-gray-900 font-medium"
          >
            Profile
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-gray-700 hover:text-gray-900 font-medium"
          >
            About
          </NuxtLink>
        </div>
  
        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
  
      <!-- Welcome Section -->
      <main class="flex-grow flex items-center justify-center">
        <h1 class="text-4xl font-bold text-gray-800">
          Welcome, {{ username }}!
        </h1>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useNuxtApp } from "#app";
  import { signOut } from "firebase/auth";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const username = ref("");
  const { $auth } = useNuxtApp();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await signOut($auth); // Logs out the user
      localStorage.clear();
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  
  // Fetch the username (displayName) from Firebase on page load
  onMounted(() => {
    const user = $auth.currentUser;
    if (user) {
      username.value = user.displayName || "User";
    }
  });
  </script>
  