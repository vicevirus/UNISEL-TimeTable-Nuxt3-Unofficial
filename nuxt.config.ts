// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@kevinmarrec/nuxt-pwa'
    ],
    pwa: {
        meta: {
            // Generate splash screens for iOS
            mobileAppIOS: true,
        },
        manifest: {
            name: 'Unisel Timetable',

            useWebmanifestExtension: false
          }
    },
    ssr: true,
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})
