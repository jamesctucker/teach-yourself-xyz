<template>
  <div>
    <h1>Playlist</h1>
    <Video :video-id="videoToWatchId ? videoToWatchId : defaultVideoId" />
    <button @click="addPlaylist">Add Playlist</button>
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
import gql from "graphql-tag";

export default {
  name: "Playlist",
  components: {
    Video
  },
  data() {
    return {
      playlistItems: [],
      videoIds: [],
      videoToWatchId: null,
      defaultVideoId: null
    };
  },
  beforeMount() {
    this.fetchPlaylistItems();
  },
  computed: {
    currentUserId() {
      return this.$store.state.auth.user.username;
    },
    playlistTitle() {
      return this.$route.query.title;
    },
    channelCreator() {
      return this.$route.query.creator;
    },
    thumbnail() {
      return this.$route.query.thumbnail;
    }
  },
  methods: {
    fetchPlaylistItems() {
      let apiKey = process.env.NUXT_ENV_YOUTUBE_API_KEY;
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C%20snippet&playlistId=${this.$route.query.id}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data.items.map(item =>
            this.videoIds.push(item.snippet.resourceId.videoId)
          );
          console.log(data);
          this.playlistItems = data.items;
          this.defaultVideoId = data.items[0].snippet.resourceId.videoId;
        });
    },
    setVideoToWatch(videoId) {
      this.videoToWatchId = videoId;
    },
    addPlaylist() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation addPlaylist(
              $user_id: String!
              $video_ids: _text!
              $title: String!
              $creator: String!
              $thumbnail: String!
            ) {
              insert_playlists(
                objects: {
                  user_id: $user_id
                  video_ids: $video_ids
                  title: $title
                  creator: $creator
                  thumbnail: $thumbnail
                }
              ) {
                returning {
                  video_ids
                  user_id
                  title
                  creator
                  thumbnail
                }
              }
            }
          `,
          // Parameters
          variables: {
            user_id: this.currentUserId,
            video_ids: "{" + this.videoIds + "}",
            title: this.playlistTitle,
            creator: this.channelCreator,
            thumbnail: this.thumbnail
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style></style>
