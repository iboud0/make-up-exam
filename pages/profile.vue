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
        class="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition duration-300"
      >
        Logout
      </button>
    </nav>

    <!-- Profile Section -->
    <div class="mt-10 bg-white shadow-md rounded-lg p-8 w-full max-w-lg flex flex-col items-center">
      <!-- User Icon -->
      <div class="relative w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
        <span class="text-4xl font-bold text-white uppercase">
          {{ userInitials }}
        </span>
        <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      <!-- User Details -->
      <div class="mt-6 text-center">
        <h1 class="text-3xl font-semibold text-gray-800">{{ username }}</h1>
        <p class="text-gray-600 mt-2 text-sm">{{ email }}</p>
      </div>

      <!-- Edit Profile and Settings -->
      <div class="mt-6 flex flex-col w-full">
        <button
          @click="editProfile"
          class="w-full px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
        <button
          @click="handleSettings"
          class="mt-4 w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 transition duration-300"
        >
          Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { signOut, onAuthStateChanged } from "firebase/auth";
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

const editProfile = () => {
  alert("Edit Profile functionality is under development.");
};

const handleSettings = () => {
  alert("Settings functionality is under development.");
};

// Listen for authentication state changes
onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) {
      username.value = user.displayName || "Anonymous";
      email.value = user.email || "No email provided";

      // Extract initials for the icon
      userInitials.value = (username.value.split(" ").map((name) => name[0]) || ["U"]).join("").toUpperCase();
    } else {
      username.value = "";
      email.value = "";
      userInitials.value = "";
    }
  });
});
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
}

body {
  font-family: "Inter", sans-serif;
}
</style>
