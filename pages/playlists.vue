<template>
  <div>
    <h1>Your Content</h1>
    <!-- Playlist Section -->
    <div v-if="playlists" class="flex justify-center items-center">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="flex flex-col items-center justify-center mr-4"
      >
        <img
          :src="playlist.thumbnail"
          alt="playlist thumbnail"
          class="w-48 mb-2"
        />
        <h3>{{ playlist.title }}</h3>
        <p>{{ playlist.creator }}</p>
      </div>
    </div>

    <!-- Video Section -->
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Playlists",
  computed: {
    playlists() {
      return this.$store.state.playlists.playlists;
    }
  }
};
</script>

<style></style>
