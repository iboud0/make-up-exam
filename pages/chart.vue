<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Navbar -->
      <nav class="bg-white shadow p-4 flex justify-between items-center">
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
  
      <!-- Chart Section -->
      <div class="bg-white shadow-md p-6 mt-6 mx-4 rounded-md">
        <h1 class="text-2xl font-bold text-gray-800">Your Chart</h1>
        <p class="text-gray-600 mt-2">View the cards you've added to your chart.</p>
      </div>
  
      <!-- Chart List -->
      <div class="p-4 space-y-6">
        <div v-if="chart.length > 0">
          <div v-for="(item, index) in chart" :key="index" class="bg-white shadow-md rounded-md p-6">
            <h2 class="text-xl font-bold text-gray-800">{{ item.title }}</h2>
            <p class="text-gray-700 mt-2">{{ item.description }}</p>
            <p class="text-sm text-gray-500 mt-2">Price: <span class="font-semibold">{{ item.price }}</span></p>
            <p class="text-sm text-gray-500 mt-2">Quantity: <span class="font-semibold">{{ item.quantity }}</span></p>
            <button
              @click="removeFromChart(index)"
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-600 text-center">Your chart is empty.</p>
        </div>
      </div>
  
      <!-- Total Price -->
      <div v-if="chart.length > 0" class="p-4 bg-white shadow-md rounded-md mx-4">
        <h3 class="text-xl font-bold">Total Price: {{ totalPrice }}</h3>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useNuxtApp } from "#app";
  import { signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const { $auth } = useNuxtApp();
  const router = useRouter();
  
  const chart = ref(JSON.parse(localStorage.getItem("chart")) || []);
  const totalPrice = computed(() => chart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
  
  const removeFromChart = (index) => {
    chart.value.splice(index, 1);
    localStorage.setItem("chart", JSON.stringify(chart.value));
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
  </script>
  