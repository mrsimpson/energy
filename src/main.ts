import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueMatomo from "vue-matomo";
import { createPinia } from "pinia";

const params = location.search
  ? Object.fromEntries(
      location.search
        .replace(/^\?/, ``)
        .split("&")
        .map((p) => p.split("="))
    )
  : {};
if (params.c) {
  params.mtm_campaign = params.c;
  if (["fedi", "twitter", "fb"].includes(params.c)) {
    params.mtm_source = "social";
  }
  delete params.c;
  const newSearch = Object.entries(params)
    .map(([k, v]) => k + "=" + v)
    .join("&");
  location.href = location.pathname + "?" + newSearch;
}

const app = createApp(App);

app.use(createPinia());
app.use(router).use(VueMatomo, {
  host: "https://matomo.justso.de",
  siteId: 2,
  router,
  disableCookies: true,
});

app.mount("#app");
