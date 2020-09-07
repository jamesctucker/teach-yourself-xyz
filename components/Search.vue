<template>
  <div>
    <form @submit.prevent="fetchSearchResults">
      <input
        type="text"
        placeholder="Search for a playlist..."
        v-model="query"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    //   programmatically navidates to Results component with query as payload
    fetchSearchResults() {
      this.$router.push({ name: "results", query: { search: this.query } });
    }
  }
};
</script>

<style></style>
