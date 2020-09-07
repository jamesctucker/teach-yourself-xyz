<template>
  <div>
    <vue-plyr v-if="videoId">
      <div data-plyr-provider="youtube" :data-plyr-embed-id="videoId"></div>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    videoId: String
  }
};
</script>

<style></style>
