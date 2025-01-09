<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- Navbar -->
    <nav class="bg-white shadow-md p-4 flex justify-between items-center w-full">
      <NuxtLink to="/welcome" class="text-2xl font-extrabold text-blue-600 tracking-wide">U-Vote</NuxtLink>
      <div class="flex space-x-6">
        <NuxtLink to="/cards" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Events</NuxtLink>
        <NuxtLink to="/profile" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Profile</NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">About</NuxtLink>
      </div>
      <button
        @click="handleLogout"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-md transition duration-300"
      >
        Logout
      </button>
    </nav>

    <!-- About Section -->
    <div class="flex flex-col items-center mt-10 bg-white shadow-lg p-8 rounded-md w-full max-w-4xl">
      <!-- Header Section -->
      <h1 class="text-3xl font-bold text-gray-800 mb-6">About U-Vote</h1>
      <p class="text-lg text-gray-600 text-center">
        Welcome to <span class="font-bold">U-Vote</span>, the platform designed exclusively for UM6P students to collaborate, vote, and shape campus events.
      </p>

      <!-- Content Section -->
      <div class="mt-6 space-y-4 text-gray-700 text-base leading-relaxed">
        <p>
          <span class="font-bold">U-Vote</span> provides a seamless platform to participate in event voting. Whether you're planning an event or sharing your opinion, 
          <span class="font-bold">U-Vote</span> makes it easier for you to engage with the university community.
        </p>
        <p>
          With our platform, students can explore a list of proposed events, vote "Yes" or "No" based on their preferences, and share their opinions through comments. 
          Our mission is to foster a collaborative environment where students actively participate in decision-making for campus activities.
        </p>
        <p>
          Built using <span class="font-bold">Vue.js</span> for a responsive and user-friendly interface, and <span class="font-bold">Firebase</span> for secure authentication and efficient data management, 
          <span class="font-bold">U-Vote</span> ensures a modern, reliable, and intuitive experience for all UM6P students.
        </p>
      </div>

      <!-- Call to Action -->
      <div class="mt-6">
        <NuxtLink
          to="/cards"
          class="px-6 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Explore Events
        </NuxtLink>
      </div>
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

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
}
</style>
