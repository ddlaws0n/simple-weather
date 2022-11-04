import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudSun, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "./assets/tailwind.css";

library.add(faCloudSun, faCircleInfo);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
