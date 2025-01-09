<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white shadow-lg p-6 rounded-md w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-sm text-center text-red-500">
          {{ errorMessage }}
        </p>
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="text-green-500 hover:underline">
            Log in here
          </NuxtLink>
        </p>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "vue-router";

const username = ref(""); // New username field
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

// Access Firebase Auth via useNuxtApp
const { $auth } = useNuxtApp();

const handleRegister = async () => {
  try {
    // Validate the email domain
    if (!email.value.endsWith("@um6p.ma")) {
      errorMessage.value = "Registration is restricted to UM6P email addresses.";
      return;
    }

    // Use Firebase to create a new user
    const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value);
    const user = userCredential.user;

    // Save username to user's profile
    await updateProfile(user, {
      displayName: username.value,
    });

    router.push("/welcome"); // Redirect to welcome page on successful registration
  } catch (error) {
    errorMessage.value = error.message; // Display error if registration fails
  }
};
</script>

  