<template>
  <div>
    <h1>Playlist</h1>
    <Video :video-id="videoToWatchId ? videoToWatchId : defaultVideoId" />

    <div v-for="(item, index) in playlistItems" :key="index">
      <!-- <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="`${item.snippet.resourceId.videoId}`"
        ></div>
      </vue-plyr> -->
      <img
        :src="item.snippet.thumbnails.default.url"
        alt=""
        @click="setVideoToWatch(item.snippet.resourceId.videoId)"
      />
    </div>
  </div>
</template>

<script>
import Video from "../components/Video";

export default {
  name: "Playlist",
  components: {
    Video
  },
  data() {
    return {
      playlistItems: [],
      videoToWatchId: null,
      defaultVideoId: null
    };
  },
  beforeMount() {
    this.fetchPlaylistItems();
  },
  methods: {
    fetchPlaylistItems() {
      let apiKey = process.env.NUXT_ENV_YOUTUBE_API_KEY;
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C%20snippet&playlistId=${this.$route.query.id}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.playlistItems = data.items;
          this.defaultVideoId = data.items[0].snippet.resourceId.videoId;
        });
    },
    setVideoToWatch(videoId) {
      this.videoToWatchId = videoId;
    }
  }
};
</script>

<style></style>
