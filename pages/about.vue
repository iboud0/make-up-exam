<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center">
      <!-- Navbar -->
      <nav class="bg-white shadow w-full p-4 flex justify-between items-center">
        <div class="text-xl font-bold">My Project</div>
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
  
      <!-- About Section -->
      <div class="flex flex-col items-center mt-10 bg-white shadow-md p-8 rounded-md w-full max-w-4xl">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <p class="text-gray-700 text-lg leading-relaxed">
          Welcome to <span class="font-bold">My Project</span>! We are dedicated to providing you with the best experience, 
          ensuring that you find everything you need in one place. Our mission is to deliver high-quality services 
          while fostering a community of creativity and collaboration. 
        </p>
        <p class="text-gray-700 text-lg leading-relaxed mt-4">
          Our team works hard to ensure that every feature is tailored to your needs, making sure that your journey 
          with us is seamless and enjoyable. Thank you for choosing us as your trusted platform.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed mt-4">
          Stay tuned as we continue to grow and bring even more exciting features and updates to <span class="font-bold">My Project</span>. 
          If you have any questions, feel free to contact us. We’re here to help!
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useNuxtApp } from "#app";
  import { signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const { $auth } = useNuxtApp();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await signOut($auth);
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  </script>
  