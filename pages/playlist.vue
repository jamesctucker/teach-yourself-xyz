<template>
  <div>
    <h1>Playlist</h1>
    <div v-for="(item, index) in playlistItems" :key="index">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="`${item.snippet.resourceId.videoId}`"
        ></div>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  data() {
    return {
      playlistItems: []
    };
  },
  beforeMount() {
    this.fetchPlaylistItems();
  },
  methods: {
    fetchPlaylistItems() {
      let apiKey = "AIzaSyD3IF1b1VQERFQVkJSQXE2oMd6qJnkGIPk";
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C%20snippet&playlistId=${this.$route.query.id}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.playlistItems = data.items;
        });
    }
  }
};
</script>

<style></style>
