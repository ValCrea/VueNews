import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";
import VueAxios from "vue-axios";
import { VueQueryPlugin, type VueQueryPluginOptions } from "vue-query";

import "./assets/main.css";

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};

// 7a0f465dda0842208a41f0981ff3bb45
createApp(App)
  .use(VueAxios, axios)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount("#app");
