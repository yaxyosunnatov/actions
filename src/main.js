import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/index.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import i18n from "./plugins/i18n";

const app = createApp(App);

const pinia = createPinia();

pinia.use((context) => {
  const storeId = context.store.$id;

  const serilizer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  const fromStorage = serilizer.deserialize(
    window.localStorage.getItem(storeId)
  );

  if (fromStorage) {
    context.store.$patch(fromStorage);
  }

  // listen for changes and update locastroage
  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, serilizer.serialize(state));
  });
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Toast);

app.mount("#app");
