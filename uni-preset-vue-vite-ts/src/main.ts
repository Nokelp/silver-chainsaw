import { createSSRApp } from "vue";
import App from "./App.vue";
import './scss/common.scss'
import './scss/font_4781276_cj6nikhzmg8/iconfont.css'
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
