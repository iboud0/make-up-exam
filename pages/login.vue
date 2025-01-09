<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white shadow-lg p-6 rounded-md w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-sm text-center text-red-500">
          {{ errorMessage }}
        </p>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <NuxtLink to="/register" class="text-blue-500 hover:underline">
            Register here
          </NuxtLink>
        </p>
      </div>
    </div>
</template>
  
<script setup>
    import { ref } from "vue";
    import { useNuxtApp } from "#app";
    import { signInWithEmailAndPassword } from "firebase/auth";

    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    // Access Firebase Auth via useNuxtApp
    const { $auth } = useNuxtApp();

    const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword($auth, email.value, password.value);
        router.push("/welcome");
    } catch (error) {
        errorMessage.value = error.message;
    }
    };
</script>

  