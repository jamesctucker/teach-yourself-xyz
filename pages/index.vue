<template>
  <div class="container">
    <!-- Unauthenticated -->
    <div v-if="!$auth.isAuthenticated">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
    <!-- Authenticated -->
    <div v-else>
      <p>You're logged in as {{ $auth.email }}</p>
      <button @click="$store.dispatch('auth/logout')">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";

export default {
  name: "Home",
  mounted() {
    if (this.$auth.isAuthenticated) {
      this.$apollo.addSmartQuery("fetchPlaylists", {
        query: gql`
          query fetchPlaylists {
            playlists(
              where: {
                user_id: { _eq: "bc84fbc8-f608-42c2-8dcb-f2d19785700d" }
              }
            ) {
              video_ids
              title
              creator
              thumbnail
              id
            }
          }
        `,
        result({ data, loading, networkStatus }) {
          if (data) {
            console.log("We got some result!", data.playlists);
            this.$store.dispatch("playlists/addPlaylists", data.playlists);
          }
        }
      });
    }
  }

  // apollo: {
  //   users: {
  //     query: gql`
  //       query MyQuery {
  //         users {
  //           cognito_id
  //         }
  //       }
  //     `
  //   }
  // }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
