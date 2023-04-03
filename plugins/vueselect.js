// plugins/vue-select.js
import { defineNuxtPlugin } from '#app';
import VueSelect from 'vue-select';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('vue-select', VueSelect);
});
