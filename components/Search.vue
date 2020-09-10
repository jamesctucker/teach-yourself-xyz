<template>
  <div>
    <form @submit.prevent="fetchSearchResults">
      <input
        type="text"
        placeholder="Search for topic..."
        v-model="query"
        class="text-black p-2 rounded"
      />
      <select
        v-model="resultType"
        name="type-selection"
        id=""
        class="text-black p-2 rounded"
      >
        <option value="video">video</option>
        <option value="playlist">playlist</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
      resultType: "video"
    };
  },
  methods: {
    //   programmatically navidates to Results component with query as payload
    fetchSearchResults() {
      this.$router.push({
        name: "results",
        query: { search: this.query, type: this.resultType }
      });
    }
  }
};
</script>

<style></style>
