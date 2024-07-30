<template>
  <div class="row">
    <!-- THIS DIV CONTAINS THE POST FORM TO CREATE OR UPDATE A POST   -->
    <div
      class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper"
    >
      <h3>Post</h3>
      <hr />
      <form @submit.prevent="save">
        <div class="row">
          <div class="col-12 col-sm-8">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    id="title"
                    v-model="title"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="content">Content</label>
                  <textarea
                    type="text"
                    rows="7"
                    class="form-control"
                    name="content"
                    id="content"
                    v-model="content"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <img :src="imgPreview" alt="" class="img-fluid" />
            <div class="form-group">
              <input
                type="file"
                ref="featured_image"
                class="form-control-file"
                @change="updatePreview($event)"
              />
            </div>
          </div>
          <alert v-if="msg" :msg="msg" :classAlert="classAlert"></alert>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              {{ post_id ? "Update" : "Create" }}
            </button>
            <button
              @click.prevent="cancel"
              class="btn btn-secondary float-right"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    <!-- HERE CONTINUES THE POST ELEMENTS RETURN FROM A API REQUEST TO AN OUR DATABASE. -->
    <div
      class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper"
    >
      <h3>Posts</h3>
      <hr />
      <post-item
        v-for="(post, index) in posts"
        :key="post.post_id"
        :index="index"
        :post="post"
        :imgPlaceHolder="imgPlaceHolder"
        @delete="deletePost"
        @edit="getPost"
      ></post-item>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import PostItem from "../components/PostItem.vue";
export default {
  components: {
    alert: Alert,
    "post-item": PostItem,
  },
  data() {
    return {
      msg: null,
      classAlert: null,
      post_id: null,
      post_index: null,
      posts: [],
      title: "",
      content: "",
      image: "",
      imgPlaceHolder: "http://via.placeholder.com/300",
    };
  },
  methods: {
    save() {
      if (this.post_id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("description", this.content);
      form.append("featured_image", this.$refs.featured_image.files[0]);

      this.$api
        .post("/blog", form)
        .then((res) => {
          this.msg = "Post has been created";
          this.classAlert = "success";
          this.posts.unshift(res.data);
          this.cancel(true);
        })
        .catch((err) => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    update() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("description", this.content);
      if (this.$refs.featured_image.files.length > 0) {
        form.append("featured_image", this.$refs.featured_image.files[0]);
      }

      this.$api
        .post("/blog/update/" + this.post_id, form)
        .then((res) => {
          this.msg = "Post has been updated";
          this.classAlert = "success";
          this.posts[this.post_index] = res.data;
          this.cancel(true);
        })
        .catch((err) => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    get() {
      // console.log("test");
      this.$api
        .get("/blog")
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    getPost(post_id, post_index) {
      this.cancel();
      this.post_id = post_id;
      this.post_index = post_index;

      this.$api.get("/blog/" + post_id).then((res) => {
        this.title = res.data.post_title;
        this.content = res.data.post_description;
        var image = res.data.post_featured_image;
        if (image !== "") {
          this.image =
            "http://localhost/restapicetec/public/assets/uploads/" + image;
        } else {
          this.image = "";

          window.scroll(0, 0);
        }
      });
    },
    deletePost(post_id, post_index) {
      this.$api
        .delete("/blog/" + post_id)
        .then(() => {
          this.msg = "Post has been deleted";
          this.classAlert = "warning";
          this.cancel(true);
          this.posts.splice(post_index, 1);
          window.scroll(0, 0);
        })
        .catch((err) => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    updatePreview(event) {
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
    },
    cancel(alertShow = false) {
      this.post_id = null;
      this.title = "";
      this.content = "";
      this.image = "";
      if (!alertShow) {
        this.msg = null;
        this.classAlert = null;
      }
    },
  },
  computed: {
    imgPreview() {
      return this.image == "" ? this.imgPlaceHolder : this.image;
    },
  },
  created() {
    this.get();
  },
};
</script>
