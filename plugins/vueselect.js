// plugins/vue-select.js
import { defineNuxtPlugin } from '#app';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('vue-select', VueSelect);
});
