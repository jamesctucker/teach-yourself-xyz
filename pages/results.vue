<template>
  <div>
    <h1>
      Search Results
    </h1>
    <div class="flex flex-wrap">
      <div v-for="(item, index) in searchResultItems" :key="index">
        <!-- <a
          :href="`https://www.youtube.com/playlist?list=${item.id.playlistId}`"
          target="blank"
          rel="noopener noreferrer"
        > -->
        <nuxt-link
          :to="
            `/playlist?id=${item.id.playlistId}&title=${item.snippet.title}&creator=${item.snippet.channelTitle}&thumbnail=${item.snippet.thumbnails.default.url}`
          "
        >
          <img :src="item.snippet.thumbnails.default.url" alt="" />
          <h3>{{ item.snippet.title }}</h3>
        </nuxt-link>
        <!-- </a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      searchResultItems: []
    };
  },
  beforeMount() {
    this.fetchSearchResults();
  },
  watch: {
    // watches query from Search component and updates search results if query changes
    searchTerm: function() {
      this.fetchSearchResults();
    }
  },
  computed: {
    searchTerm() {
      return this.$route.query.search;
    },
    searchType() {
      return this.$route.query.type;
    }
  },
  methods: {
    fetchSearchResults() {
      let apiKey = process.env.NUXT_ENV_YOUTUBE_API_KEY;
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.searchTerm}}&type=${this.searchType}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.searchResultItems = data.items;
        });
    }
  }
};
</script>

<style></style>
