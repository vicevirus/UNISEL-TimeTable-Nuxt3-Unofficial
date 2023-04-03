// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    
    plugins: ['~/plugins/vueselect.js', { src: '~/plugins/vercel.js', mode: 'client' }],


    modules: [
        '@nuxtjs/robots',
        '@kevinmarrec/nuxt-pwa'
    ],
    pwa: {
        manifest: {
            lang: 'en',
            name: 'Unisel Timetable',
            short_name: "Unisel Timetable",

        },
        meta: {
            // Generate splash screens for iOS
            mobileAppIOS: true,
            name: 'Unisel Timetable',
            theme_color: '#ffffff',
        },


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
