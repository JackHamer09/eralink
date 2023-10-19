import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { plugin as VueTippy } from "vue-tippy";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: "tooltip",
    defaultProps: {
      placement: "top",
      theme: "light",
    },
  });
});
