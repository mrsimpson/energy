import { createApp } from "vue";
import VueGtagPlugin from "vue-gtag";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.
    use(router)
    .use(VueGtagPlugin, {
        config: { id: "G-DQW5PTK5L1", router, anonymize_ip: true}
    })

app.mount("#app");
