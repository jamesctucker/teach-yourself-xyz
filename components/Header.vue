<template>
  <header class="flex justify-between">
    <nuxt-link to="/"><h1>Teach Yourself XYZ</h1></nuxt-link>
    <Search />
    <nav>
      <nuxt-link to="/playlists">Playlists</nuxt-link>
      <nuxt-link to="/account">Account</nuxt-link>
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
