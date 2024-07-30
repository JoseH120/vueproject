<template>
  <div v-if="post" class="row post mt-5 pt-3 pb-3">
    <div class="col-12 col-sm-4 text-center">
      <img
        v-if="post.post_featured_image != ''"
        :src="
          'http://localhost/restapicetec/public/assets/uploads/' +
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
      <router-link class="btn btn-outline-success mr-2" :to="'/'"
        >Go To Main</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: false,
      imgPlaceHolder: "http://via.placeholder.com/300",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      var id = this.$route.params.id;
      this.$api
        .get("/blog/" + id)
        .then((res) => {
          this.post = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
