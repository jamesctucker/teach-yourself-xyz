<template>
  <header class="flex justify-between items-center text-white bg-black p-6">
    <nuxt-link to="/"><h1>Teach Yourself XYZ</h1></nuxt-link>
    <Search />
    <nav>
      <nuxt-link to="/about" class="mr-2">About</nuxt-link>
      <nuxt-link v-if="$auth.isAuthenticated" to="/playlists" class="mr-2"
        >Playlists</nuxt-link
      >
      <nuxt-link v-if="$auth.isAuthenticated" to="/account" class="mr-2"
        >Account</nuxt-link
      >
      <nuxt-link
        to="/register"
        class="text-white bg-gray-600 hover:bg-gray-800 border-gray-400 px-3 py-3 rounded shadow"
        >{{ $auth.isAuthenticated ? "Logout" : "Sign Up" }}</nuxt-link
      >
    </nav>
  </header>
</template>

<script>
import Search from "./Search";
export default {
  name: "Header",
  components: {
    Search
  }
};
</script>

<style></style>
