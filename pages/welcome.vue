<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow-md p-4 flex justify-between items-center">
      <NuxtLink to="/welcome" class="text-2xl font-extrabold text-blue-600 tracking-wide">U-Vote</NuxtLink>
      <div class="flex space-x-6">
        <NuxtLink to="/cards" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Events</NuxtLink>
        <NuxtLink to="/profile" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Profile</NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium transition duration-300">About</NuxtLink>
      </div>
      <button
        @click="handleLogout"
        class="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </nav>

    <!-- Welcome Section -->
    <main class="flex-grow flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-50 to-gray-100">
      <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
        Welcome, <span class="text-blue-600">{{ username }}</span>!
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl">
        Dive into the latest events and let your voice be heard. Cast your vote, share your opinions, and be part of the decision-making for the UM6P community.
      </p>
      <div class="mt-8 flex space-x-4">
        <NuxtLink
          to="/cards"
          class="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Explore Events
        </NuxtLink>
        <NuxtLink
          to="/profile"
          class="px-6 py-3 bg-gray-200 text-blue-600 text-lg font-medium rounded-md shadow-md hover:bg-gray-300 transition duration-300"
        >
          View Profile
        </NuxtLink>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-white shadow-md py-4 text-center">
      <p class="text-gray-500 text-sm">
        © 2025 U-Vote. Built for the UM6P Community.
      </p>
    </footer>
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

<style scoped>
/* Optional styles for gradient background and smooth visuals */
main {
  background: linear-gradient(120deg, #ebf8ff, #f7fafc);
}
</style>
