<template>
  <div class="row post mt-5 pt-3 pb-3">
    <div class="col-12 col-sm-4 text-center">
      <img
        v-if="post.post_featured_image != ''"
        :src="
          'http://localhost/restapi2/public/assets/uploads/' +
          post.post_featured_image
        "
        alt=""
        class="img-fluid"
      />
      <img v-else :src="imgPlaceHolder" alt="" class="img-fluid" />
    </div>
    <div class="col-12 col-sm-8">
      <h4>{{ post.post_title }}</h4>
      <p>{{ post.post_description }}</p>
    </div>
    <div class="col-12 mt-3">
      <router-link
        class="btn btn-outline-success mr-2"
        :to="'/post/' + post.post_id"
        >View</router-link
      >
      <button
        class="btn btn-outline-primary"
        @click="$emit('edit', post.post_id, index)"
      >
        Edit
      </button>
      <button
        class="btn btn-outline-secondary float-right"
        @click="$emit('delete', post.post_id, index)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post", "index", "imgPlaceHolder"],
};
</script>

<style></style>
