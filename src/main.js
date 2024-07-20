import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { guest, api } from "./pluggins/axios";
import PostItem from "./components/PostItem.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.config.globalProperties.$axiosInstance = { ...guest };
app.config.globalProperties.$api = { ...api };
app.component("post-item", PostItem);
app.mount("#app");
