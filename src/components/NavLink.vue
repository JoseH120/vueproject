<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="loggedIn ? '/' : '/signin'">{{
      brand
    }}</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul v-if="!loggedIn" class="navbar-nav mr-auto">
        <MenuLink path="/signin" text="Signin"></MenuLink>
        <MenuLink path="/signup" text="Signup"></MenuLink>
      </ul>
      <ul v-else class="navbar-nav mr-auto">
        <MenuLink path="/" text="Admin"></MenuLink>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import MenuLink from "./MenuLink.vue";

export default {
  props: ["loggedIn"],
  components: {
    MenuLink,
  },
  data() {
    return {
      brand: import.meta.env.VITE_APP_APPNAME,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style></style>
