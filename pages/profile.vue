<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center">
      <!-- Navbar -->
      <nav class="bg-white shadow w-full p-4 flex justify-between items-center">
        <NuxtLink to="/welcome" class="text-xl font-bold">My Project</NuxtLink>
        <div class="flex space-x-6">
          <NuxtLink to="/cards" class="text-gray-700 hover:text-gray-900 font-medium">Cards</NuxtLink>
          <NuxtLink to="/chart" class="text-gray-700 hover:text-gray-900 font-medium">Chart</NuxtLink>
          <NuxtLink to="/profile" class="text-gray-700 hover:text-gray-900 font-medium">Profile</NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 font-medium">About</NuxtLink>
        </div>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
  
      <!-- Profile Section -->
      <div class="flex flex-col items-center mt-10 bg-white shadow-md p-8 rounded-md">
        <!-- User Icon -->
        <div class="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
          <span class="text-5xl font-bold text-gray-600">
            {{ userInitials }}
          </span>
        </div>
  
        <!-- User Details -->
        <div class="mt-6 text-center">
          <h1 class="text-2xl font-bold text-gray-800">{{ username }}</h1>
          <p class="text-gray-600 mt-2">{{ email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useNuxtApp } from "#app";
  import { signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const { $auth } = useNuxtApp();
  const router = useRouter();
  
  const username = ref("");
  const email = ref("");
  const userInitials = ref("");
  
  const fetchUserProfile = () => {
    const user = $auth.currentUser;
    if (user) {
      username.value = user.displayName || "Anonymous";
      email.value = user.email || "No email provided";
  
      // Extract initials for the icon
      userInitials.value = (username.value.split(" ").map((name) => name[0]) || ["U"]).join("").toUpperCase();
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut($auth);
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  
  onMounted(fetchUserProfile);
  </script>
  